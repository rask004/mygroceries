import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {OrderedList, OrderedListAddButton} from '../ui/lists';
import {AddForm, EditableTextItem} from '../ui/forms';
import ConnectedNewIngredientModal from './NewIngredientModal';
import {FaPencilAlt, FaTrash, FaSave, FaRegTimesCircle} from 'react-icons/fa';
import {updateRecipe, addProduct} from '../../store/actions';
import '../../css/recipes.css';


const NewIngredientModal = withRouter(ConnectedNewIngredientModal);


class InstructionsSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newInstruction: "",
            editingInstruction: -1,
            editedInstructionText: "",
        }

        this.onChange = this.onChange.bind(this);
        this.newInstruction = this.newInstruction.bind(this);
        this.handleSaveEditedInstruction = this.handleSaveEditedInstruction.bind(this);
        this.handleCancelEditingInstruction = this.handleCancelEditingInstruction.bind(this);
        this.handleToggleEditingInstruction = this.handleToggleEditingInstruction.bind(this);
    }

    newInstruction(event) {
        event.preventDefault();
        const instruction = this.state.newInstruction;
        this.props.addInstruction(instruction);
        this.setState({newInstruction: ""});
    }

    onChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({[name] : value});
    }

    handleSaveEditedInstruction (event, index) {
        event.preventDefault();
        const text = this.state.editedInstructionText;
        this.props.saveInstruction(index, text);
        this.setState({
            editingInstruction: -1,
            editedInstructionText: "",
        });
    }

    handleCancelEditingInstruction() {
        this.setState({editingInstruction: -1});
    }

    handleToggleEditingInstruction(index) {
        this.setState({
            editingInstruction: index,
            editedInstructionText: this.props.instructions[index],
        });
    }

    render() {
        const instructions = this.props.instructions.map((item, step) => { 
            return (
                <li key={step}>
                    {
                        this.state.editingInstruction === step ?
                        <form className="detail-instruction" onSubmit={(e) => this.handleSaveEditedInstruction(e, step)}>
                            <input value={this.state.editedInstructionText} onChange={this.onChange}
                                name="editedInstructionText" required placeholder="There must be an instruction here." />
                            <button type="submit"
                                ><FaSave/></button>
                            <button type="button" 
                                onClick={this.handleCancelEditingInstruction}><FaRegTimesCircle/></button>
                        </form> :
                        <div className="detail-instruction">
                            <div className="content">{item}</div>
                            <button type="button" onClick={() => this.handleToggleEditingInstruction(step)}><FaPencilAlt/></button>
                            <button type="button" onClick={() => this.props.removeInstruction(step)}><FaTrash/></button>
                        </div>
                    }
                </li>
            )
        });

        return (
            <div className="detail-instructions">
                <OrderedList 
                    title="Instructions"
                >
                    {instructions}
                </OrderedList>
                <AddForm addItem={this.newInstruction}
                    className={this.props.classNameAddform}>
                    <input name="newInstruction" required
                        value={this.state.newInstruction} 
                        onChange={this.onChange}
                        placeholder="new instruction..." />
                </AddForm>
            </div>
        );
    }
}

InstructionsSection.propTypes = {
    addInstruction: PropTypes.func.isRequired,
    saveInstruction: PropTypes.func.isRequired,
    removeInstruction: PropTypes.func.isRequired,
    instructions: PropTypes.array.isRequired,
}


class IngredientsSection extends Component {
    render() {
        const ingredients = this.props.ingredients.map((item, step) => { 
            return (
                <li key={item.id}>
                    <div className="content">{item.name}</div>
                    <div className="amount">{item.quantity}</div>
                    <div className="unit">{item.unit}</div>
                    <button type="button" 
                        onClick={() => this.props.removeIngredient(item.id)}>
                      <FaTrash/>
                    </button>
                </li>
            );
        });

        return (
            <OrderedListAddButton
                className="detail-ingredients"
                title="Ingredients"
                onClick={this.props.addIngredient}
                buttonTitle="Add Ingredient..."
            >
                {ingredients}
            </OrderedListAddButton>
        );
    }
}

IngredientsSection.propTypes = {
    addIngredient: PropTypes.func.isRequired,
    removeIngredient: PropTypes.func.isRequired,
    ingredients: PropTypes.array.isRequired,
}


