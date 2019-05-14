import React from 'react';
import PropTypes from 'prop-types';
import {ListWithAddButton} from '../ui/lists';
import {FaTrash} from 'react-icons/fa';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';


const IngredientsSection = (props) => {
    const {
        ingredients,
        removeIngredient,
        addIngredient
    } = props;
    const children = ingredients.map((item) => { 
        return (
            <li key={item.id}>
                <Typography component="span">
                    <Grid container component="div" direction="row">
                        <Grid item component="span" xs={12} sm={6} md={4} lg={5} className="detail-content">{item.name}</Grid>
                        <Grid item component="span" xs={12} sm={6} md={3} lg={4} className="detail-content">{item.coo}</Grid>
                        <Grid item component="span" xs={12} sm={6} md={2} lg={1} className="detail-content">{item.quantity}</Grid>
                        <Grid item component="span" xs={12} sm={6} md={2} lg={1} className="detail-content">{item.unit}</Grid>
                        <Grid item component="span" xs={12} sm={6} md={1} lg={1}>
                        <Button type="button" color="primary" size="medium" variant="contained"
                            className="action-remove"
                            onClick={() => removeIngredient(item.id)}>
                            <FaTrash/>
                        </Button>
                        </Grid>
                    </Grid>
                </Typography>
            </li>
        );
    });

    const title = <Typography variant="title" gutterBottom={true}>Ingredients</Typography>;

    return (
        <ListWithAddButton
            orderedlist={false}
            className="detail-ingredients"
            title={title}
            onClick={addIngredient}
            buttonContent="Add Ingredient..."
        >
            {children}
        </ListWithAddButton>
    );
}

IngredientsSection.propTypes = {
    addIngredient: PropTypes.func.isRequired,
    removeIngredient: PropTypes.func.isRequired,
    ingredients: PropTypes.array.isRequired,
}


export default IngredientsSection;