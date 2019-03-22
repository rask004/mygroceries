import React, { Component } from 'react';
import './recipes.css';
import {FaPencilAlt, FaTrash, FaPlusSquare, FaSave, FaBan} from 'react-icons/fa';
import PropTypes from 'prop-types';

class RecipesView extends Component {
    constructor(props) {
        super(props);

        this.handleSelectRecipe = this.handleSelectRecipe.bind(this);
        this.handleRemoveRecipe = this.handleRemoveRecipe.bind(this);
        
        const id = props.recipes.length > 0 ?
            props.recipes[0].id :
            -1;
        this.state = {
            selectedRecipeId: id,
        }

        this.newTitle = React.createRef();
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
                <RecipeDetail recipe={recipe} handleUpdateRecipe={this.props.handleUpdateRecipe}/>
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

    constructor(props) {
        super(props);

        let value;
        props.recipe.title ?
        value = props.recipe.title :
        value = "";

        this.state = {
            isEditingTitle: false,
            newTitle: value,
            newInstruction: "",
            editingInstruction: -1,
            editedInstructionText: "",
        }

        this.handleSubmitNewInstruction = this.handleSubmitNewInstruction.bind(this);
        this.handleToggleTitleForm = this.handleToggleTitleForm.bind(this);
        this.handleSubmitNewTitle = this.handleSubmitNewTitle.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleRemoveInstruction = this.handleRemoveInstruction.bind(this);
        this.handleToggleEditingInstruction = this.handleToggleEditingInstruction.bind(this);
        this.handleCancelEditingInstruction = this.handleCancelEditingInstruction.bind(this);
        this.handleSaveEditedInstruction = this.handleSaveEditedInstruction.bind(this);
    }

    handleCancelEditingInstruction() {
        this.setState({editingInstruction: -1});
    }

    handleToggleEditingInstruction(index) {
        this.setState({
            editingInstruction: index,
            editedInstructionText: this.props.recipe.instructions[index],
        });
    }

    handleSaveEditedInstruction(event, index) {
        event.preventDefault();
        const recipe = this.props.recipe;
        recipe.instructions[index] = this.state.editedInstructionText;
        this.props.handleUpdateRecipe(recipe);
        this.setState({
            editingInstruction: -1,
            editedInstructionText: "",
        });
    }

    handleSubmitNewInstruction(event) {
        event.preventDefault();
        const recipe = this.props.recipe;
        recipe.instructions.push(this.state.newInstruction);
        this.props.handleUpdateRecipe(recipe);
        this.setState({newInstruction: "" });
    }

    handleToggleTitleForm(event) {
        this.setState({isEditingTitle: !this.state.isEditingTitle });
    }

    handleRemoveInstruction(index) {
        const recipe = this.props.recipe;
        recipe.instructions.splice(index, 1);
        this.props.handleUpdateRecipe(recipe);
    }

    handleSubmitNewTitle(event) {
        event.preventDefault();
        const recipe = this.props.recipe;
        recipe.title = this.state.newTitle;
        this.props.handleUpdateRecipe(recipe);
        this.setState({isEditingTitle: !this.state.isEditingTitle });
    }

    handleFormChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({[name]: value});
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
                        {
                            this.state.editingInstruction === step ?
                            <React.Fragment>
                                <form className="detail-instruction" onSubmit={(e) => this.handleSaveEditedInstruction(e, step)}>
                                    <input value={this.state.editedInstructionText} onChange={this.handleFormChange}
                                        name="editedInstructionText" required placeholder="There must be an instruction here." />
                                    <button type="submit"
                                        ><FaSave/></button>
                                    <button type="button" 
                                        onClick={this.handleCancelEditingInstruction}><FaBan/></button>
                                </form>
                            </React.Fragment> :
                            <React.Fragment>
                                <div className="content">{step + 1}. {item}</div>
                                <button type="button" onClick={() => this.handleToggleEditingInstruction(step)}><FaPencilAlt/></button>
                                <button type="button" onClick={() => this.handleRemoveInstruction(step)}><FaTrash/></button>
                            </React.Fragment>
                        }
                    </li>
                )
            });
        }

        return (
            <section className="recipe-detail">
                {
                    this.props.recipe !== null ?
                    <React.Fragment>
                        {
                            !this.state.isEditingTitle ?
                            <div className="detail-title">
                                <div onClick={this.handleToggleTitleForm}>{title}</div> 
                            </div> :
                            <form className="detail-title" onSubmit={this.handleSubmitNewTitle}>
                                <input value={this.state.newTitle} onChange={this.handleFormChange}
                                    name="newTitle" required placeholder="Recipe Title" />
                                <button type="submit"
                                    ><FaSave/></button>
                                <button type="button" 
                                    onClick={this.handleToggleTitleForm}><FaBan/></button>
                            </form>
                        }

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
                            <form onSubmit={this.handleSubmitNewInstruction} 
                                    className="instruction-add">
                                <button type="submit"><FaPlusSquare/></button>
                                <input name="newInstruction" required
                                    value={this.state.newInstruction} 
                                    onChange={this.handleFormChange}
                                    placeholder="new instruction..." />
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