class TitleSection extends Component {
    render() {
        return (
            <EditableTextItem 
                className="detail-title"
                updateText={this.props.updateTitle}
                text={this.props.title}
                placeholder="Recipe Title"
            />
        );
    }
}


class RecipeDetail extends Component {

    getRecipe() {
        const id = Number(this.props.match.params.id);
        const recipe = this.props.recipes.find(item => item.id === id);
        return recipe;
    }

    constructor(props) {
        super(props);
        const id = Number(props.match.params.id);
        const recipe = props.recipes.find(item => item.id === id);
        let value;
        value = recipe ?
            recipe.title : "";
        
        this.state = {
            newTitle: value,
            showNewIngredientModal: false,
            newIngredient: {
                name: "",
                category: "",
                subcategory: "",
                coo: "",
                brand: "",
                defaultunit: "",
            },
            newIngredientQuantity: 0,
            newIngredientUnit: "",
        }

        this.handleSubmitNewInstruction = this.handleSubmitNewInstruction.bind(this);
        this.handleSubmitNewTitle = this.handleSubmitNewTitle.bind(this);
        this.handleRemoveInstruction = this.handleRemoveInstruction.bind(this);
        this.handleSaveInstruction = this.handleSaveInstruction.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmitIngredient = this.handleSubmitIngredient.bind(this);
        this.handleRemoveIngredient = this.handleRemoveIngredient.bind(this);
        this.getRecipe = this.getRecipe.bind(this);
    }

    toggleModal() {
        this.setState({showNewIngredientModal: !this.state.showNewIngredientModal});
    }

    handleSaveInstruction(index, text) {
        const recipe = this.getRecipe();
        recipe.instructions[index] = text;
        this.props.onUpdateRecipe(recipe);
    }

    handleSubmitNewInstruction(text) {
        const recipe = this.getRecipe();
        recipe.instructions.push(text);
        this.props.onUpdateRecipe(recipe);
    }

    handleRemoveInstruction(index) {
        const recipe = this.getRecipe();
        recipe.instructions.splice(index, 1);
        this.props.onUpdateRecipe(recipe);
    }

    handleSubmitNewTitle(title) {
        const recipe = this.getRecipe();
        recipe.title = title;
        this.props.onUpdateRecipe(recipe);
    }

    handleRemoveIngredient(id) {
        const recipe = this.getRecipe();
        const ingredients = recipe.ingredients.slice().filter(item => item.id !== id);
        recipe.ingredients = ingredients;
        this.props.onUpdateRecipe(recipe);
    }

    handleSubmitIngredient(ingredient, quantity, unit) {
        let ingredientWasAdded = false;

        // first handle if new product, and get ingredient id
        const matchProduct = product => 
                product.name === ingredient.name &&
                product.coo === ingredient.coo &&
                product.brand === ingredient.brand &&
                product.category === ingredient.category &&
                product.subcategory === ingredient.subcategory;

        const productExists = this.props.products.some(matchProduct);
        if(productExists) {
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
        const recipe = this.getRecipe();

        let title;
        let ingredients;
        let instructions;

        if (recipe) {
            title = recipe.title;

            instructions = recipe.instructions.slice();
            console.log(recipe.ingredients);
            ingredients = recipe.ingredients.map((item) => {
                const product = this.props.products.find(x => x.id === item.id);
                if(product !== undefined) {
                    item.name = product.name;
                }
                return (
                    item
                );
            });
        }

        return (
            <section className="recipe-detail">
                {
                    recipe ?
                    <React.Fragment>
                        <TitleSection title={title} updateTitle={this.handleSubmitNewTitle}  />

                        <IngredientsSection 
                            ingredients={ingredients}
                            addIngredient={this.toggleModal}
                            removeIngredient={this.handleRemoveIngredient}
                        />

                        <InstructionsSection 
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
                <NewIngredientModal show={this.state.showNewIngredientModal} 
                    onClose={this.toggleModal}
                    onAddIngredient={this.handleSubmitIngredient}
                 />
            </section>
        );
    }
}

RecipeDetail.propTypes = {
    onUpdateRecipe: PropTypes.func.isRequired,
    onAddProduct: PropTypes.func.isRequired,
    recipes: PropTypes.array.isRequired,
    products: PropTypes.array.isRequired 
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


export {InstructionsSection, IngredientsSection, TitleSection};
export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail);