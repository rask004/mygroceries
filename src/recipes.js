import React, { Component } from 'react';
import './recipes.css';
import {IconContext} from 'react-icons';
import {FaPencilAlt, FaTrash, FaPlusSquare, FaSave, FaRegTimesCircle} from 'react-icons/fa';
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
                <RecipeDetail recipe={recipe} handleUpdateRecipe={this.props.handleUpdateRecipe}
                handleAddNewIngredient={this.props.handleAddNewIngredient}
                hasIngredient={this.props.hasIngredient} />
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
    handleSelectRecipe: PropTypes.func.isRequired,
    handleRemoveRecipe: PropTypes.func.isRequired,
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
        this.handleToggleTitleForm = this.handleToggleTitleForm.bind(this);
        this.handleSubmitNewTitle = this.handleSubmitNewTitle.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleRemoveInstruction = this.handleRemoveInstruction.bind(this);
        this.handleToggleEditingInstruction = this.handleToggleEditingInstruction.bind(this);
        this.handleCancelEditingInstruction = this.handleCancelEditingInstruction.bind(this);
        this.handleSaveEditedInstruction = this.handleSaveEditedInstruction.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleAddIngredientChange = this.handleAddIngredientChange.bind(this);
        this.handleSubmitIngredient = this.handleSubmitIngredient.bind(this);
    }

    toggleModal() {
        this.setState({showNewIngredientModal: !this.state.showNewIngredientModal});
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

    handleAddIngredientChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        const newIngredient = this.state.newIngredient;
        newIngredient[name] = value;
        this.setState({newIngredient: newIngredient});
    }

    handleSubmitIngredient(event) {
        event.preventDefault();
        this.setState({showNewIngredientModal: !this.state.showNewIngredientModal});
        const newIngredient = this.state.newIngredient;
        let id;
        id = this.props.hasIngredient(newIngredient);
        if(id < 0) {
            id = this.props.handleAddNewIngredient(newIngredient);
        }

        const recipe = this.props.recipe;
        const ingredients = recipe.ingredients.slice();
        const recipeIngredient = {
            id: id, 
            quantity: this.state.newIngredientQuantity,
            unit: this.state.newIngredientUnit,
        }

        ingredients.push(recipeIngredient);
        recipe.ingredients = ingredients;
        this.props.handleUpdateRecipe(recipe);
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
                            <form className="detail-instruction" onSubmit={(e) => this.handleSaveEditedInstruction(e, step)}>
                                <input value={this.state.editedInstructionText} onChange={this.handleFormChange}
                                    name="editedInstructionText" required placeholder="There must be an instruction here." />
                                <button type="submit"
                                    ><FaSave/></button>
                                <button type="button" 
                                    onClick={this.handleCancelEditingInstruction}><FaRegTimesCircle/></button>
                            </form> :
                            <div className="detail-instruction">
                                <div className="content">{item}</div>
                                <button type="button" onClick={() => this.handleToggleEditingInstruction(step)}><FaPencilAlt/></button>
                                <button type="button" onClick={() => this.handleRemoveInstruction(step)}><FaTrash/></button>
                            </div>
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
                                    onClick={this.handleToggleTitleForm}><FaRegTimesCircle/></button>
                            </form>
                        }

                        <div className="detail-ingredients">
                            <p>Ingredients</p>
                            <ul>
                                {ingredients}
                            </ul>
                            <button type="button" onClick={this.toggleModal}>Add Ingredient...</button>
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
                <Modal show={this.state.showNewIngredientModal} onClose={(e) => this.toggleModal()}>
                    <section className="add-ingredient">
                        <form onSubmit={this.handleSubmitIngredient}>
                            <div className="title">Add Ingredient</div>
                            <div className="row">
                                <label className="col-1">Name:</label>
                                <input className="col-2" required name="name"
                                  placeholder="name of ingredient" 
                                  list="names"
                                  onChange={this.handleAddIngredientChange}
                                  value={this.state.newIngredient.name} />
                                <datalist id="names">
                                </datalist>
                            </div>
                            <div className="row">
                                <label className="col-1">Category:</label>
                                <input className="col-2" required 
                                  name="category" placeholder="category" 
                                  list="categories"
                                  onChange={this.handleAddIngredientChange}
                                  value={this.state.newIngredient.category}/>
                                <datalist id="categories">
                                </datalist>
                                <label className="col-4">Subcategory:</label>
                                <input className="col-5" required 
                                  name="subcategory" placeholder="subcategory" 
                                  list="subcategories"
                                  onChange={this.handleAddIngredientChange}
                                  value={this.state.newIngredient.subcategory}/>
                                <datalist id="subcategories">
                                </datalist>
                            </div>
                            <div className="row">
                                <input className="col-2" 
                                  required name="brand" placeholder="brand" 
                                  list="brands"
                                  onChange={this.handleAddIngredientChange}
                                  value={this.state.newIngredient.brand}/>
                                <datalist id="brands">
                                </datalist>
                                <input className="col-5" 
                                  required name="coo" placeholder="country of origin" 
                                  list="coo-sources"
                                  onChange={this.handleAddIngredientChange}
                                  value={this.state.newIngredient.coo}/>
                                <datalist id="coo-sources">
                                </datalist>
                            </div>
                            <div className="row"></div>
                            <div className="row"></div>
                            <div className="row">
                                <input className="col-5" 
                                  required name="defaultunit" placeholder="default unit" 
                                  list="unit-defaults"
                                  onChange={this.handleAddIngredientChange}
                                  value={this.state.newIngredient.defaultunit}/>
                                <datalist id="unit-defaults">
                                </datalist>
                            </div>
                            <div className="row"></div>
                            <div className="row">
                                <label className="col-1" >Quantity:</label>
                                <input className="col-2" type="number" 
                                  min="0" required 
                                  name="newIngredientQuantity" 
                                  onChange={this.handleFormChange}
                                  value={this.state.newIngredientQuantity}/>
                                <label className="col-4" >Unit:</label>
                                <input className="col-5" required
                                  name="newIngredientUnit" 
                                  onChange={this.handleFormChange}
                                  value={this.state.newIngredientUnit}/>
                            </div>
                            <div className="button-pane">
                                <button type="button" onClick={this.toggleModal}>
                                <IconContext.Provider value={{size: "1.1em"}}>
                                    <FaRegTimesCircle/>
                                </IconContext.Provider>
                                </button>
                                <button type="submit">
                                <IconContext.Provider value={{size: "1.1em"}}>
                                    <FaSave/>
                                </IconContext.Provider>
                                </button>
                            </div>
                        </form>
                    </section>
                </Modal>
            </section>
        );
    }
}

RecipeDetail.propTypes = {
    handleUpdateRecipe: PropTypes.func.isRequired,
    hasIngredient: PropTypes.func.isRequired,
    handleAddNewIngredient: PropTypes.func.isRequired,
    recipe: PropTypes.object,
}

class Modal extends Component {
    render() {
        return (
            <React.Fragment>
            {
                !this.props.show ?
                "" :
                <div className="modal-background">
                    <button type="button" 
                      className="modal-button-close" 
                      onClick={this.props.onClose}>
                        <IconContext.Provider value={{color: "white", size: "3em"}}>
                            <FaRegTimesCircle/>
                        </IconContext.Provider>
                    </button>
                    <div className="modal">
                      {this.props.children}
                    </div>
                    <div className="modal-shadow">
                    </div>
                </div>
            }
            </React.Fragment>
        )
    }
}

Modal.propTypes = {
    onClose: PropTypes.func,
    show: PropTypes.bool,
}

export default RecipesView;