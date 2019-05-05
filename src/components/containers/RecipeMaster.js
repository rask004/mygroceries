import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipeList from './RecipeList';
import PropTypes from 'prop-types';
import { addRecipe, removeRecipe } from '../../store/actions';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';
import '../../css/recipemaster.css';


class RecipeMaster extends Component {

    constructor(props) {
        super(props);

        let currentId = -1;
        if (this.props.location) {
            const path = this.props.location.pathname.match(/\/recipe\/\d+/gi);
            if (path !== null) {
                currentId = Number(path[0].replace("/recipe/", "").replace("/", ""));
                const ids = this.props.recipes.map(x => x.id);
                if (ids.length > 0 && !ids.includes(currentId)) {
                    this.props.history.push("/recipe/" + ids[0] + "/");
                    currentId = ids[0];
                }
                else if (ids.length === 0) {
                    this.props.history.push("/recipe/");
                }
            }
        }

        this.state = {
            currentRecipeId: currentId,
        }

        this.handleSelectRecipe = this.handleSelectRecipe.bind(this);
        this.handleRemoveRecipe = this.handleRemoveRecipe.bind(this);
    }

    handleSelectRecipe(id) {
        this.setState({currentRecipeId: id});
    }

    handleRemoveRecipe(id) {
        this.props.onRemoveRecipe(id);
    }

    render() {
        return (
            <Card className="recipe-master">

                <Typography variant="display1" gutterBottom={true}>Recipes</Typography>

                <RecipeList 
                    currentRecipeId={this.state.currentRecipeId}
                    recipes={this.props.recipes}
                    onAddRecipe={this.props.onAddRecipe}
                    onSelectRecipe={this.handleSelectRecipe}
                    onRemoveRecipe={this.handleRemoveRecipe}
                />

            </Card>
        );
    }
}

RecipeMaster.propTypes = {
    recipes: PropTypes.array.isRequired,
    onAddRecipe: PropTypes.func.isRequired,
    onRemoveRecipe: PropTypes.func.isRequired,
}


const mapStateToProps = state => {
	return {
        recipes: state.recipes
    }
}

const mapDispatchToProps = dispatch => {
	return {
		onAddRecipe(id, title) {
			dispatch(
				addRecipe(id, title)
			);
        },
        onRemoveRecipe(id) {
            dispatch(
                removeRecipe(id)
            );
        }
	}
}

export {RecipeMaster};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeMaster);