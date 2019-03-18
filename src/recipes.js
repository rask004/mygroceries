import React, { Component } from 'react';
import './recipes.css';
import {FaPencilAlt, FaTrash, FaPlusSquare} from 'react-icons/fa';
import PropTypes from 'prop-types';

class RecipesView extends Component {
    constructor(props) {
        super(props);

        this.handleAddRecipe = this.handleAddRecipe.bind(this);
        this.handleSelectRecipe = this.handleSelectRecipe.bind(this);
        this.handleRemoveRecipe = this.handleRemoveRecipe.bind(this);
        const id = props.recipes.length > 0 ?
            props.recipes[0].id :
            -1;
        this.state = {
            selectedRecipeId: id,
        }
    }

    handleAddRecipe(recipe) {
        this.props.handleAddRecipe(recipe);
    }

    handleRemoveRecipe(id) {
        if (this.state.selectedRecipeId === id) {
            if (this.props.recipes.length === 0) {
                this.setState({selectedRecipeId: null});
            }
            else {
                this.setState({selectedRecipeId: this.props.recipes[0].id})
            }
        }
        this.props.handleRemoveRecipe(id);
    }

    handleSelectRecipe(id) {
        this.setState({selectedRecipeId: id});
    }

    render() {
        let index = this.props.recipes.findIndex(x => x.id === this.state.selectedRecipeId);
        let recipe = index >= 0 ?
            this.props.recipes[index] :
            null;
        if(recipe !== null) {
            const ingredients = recipe.ingredients.slice();
            for(let i = 0; i < recipe.ingredients.length; i++) {
                const index = this.props.products.findIndex(x => x.id === ingredients[i].id);
                const name = this.props.products[index].name;
                ingredients[i].name = name;
            }
            recipe.ingredients = ingredients;
        }
        return (
            <div className="recipes-view">
                <RecipeMaster recipes={this.props.recipes} 
                  currentRecipe={this.state.selectedRecipeId} 
                  handleAddRecipe={this.props.handleAddRecipe} 
                  handleSelectRecipe={this.handleSelectRecipe}
                  handleRemoveRecipe={this.handleRemoveRecipe} />
                <RecipeDetail recipe={recipe} />
            </div>            
        );
    }
}

class RecipeMaster extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "",
        }

        this.handleInputChangeRecipeTitle = this.handleInputChangeRecipeTitle.bind(this);
        this.handleSubmitNewRecipe = this.handleSubmitNewRecipe.bind(this);
    }

    handleSubmitNewRecipe(event) {
        event.preventDefault();
        const recipe = {
            id: -1,
            title: this.state.title,
            ingredients: [],
            instructions: [],
        }
        this.props.handleAddRecipe(recipe);
        this.setState({title: "",});
    }

    handleInputChangeRecipeTitle(event) {
        this.setState({title: event.target.value});
    }

    render() {
        const currentRecipe = this.props.currentRecipe;
        const recipes = this.props.recipes.map( (item, step) => {
            return (
                <li key={item.id} className={currentRecipe === item.id ? "active" : ""}>
                    <div onClick={() => this.props.handleSelectRecipe(item.id)}>{item.title}</div>
                    <button type="button" onClick={() => this.props.handleRemoveRecipe(item.id)}>
                        <FaTrash/>
                    </button>
                </li>
            );
        });
        return (
            <section className="recipe-master">

                <h2>Recipes</h2>

                <ul>
                    {recipes}
                </ul>
                <form onSubmit={(e) => this.handleSubmitNewRecipe(e)}
                        className="recipe-add">
                    <div><button type="submit"><FaPlusSquare /></button></div>
                    <div>
                        <input name="title" required placeholder="Add Recipe..." 
                            value={this.state.title} onChange={this.handleInputChangeRecipeTitle}/>
                    </div>
                </form>
            </section>
        );
    }
}

RecipeMaster.propTypes = {
    currentRecipe: PropTypes.number.isRequired,
    recipes: PropTypes.array.isRequired,
    handleAddRecipe: PropTypes.func.isRequired,
}

class RecipeDetail extends Component {

    handleSubmitNewInstruction(event) {
        event.preventDefault();
    }

    render() {
        let title;
        let ingredients;
        let instructions;

        if (this.props.recipe !== null) {
            title = this.props.recipe.title;
            ingredients = this.props.recipe.ingredients.map((item, step) => { 
                return (
                    <li key={item.id}>
                        <div className="content">{item.name}</div>
                        <div className="amount">{item.quantity}</div>
                        <div className="unit">{item.unit}</div>
                        <button type="button"><FaTrash/></button>
                    </li>
                )
            });
            instructions = this.props.recipe.instructions.map((item, step) => { 
                return (
                    <li key={step}>
                      <div className="content">{step + 1}. {item}</div>
                      <button type="button"><FaPencilAlt/></button>
                      <button type="button"><FaTrash/></button>
                    </li>
                )
            });
        }

        return (
            <section className="recipe-detail">
                {
                    this.props.recipe !== null ?
                    <React.Fragment>
                        <div className="detail-title">
                            <div>{title}</div>
                            <button type="button"><FaPencilAlt/></button>
                        </div>

                        <div className="detail-ingredients">
                            <p>Ingredients</p>
                            <ul>
                                {ingredients}
                            </ul>
                            <button type="button">Add Ingredient...</button>
                        </div>

                        <div className="detail-instructions">
                            <p>Instructions</p>
                            <ol>
                                {instructions}
                            </ol>
                            <form onSubmit={(e) => this.handleSubmitNewInstruction(e)} 
                                    className="instruction-add">
                                <button type="button"><FaPlusSquare/></button>
                                <input placeholder="new instruction..." />
                            </form>
                        </div>
                    </React.Fragment> :
                    <div>
                        <p>No recipe is selected.</p>
                    </div>
                }
                
            </section>
        );
    }
}

export default RecipesView;