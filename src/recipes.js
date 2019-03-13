import React, { Component } from 'react';
import './recipes.css';
import {FaPencilAlt, FaTrash, FaPlusSquare} from 'react-icons/fa';

class RecipesView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedRecipeId: 1,
        }
    }

    render() {

        const index = this.props.recipes.findIndex(x => x.id === this.state.selectedRecipeId);
        const recipe = index >= 0 ?
            this.props.recipes[index] :
            "There is no Recipe Selected.";
        return (
            <div className="recipes-view">
                <RecipeMaster />
                <RecipeDetail recipe={recipe} />
            </div>            
        );
    }
}

class RecipeMaster extends Component {

    handleSubmitNewRecipe(event) {
        event.preventDefault();
    }

    render() {
        return (
            <section className="recipe-master">

                <h2>Recipes</h2>

                <ul>
                    <li className="active"><div>Recipe 1</div><button type="button">
                      <FaTrash/></button>
                    </li>
                    <li><div>Recipe 2</div><button type="button"><FaTrash/></button></li>
                    <li><div>Recipe 3</div><button type="button"><FaTrash/></button></li>
                </ul>
                <form onSubmit={(e) => this.handleSubmitNewRecipe(e)}
                        className="recipe-add">
                    <div><button type="submit"><FaPlusSquare /></button></div>
                    <div><input placeholder="Add Recipe..." /></div>
                </form>
            </section>
        );
    }
}

class RecipeDetail extends Component {

    handleSubmitNewInstruction(event) {
        event.preventDefault();
    }

    render() {
        let title;
        let ingredients;
        let instructions;

        if (this.props.recipe.title) {
            title = this.props.recipe.title;
            ingredients = this.props.recipe.ingredients.map((item, step) => { 
                return (
                    <li key={step}>
                        <div className="content">{item}</div>
                        <div className="amount">{step}</div>
                        <div className="unit">{item}{item}</div>
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
                    this.props.recipe.title ?
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