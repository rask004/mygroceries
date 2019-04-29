import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FaSave, FaRegTimesCircle} from 'react-icons/fa';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import {assign, omit, uniq} from 'lodash';
import 'typeface-roboto';
import '../../css/recipemodals.css';


const errorMessages = {
    quantity: "quantity requires a decimal or whole number greater than 0.",
    name: "ingredient name must have a value.",
    brand: "brand must have a value.",
    category: "category must have a value.",
    subcategory: "subcategory must have a value.",
    coo: "country of origin must have a value.",
    defaultunit: "default unit must have a value.",
    unit: "unit must have a value.",
};


const initialModalState = {
    name: "",
    category: "",
    subcategory: "",
    coo: "",
    brand: "",
    defaultunit: "",
    quantity: 0,
    unit: "",
    errors: {
        name: true,
        category: true,
        subcategory: true,
        coo: true,
        brand: true,
        defaultunit: true,
        quantity: true,
        unit: true,
        message: errorMessages.quantity,
    }
};


const makeDatalist = (products, key) => {
    return uniq(products.map(x => x[key])).map( (x, i) => (
        <option key={i} value={x} />
    ));
};


class NewIngredientModal extends Component {
    constructor(props) {
        super(props);
        this.state = initialModalState;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleErrorChecking = this.handleErrorChecking.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        const newState = {[name]: value, unit: this.state.unit, errors: this.state.errors};
        if(name === "defaultunit") {
            newState.unit = value;
            newState.errors.unit = false;
        }
        this.setState(newState);
        this.handleErrorChecking(event);
    }

    handleErrorChecking(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        const errors = this.state.errors;

        if(value === "" || (name === "quantity" && (isNaN(value) || Number(value) <= 0))) {
            errors[name] = true;
        } else if (name !== undefined) {
            errors[name] = false;
        }

        errors.message = "";
        for(let errorName in errors) {
            if(errorName !== "message" && errors[errorName]) {
                errors.message = errorMessages[errorName];
                break;
            }
        }
        
        this.setState({errors: errors});
    }

    handleSubmit(event) {
        event.preventDefault();
        // I don't know why it's putting "" in errors state, but this fixes it. 
        const errorState = omit(this.state.errors, [""]);

        for(let name in errorState) {
            if(name === "message") {
                continue;
            }
            const isError = errorState[name];
            if (isError) {
                return false;
            }
        }

        const ingredient = omit(assign({}, this.state), ["quantity", "unit", "errors"]);

        const quantity = this.state.quantity;
        const unit = this.state.unit;
        const ingredientAdded = this.props.onAddIngredient(ingredient, quantity, unit);
        if (ingredientAdded) {
            this.setState(initialModalState);
        }
    }

    handleClose() {
        this.setState(initialModalState);
        this.props.onClose();
    }

