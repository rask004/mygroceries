import React, { Component } from 'react';
import './css/App.css';
import RecipesView from './components/recipes.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleAddRecipe = this.handleAddRecipe.bind(this);
    this.handleRemoveRecipe = this.handleRemoveRecipe.bind(this);
    this.handleUpdateRecipe = this.handleUpdateRecipe.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.hasIngredient = this.hasIngredient.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);

    this.state = {
      products: [
        { id: 1,
          name: "apple",
          coo: "New Zealand",
          brand: "Pure Orchards LTD",
          category: "produce",
          subcategory: "fruit",
          defaultUnit: "each",
        },
        { id: 2,
          name: "orange",
          coo: "New Zealand",
          brand: "Pure Orchards LTD",
          category: "produce",
          subcategory: "fruit",
          defaultUnit: "each",
          
        },
        { id: 3,
          name: "banana",
          coo: "Mexico",
          brand: "Dole LTD",
          category: "produce",
          subcategory: "fruit",
          defaultUnit: "each",
          
        },
        { id: 4,
          name: "bluetop milk",
          coo: "New Zealand",
          brand: "Anchor LTD",
          category: "foodstuffs",
          subcategory: "dairy",
          defaultUnit: "litre",
          
        },
        { id: 5,
          name: "apple",
          coo: "California",
          brand: "San Fernando Produce",
          category: "produce",
          subcategory: "fruit",
          defaultUnit: "each",
          
        },
        { id: 6,
          name: "gherkin",
          coo: "Australia",
          brand: "Sunkiss Products",
          category: "canned foods",
          subcategory: "pickles",
          defaultUnit: "grams",
          
        },
        { id: 7,
          name: "anaroba extra-strong coffee",
          coo: "Argentina",
          brand: "Rio de Feliz Comidas",
          category: "drinks",
          subcategory: "coffee",
          defaultUnit: "grams",
          
        },
      ],
      recipes: [
        {
          id: 1,
          title: "test recipe",
          ingredients: [
            { id: 1,
              quantity: 2,
              unit: "each",
            },
            { id: 2,
              quantity: 3,
              unit: "each",
            },
          ],
          instructions: [
            "eat the apples.",
            "eat the oranges.",
          ]
        },
        {
          id: 2,
          title: "another test recipe",
          ingredients: [
            { id: 3,
              quantity: 2,
              unit: "each",
            },
            { id: 4,
              quantity: 0.5,
              unit: "litre",
            },
          ],
          instructions: [
            "pour milk into a container.",
            "slice and add the bananas.",
          ]
        },
      ],
    };
  }

  handleAddRecipe(recipe) {
    const recipes = this.state.recipes.slice();
    let maxId;
    if (recipes.length > 0) {
      maxId = Math.max.apply(Math, recipes.map(x => x.id));
    } else {
      maxId = 0;
    }
    recipe.id = maxId + 1;
    this.setState({
      recipes: recipes.concat([recipe]),
    });
  }

  handleUpdateRecipe(recipe) {
    const recipes = this.state.recipes.slice();
    const index = recipes.findIndex(x => x.id === recipe.id);
    recipes[index] =recipe;
    this.setState({recipes: recipes});
  }

  handleRemoveRecipe(id) {
    const recipes = this.state.recipes.slice();
    const index = recipes.findIndex(x => x.id === id);
    recipes.splice(index, 1);
    this.setState({recipes: recipes,});
  }

  hasIngredient(ingredient) {
    let ingredients = this.state.products.slice();
    const fields = ["name", "coo", "brand", "category", "subcategory"];
    fields.forEach( field => {
      ingredients = ingredients.filter( item => {
        return item[field] === ingredient[field];
      });
    })

    if (ingredients.length === 0) {
      return -1;
    }

    return ingredients[0].id;
  }

  addIngredient(ingredient) {
    const products = this.state.products.slice();
    let maxId = Math.max.apply(Math, products.map(x => x.id));
    ingredient.id = maxId + 1;
    products.push(ingredient);
    this.setState({products: products});
    return ingredient.id;
  }

  removeIngredient(recipeId, ingredientId) {
    const recipes = this.state.recipes;
    const recipeIndex = recipes.findIndex(x => x.id === recipeId);
    const ingredients = recipes[recipeIndex].ingredients
    const ingredientIndex = ingredients.findIndex(x => x.id === ingredientId);
    ingredients.splice(ingredientIndex, 1);
    recipes[recipeIndex].ingredients = ingredients;
    this.setState({recipes: recipes});
  }

  render() {
    return (
      <div className="App">
        <RecipesView recipes={this.state.recipes} products={this.state.products} 
          handleAddRecipe={this.handleAddRecipe} handleRemoveRecipe={this.handleRemoveRecipe}
          handleUpdateRecipe={this.handleUpdateRecipe} hasIngredient={this.hasIngredient}
          handleRemoveIngredient={this.removeIngredient}
          handleAddNewIngredient={this.addIngredient} />
      </div>
    );
  }
}

export default App;
