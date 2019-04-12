import React, { Component } from 'react';
import { connect } from 'react-redux';
import {FaTrash} from 'react-icons/fa';
import {ListWithAddForm} from '../ui/lists';
import PropTypes from 'prop-types';
import { addRecipe, removeRecipe } from '../../store/actions';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
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

        this.handleSubmitNewRecipe = this.handleSubmitNewRecipe.bind(this);
        this.handleSelectRecipe = this.handleSelectRecipe.bind(this);
        this.handleRemoveRecipe = this.handleRemoveRecipe.bind(this);
    }

    handleSubmitNewRecipe(title) {
        const id = Math.max(this.props.recipes.map((item) => (item.id))) + 1;
        this.props.onAddRecipe(id, title);
    }

    handleSelectRecipe(id) {
        this.setState({currentRecipeId: id});
    }

    handleRemoveRecipe(id) {
        this.props.onRemoveRecipe(id);
    }

    render() {
        const recipes = this.props.recipes.map( (item) => {
            const id = Number(item.id);
            return (
                <ListItem key={id} selected={id === this.state.currentRecipeId}>
                    <Button color="default" size="medium" variant="text"
                        onClick={() => this.handleSelectRecipe(id)}
                        href={"/recipe/" + id + "/"}
                        disableRipple={false}
                        disableFocusRipple={false}
                    >
                        {item.title}
                    </Button>
                    <Button color="primary" size="medium" variant="contained"
                        onClick={() => this.handleRemoveRecipe(id)}
                        disableRipple={false}
                        disableFocusRipple={false}
                    >
                        <FaTrash/>
                    </Button>
                </ListItem>
            );
        });
        return (
            <Card className="recipe-master">

                <Typography variant="display1" gutterBottom={true}>Recipes</Typography>

                <ListWithAddForm orderedlist={false} placeholder="Add Recipe..."
                    classFormName="recipe-add" addItem={this.handleSubmitNewRecipe}>
                    {recipes}
                </ListWithAddForm>

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


export default connect(mapStateToProps, mapDispatchToProps)(RecipeMaster);