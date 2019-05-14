import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import NewIngredientModal from './NewIngredientModal';
import InstructionsList from './RecipeInstructions';
import IngredientsList from './RecipeIngredients';
import RecipeTitle from './RecipeTitle';
import {updateRecipe, addProduct} from '../../store/actions';
import Card from '@material-ui/core/Card';
import '../../css/recipedetail.css';


class RecipeDetail extends Component {
    constructor(props) {
        super(props);
        const id = Number(props.id);
        const recipe = props.recipes.find(item => item.id === id);
        let value;
        value = recipe ?
            recipe.title : "";
        
        this.state = {
            newTitle: value,
            showNewIngredientModal: false,
        }
    }

    getRecipe = () => {
        const id = Number(this.props.id);
        return this.props.recipes.find(item => item.id === id);
    }

    toggleNewIngredientModal = () => {
        this.setState({showNewIngredientModal: !this.state.showNewIngredientModal});
    }

    handleSaveInstruction = (index, text) => {
        const recipe = this.getRecipe();
        recipe.instructions[index] = text;
        this.props.onUpdateRecipe(recipe);
    }

    handleSubmitNewInstruction = (text) => {
        const recipe = this.getRecipe();
        recipe.instructions.push(text);
        this.props.onUpdateRecipe(recipe);
    }

    handleRemoveInstruction = (index) => {
        const recipe = this.getRecipe();
        recipe.instructions.splice(index, 1);
        this.props.onUpdateRecipe(recipe);
    }

    handleSubmitNewTitle = (title) => {
        const recipe = this.getRecipe();
        recipe.title = title;
        this.props.onUpdateRecipe(recipe);
    }

    handleRemoveIngredient = (id) => {
        const recipe = this.getRecipe();
        const ingredients = recipe.ingredients.slice().filter(item => item.id !== id);
        recipe.ingredients = ingredients;
        this.props.onUpdateRecipe(recipe);
    }

    handleSubmitIngredient = (ingredient, quantity, unit) => {
        let ingredientWasAdded = false;

        // first handle if new product, and get ingredient id
        const matchProduct = product => 
                product.name === ingredient.name &&
                product.coo === ingredient.coo &&
                product.brand === ingredient.brand &&
                product.category === ingredient.category &&
                product.subcategory === ingredient.subcategory;

        if(this.props.products.some(matchProduct)) {
            const products = this.props.products.slice().filter(matchProduct);
            ingredient.id = products[0].id;

        } else {
            const ids = this.props.products.map(item => item.id);
            ingredient.id = Math.max(...ids) + 1;
            this.props.onAddProduct(ingredient);
        }

        // now handle updating recipe, and informing user of any issues arising.

        const recipe = this.getRecipe();
        const existingIngredients = recipe.ingredients.slice();
        
        const existingIngredient = existingIngredients.find(x => x.id === ingredient.id);
        if (existingIngredient === undefined) {
            const recipeIngredient = {
                id: ingredient.id, 
                quantity: quantity,
                unit: unit,
            }
            existingIngredients.push(recipeIngredient);
            recipe.ingredients = existingIngredients;
            this.props.onUpdateRecipe(recipe);
            this.setState({showNewIngredientModal: !this.state.showNewIngredientModal});
            ingredientWasAdded = true;
        } else if ( existingIngredient.unit === unit) {
            const ingredientIndex = existingIngredients.findIndex(item => item.id === existingIngredient.id);
            const count = Number(existingIngredient.quantity) + Number(quantity);
            existingIngredients[ingredientIndex].quantity = count.toString();
            recipe.ingredients = existingIngredients;
            this.props.onUpdateRecipe(recipe);
            ingredientWasAdded = true;
            alert("Ingredient already exists. The quantity of the existing ingredient will be updated.");
            this.setState({showNewIngredientModal: !this.state.showNewIngredientModal});
        } else {
            alert("Error: You tried adding an existing ingredient with a different unit, which is not allowed. The existing ingredient has units of '" + existingIngredient.unit + "'");
        }

        return ingredientWasAdded;
    }

    render() {
        const products = this.props.products;
        const recipe = this.getRecipe();

        let ingredients;
        let instructions;

        if (recipe) {
            instructions = recipe.instructions.slice();
            ingredients = recipe.ingredients.map((item) => {
                const product = products.find(x => x.id === item.id);
                if(product !== undefined) {
                    item.name = product.name;
                }
                return (
                    item
                );
            });
        }

        return (
            <React.Fragment>
                <Card className="recipe-detail">
                    {
                        recipe ?
                        <React.Fragment>
                            <RecipeTitle title={recipe.title} updateTitle={this.handleSubmitNewTitle}  />

                            <IngredientsList 
                                ingredients={ingredients}
                                addIngredient={this.toggleNewIngredientModal}
                                removeIngredient={this.handleRemoveIngredient}
                            />

                            <InstructionsList 
                                instructions={instructions}
                                saveInstruction={this.handleSaveInstruction}
                                removeInstruction={this.handleRemoveInstruction}
                                addInstruction={this.handleSubmitNewInstruction}
                            />

                        </React.Fragment> :
                        <div>
                            <p>No recipe is selected.</p>
                        </div>
                    }
                </Card>

                <NewIngredientModal show={this.state.showNewIngredientModal} 
                onClose={this.toggleNewIngredientModal}
                onAddIngredient={this.handleSubmitIngredient}
                products={products}
                />

            </React.Fragment>
        );
    }
}

RecipeDetail.propTypes = {
    onUpdateRecipe: PropTypes.func.isRequired,
    onAddProduct: PropTypes.func.isRequired,
    recipes: PropTypes.array.isRequired,
    products: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired
}


const mapStateToProps = state => {
	return {
        recipes: state.recipes,
        products: state.products
    }
}

const mapDispatchToProps = dispatch => {
	return {
		onUpdateRecipe(recipe) {
			dispatch(
                updateRecipe(recipe)
            );
        },
        onAddProduct(product) {
            dispatch(
                addProduct(product)
            );
        }
	}
}

export {RecipeDetail};


const ConnectedRecipeDetail = connect(mapStateToProps, mapDispatchToProps)(RecipeDetail);
const RoutedRecipeDetail = (props) => {
    return (
        <ConnectedRecipeDetail
            id={props.match.params.id}
        />
    )
}

export default withRouter(RoutedRecipeDetail);