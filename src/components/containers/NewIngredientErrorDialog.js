import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {AlertDialogSlide} from '../ui/modals';
import '../../css/recipemodals.css';


class NewIngredientErrorDialog extends Component {
    render() {
        return (
            <AlertDialogSlide
                open={this.props.open}
                onClose={this.props.onClose}
                slideDirection="down"
                title="Error submitting New Ingredient"
                message={this.props.message}
            />
        );
    }
}

NewIngredientErrorDialog.propTypes = {
    message: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}

NewIngredientErrorDialog.defaultProps = {
    open: false,
}


export default NewIngredientErrorDialog;