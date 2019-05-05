import React, { Component } from 'react';
import {FaTrash} from 'react-icons/fa';
import {ListWithAddForm} from '../ui/lists';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import 'typeface-roboto';
import '../../css/recipemaster.css';


class RecipeList extends Component {
    constructor(props) {
        super(props);

        this.handleSubmitNewRecipe = this.handleSubmitNewRecipe.bind(this);
    }

    handleSubmitNewRecipe(title) {
        const ids = this.props.recipes.map((item) => (item.id));
        const maxId = Number(Math.max(...ids));
        this.props.onAddRecipe(maxId + 1, title);
    }

    render() {
        const recipes = this.props.recipes.map( (item) => {
            const id = Number(item.id);
            return (
                <ListItem key={id} selected={id === this.props.currentRecipeId}>
                    <Button color="default" size="medium" variant="text"
                        onClick={() => this.props.onSelectRecipe(id)}
                        href={"/recipe/" + id + "/"}
                        disableRipple={false}
                        disableFocusRipple={false}
                        className="action-select"
                    >
                        {item.title}
                    </Button>
                    <Button color="primary" size="medium" variant="contained"
                        onClick={() => this.props.onRemoveRecipe(id)}
                        disableRipple={false}
                        disableFocusRipple={false}
                        className="action-remove"
                    >
                        <FaTrash/>
                    </Button>
                </ListItem>
            );
        });
        return (
            <ListWithAddForm orderedlist={false} placeholder="Add Recipe..."
                classFormName="recipe-add" addItem={this.handleSubmitNewRecipe}>
                {recipes}
            </ListWithAddForm>
        );
    }
}

RecipeList.propTypes = {
    currentRecipeId: PropTypes.number.isRequired,
    recipes: PropTypes.array.isRequired,
    onAddRecipe: PropTypes.func.isRequired,
    onSelectRecipe: PropTypes.func.isRequired,
    onRemoveRecipe: PropTypes.func.isRequired
}


export default RecipeList;