    render() {

        const products = this.props.products;

        const names = makeDatalist(products, "name");
        const countries = makeDatalist(products, "coo");
        const categories = makeDatalist(products, "category");
        const subcategories = makeDatalist(products, "subcategory");
        const defaultUnits = makeDatalist(products, "defaultUnit");
        const brands = makeDatalist(products, "brand");

        return (
            <Dialog open={this.props.show} onClose={this.handleClose}
                maxWidth="md" fullWidth scroll="body">
                <form className="add-ingredient" 
                    onSubmit={this.handleSubmit}>

                    <datalist id="names">
                        {names}
                    </datalist>
                    <datalist id="categories">
                        {categories}
                    </datalist>
                    <datalist id="subcategories">
                        {subcategories}
                    </datalist>
                    <datalist id="brands">
                        {brands}
                    </datalist>
                    <datalist id="countries">
                        {countries}
                    </datalist>
                    <datalist id="default-units">
                        {defaultUnits}
                    </datalist>

                    <DialogTitle disableTypography className="title">
                        <Typography variant="display2">
                            Add Ingredient
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <Grid container className="row">
                            <Grid item xs={12} md={5}>
                                <TextField required name="name"
                                    placeholder="Name of Ingredient" 
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={this.handleChange}
                                    value={this.state.name} 
                                    inputProps={{
                                        list: "names"
                                    }}
                                    error={this.state.errors.name}
                                />
                            </Grid>
                            <Grid item xs={false} md={7}></Grid>
                        </Grid>

                        <Grid container className="row">
                            <Grid item xs={12} md={5}>
                                <TextField required name="category"
                                    placeholder="Category" 
                                    label="Category"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={this.handleChange}
                                    value={this.state.category} 
                                    inputProps={{
                                        list: "categories"
                                    }}
                                    error={this.state.errors.category}
                                />
                            </Grid>

                            <Grid item xs={false} md={2}></Grid>

                            <Grid item xs={12} md={5}>
                                <TextField required name="subcategory"
                                    label="Subcategory"
                                    placeholder="SubCategory"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={this.handleChange}
                                    value={this.state.subcategory} 
                                    inputProps={{
                                        list: "subcategories"
                                    }}
                                    error={this.state.errors.subcategory}
                                />
                            </Grid>
                        </Grid>

                        <Grid container className="row">
                            <Grid item xs={12} md={5}>
                                <TextField required name="brand"
                                    label="Brand"
                                    placeholder="Brand"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={this.handleChange}
                                    value={this.state.brand} 
                                    inputProps={{
                                        list: "brands"
                                    }}
                                    error={this.state.errors.brand}
                                />
                            </Grid>
                            
                            <Grid item xs={false} md={2}>    
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <TextField required name="coo"
                                    placeholder="Country of Origin" 
                                    label="Country"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={this.handleChange}
                                    value={this.state.coo} 
                                    inputProps={{
                                        list: "countries"
                                    }}
                                    error={this.state.errors.coo}
                                />
                            </Grid>
                        </Grid>

                        <Grid container className="row">
                            <Grid item xs={false} md={7}>    
                            </Grid>
                            
                            <Grid item xs={12} md={5}>
                                <TextField required name="defaultunit"
                                    placeholder="Default Unit (singular)" 
                                    label="Default Unit"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={this.handleChange}
                                    value={this.state.defaultunit} 
                                    inputProps={{
                                        list: "default-units"
                                    }}
                                    error={this.state.errors.defaultunit}
                                />
                            </Grid>
                        </Grid>

                        <Grid container className="row">
                            <Grid item xs={12} md={12}>
                            </Grid>
                        </Grid>

                        <Grid container className="row">

                            <Grid item xs={false} md={2}>  
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <TextField required name="quantity"
                                    label="Quantity"
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Quantity" 
                                    onChange={this.handleChange}
                                    value={this.state.quantity} 
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    error={this.state.errors.quantity}
                                />
                            </Grid>
                            
                            <Grid item xs={false} md={2}>    
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <TextField required name="unit"
                                    label="Unit"
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Unit (singular)"
                                    onChange={this.handleChange}
                                    value={this.state.unit}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        list: "default-units"
                                    }}
                                    error={this.state.errors.unit}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions className="button-pane">
                        <Button type="submit" variant="contained" color="primary" size="large"
                            onClick={this.handleErrorChecking}>
                            <FaSave/>
                        </Button>
                        <Typography color="error" align="center" inline className="error-message">
                            {this.state.errors.message}
                        </Typography>
                        <Button type="button" variant="contained" color="primary" size="large" 
                            onClick={this.handleClose}>
                            <FaRegTimesCircle/>
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}

NewIngredientModal.propTypes = {
    products: PropTypes.array.isRequired,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onAddIngredient: PropTypes.func.isRequired
}


const mapStateToProps = state => {
	return {
        products: state.products
    }
}

export {NewIngredientModal};

export default connect(mapStateToProps)(NewIngredientModal);
