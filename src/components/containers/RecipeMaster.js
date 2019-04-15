import React, { Component } from 'react';
import { connect } from 'react-redux';
import {FaTrash} from 'react-icons/fa';
import '../../css/recipes.css';
import {ListWithAddForm} from '../ui/lists';
import {LinkButton} from '../ui/buttons';
import PropTypes from 'prop-types';
import { addRecipe, removeRecipe } from '../../store/actions';


class RecipeMaster extends Component {

    constructor(props) {
        super(props);

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
        const recipes = this.props.recipes.map( (item, step) => {
            const id = Number(item.id);
            return (
                <li key={id}>
                    <div>
                        <LinkButton 
                            onClick={() => this.handleSelectRecipe(id)}
                            targetUrl={"/recipe/" + id + "/"}
                        >
                            {item.title}
                        </LinkButton>
                    </div>
                    <button type="button" onClick={() => this.handleRemoveRecipe(id)}>
                        <FaTrash/>
                    </button>
                </li>
            );
        });
        return (
            <section className="recipe-master">

                <h2>Recipes</h2>

                <ListWithAddForm orderedlist={false} placeholder="Add Recipe..."
                    classFormName="recipe-add" addItem={this.handleSubmitNewRecipe}>
                    {recipes}
                </ListWithAddForm>
            </section>
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