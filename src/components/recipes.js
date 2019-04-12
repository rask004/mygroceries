import React, { Component } from 'react';
import '../css/recipes.css';
import {IconContext} from 'react-icons';
import {FaTrash, FaPlusSquare, FaSave, FaRegTimesCircle} from 'react-icons/fa';
import PropTypes from 'prop-types';
import Modal from '../ui/modal';
import { InstructionsSection, IngredientsSection, TitleSection } from './RecipeDetail';


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
                products={this.props.products}
                handleAddNewIngredient={this.props.handleAddNewIngredient}
                handleRemoveIngredient={this.props.handleRemoveIngredient}
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
        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleRemoveInstruction = this.handleRemoveInstruction.bind(this);
        this.handleSaveInstruction = this.handleSaveInstruction.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleAddIngredientChange = this.handleAddIngredientChange.bind(this);
        this.handleSubmitIngredient = this.handleSubmitIngredient.bind(this);
        this.handleRemoveIngredient = this.handleRemoveIngredient.bind(this);
    }

    toggleModal() {
        this.setState({showNewIngredientModal: !this.state.showNewIngredientModal});
    }

    handleSaveInstruction(index, text) {
        const recipe = this.props.recipe;
        recipe.instructions[index] = text;
        this.props.handleUpdateRecipe(recipe);
    }

    handleSubmitNewInstruction(text) {
        const recipe = this.props.recipe;
        recipe.instructions.push(text);
        this.props.handleUpdateRecipe(recipe);
    }

    handleRemoveInstruction(index) {
        const recipe = this.props.recipe;
        recipe.instructions.splice(index, 1);
        this.props.handleUpdateRecipe(recipe);
    }

    handleSubmitNewTitle(title) {
        const recipe = this.props.recipe;
        recipe.title = title;
        this.props.handleUpdateRecipe(recipe);
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

    handleRemoveIngredient(id) {
        const recipeId = this.props.recipe.id;
        this.props.handleRemoveIngredient(recipeId, id);
    }

    handleSubmitIngredient(event) {
        event.preventDefault();
        const newIngredient = this.state.newIngredient;
        let id;
        id = this.props.hasIngredient(newIngredient);
        if(id < 0) {
            id = this.props.handleAddNewIngredient(newIngredient);
        }

        const recipe = this.props.recipe;
        const ingredients = recipe.ingredients.slice();
        const existingIngredientIndex = ingredients.findIndex(x => x.id === id)
        if (existingIngredientIndex < 0) {
            const recipeIngredient = {
                id: id, 
                quantity: this.state.newIngredientQuantity,
                unit: this.state.newIngredientUnit,
            }
            ingredients.push(recipeIngredient);
            this.setState({showNewIngredientModal: !this.state.showNewIngredientModal});

        } else if ( ingredients[existingIngredientIndex].unit === this.state.newIngredientUnit) {
            let count = Number(ingredients[existingIngredientIndex].quantity);
            count += Number(this.state.newIngredientQuantity);
            ingredients[existingIngredientIndex].quantity = count.toString();
            alert("Ingredient already exists. The quantity of the existing ingredient will be updated.");
            this.setState({showNewIngredientModal: !this.state.showNewIngredientModal});

        } else {
            alert("Error: You tried adding an existing ingredient with a different unit, which is not allowed. The existing ingredient has units of '" + ingredients[existingIngredientIndex].unit + "'");
        }
        
        recipe.ingredients = ingredients;
        this.props.handleUpdateRecipe(recipe);
    }

    render() {
        let title;
        let ingredients;
        let instructions;
        let names;
        let countries;
        let categories;
        let subcategories;
        let defaultUnits;
        let brands;

        if (this.props.recipe !== null) {
            title = this.props.recipe.title;

            ingredients = this.props.recipe.ingredients.slice();
            instructions = this.props.recipe.instructions.slice();

            names = this.props.products.map( item => item.name);
            names = Array.from(new Set(names));
            names = names.sort().map( (item, step) => {
                return (
                    <option key={step} value={item} />
                )
            });

            countries = this.props.products.map( item => item.coo);
            countries = Array.from(new Set(countries));
            countries = countries.sort().map( (item, step) => {
                return (
                    <option key={step} value={item} />
                )
            });

            categories = this.props.products.map( item => item.category);
            categories = Array.from(new Set(categories));
            categories = categories.sort().map( (item, step) => {
                return (
                    <option key={step} value={item} />
                )
            });

            subcategories = this.props.products.map( item => item.subcategory);
            subcategories = Array.from(new Set(subcategories));
            subcategories = subcategories.map( (item, step) => {
                return (
                    <option key={step} value={item} />
                )
            });

            brands = this.props.products.map( item => item.brand);
            brands = Array.from(new Set(brands));
            brands = brands.map( (item, step) => {
                return (
                    <option key={step} value={item} />
                )
            });

            defaultUnits = this.props.products.map( item => item.defaultUnit);
            defaultUnits = Array.from(new Set(defaultUnits));
            defaultUnits = defaultUnits.map( (item, step) => {
                return (
                    <option key={step} value={item} />
                )
            });
        }

        return (
            <section className="recipe-detail">
                {
                    this.props.recipe !== null ?
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
                <Modal show={this.state.showNewIngredientModal} onClose={(e) => this.toggleModal()}>
                    <section className="add-ingredient">
                        <form onSubmit={this.handleSubmitIngredient} autoComplete="off">
                            <div className="title">Add Ingredient</div>
                            <div className="row">
                                <label className="col-1">Name:</label>
                                <input className="col-2" required name="name"
                                  placeholder="name of ingredient" 
                                  list="names"
                                  onChange={this.handleAddIngredientChange}
                                  value={this.state.newIngredient.name} />
                                <datalist id="names">
                                    {names}
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
                                    {categories}
                                </datalist>
                                <label className="col-4">Subcategory:</label>
                                <input className="col-5" required 
                                  name="subcategory" placeholder="subcategory" 
                                  list="subcategories"
                                  onChange={this.handleAddIngredientChange}
                                  value={this.state.newIngredient.subcategory}/>
                                <datalist id="subcategories">
                                    {subcategories}
                                </datalist>
                            </div>
                            <div className="row">
                                <input className="col-2" 
                                  required name="brand" placeholder="brand" 
                                  list="brands"
                                  onChange={this.handleAddIngredientChange}
                                  value={this.state.newIngredient.brand}/>
                                <datalist id="brands">
                                    {brands}
                                </datalist>
                                <input className="col-5" 
                                  required name="coo" placeholder="country of origin" 
                                  list="coo-sources"
                                  onChange={this.handleAddIngredientChange}
                                  value={this.state.newIngredient.coo}/>
                                <datalist id="coo-sources">
                                    {countries}
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
                                    {defaultUnits}
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
    handleRemoveIngredient: PropTypes.func.isRequired,
    recipe: PropTypes.object,
}

export default RecipesView;