import React, { Component } from 'react';
import './App.css';
import RecipesView from './recipes.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [
        {
          id: 1,
          title: "test recipe",
          ingredients: [
            "apples",
            "oranges",
          ],
          instructions: [
            "eat the apples.",
            "eat the oranges.",
          ]
        },
      ],
    };
  }

  render() {
    return (
      <div className="App">
        <RecipesView recipes={this.state.recipes} />
      </div>
    );
  }
}

export default App;
