import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {FaSave, FaRegTimesCircle} from 'react-icons/fa';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import {assign, omit, uniq} from 'lodash';
import 'typeface-roboto';
import '../../css/recipemodals.css';


const 
    quantity = "quantity requires a decimal or whole number greater than 0.",
    name = "ingredient name must have a value.",
    brand = "brand must have a value.",
    category = "category must have a value.",
    subcategory = "subcategory must have a value.",
    coo = "country of origin must have a value.",
    defaultunit = "default unit must have a value.",
    unit = "unit must have a value.",
    price = "price must have a value.";
const errorMessages = {
    quantity,
    name,
    brand,
    category,
    subcategory,
    coo,
    defaultunit,
    unit,
    price,
};

const makeDatalist = (products, key) => {
    return uniq(products.map(x => x[key])).map( (x, i) => (
        <option key={i} value={x} />
    ));
};


class NewIngredientPanel extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: "",
            category: "",
            subcategory: "",
            coo: "",
            brand: "",
            defaultunit: "",
            quantity: 0,
            unit: "",
            unitPrice: 0,
            errors: {
                name: true,
                category: true,
                subcategory: true,
                coo: true,
                brand: true,
                defaultunit: true,
                quantity: true,
                unit: true,
                unitPrice: true,
                message: errorMessages.quantity,
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        const newState = {[name]: value, errors: this.state.errors};
        if(name === "defaultunit") {
            newState.unit = value;
            newState.errors.unit = false;
        }
        this.setState(newState);
        this.handleErrorChecking(event);
    }

    handleErrorChecking = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        const errors = this.state.errors;

        if(value === "" || ((name === "quantity" || name === "unitPrice") && (isNaN(value) || Number(value) <= 0))) {
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

    handleSubmit = (event) => {
        event.preventDefault();
        // FIXME I don't know why it's putting "" in errors state, but this fixes it. 
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
            this.setState({
                name: "",
                category: "",
                subcategory: "",
                coo: "",
                brand: "",
                defaultunit: "",
                quantity: 0,
                unit: "",
                unitPrice: 0,
                errors: {
                    name: true,
                    category: true,
                    subcategory: true,
                    coo: true,
                    brand: true,
                    defaultunit: true,
                    quantity: true,
                    unit: true,
                    unitPrice: true,
                    message: errorMessages.quantity,
                }
            });
        }
    }

    handleClose() {
        this.setState({
            name: "",
            category: "",
            subcategory: "",
            coo: "",
            brand: "",
            defaultunit: "",
            quantity: 0,
            unit: "",
            unitPrice: 0,
            errors: {
                name: true,
                category: true,
                subcategory: true,
                coo: true,
                brand: true,
                defaultunit: true,
                quantity: true,
                unit: true,
                unitPrice: true,
                message: errorMessages.quantity,
            }
        });
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
            <div>
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

                            <Grid item xs={false} md={2}>  
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <TextField required name="unitPrice"
                                    label="Unit Price"
                                    variant="outlined"
                                    fullWidth
                                    placeholder="Price per Unit" 
                                    onChange={this.handleChange}
                                    value={this.state.price} 
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    error={this.state.errors.unitPrice}
                                />
                            </Grid>
                            
                            <Grid item xs={false} md={2}>    
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
                    <div className="button-pane">
                        <Button type="submit" variant="contained" color="primary" size="large">
                            <FaSave/>
                        </Button>
                        <Typography color="error" align="center" inline className="error-message">
                            {this.state.errors.message}
                        </Typography>
                        <Button type="button" variant="contained" color="primary" size="large" 
                            className="action-cancel"
                            onClick={this.handleClose}>
                            <FaRegTimesCircle/>
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

NewIngredientPanel.propTypes = {
    products: PropTypes.array.isRequired,
    onAddIngredient: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
}


const NewIngredientDialog = (props) => {
    return (
        <Dialog open={props.show}
                maxWidth="md" fullWidth scroll="body"
                disableEscapeKeyDown disableBackdropClick>
                <NewIngredientPanel 
                    products={props.products}
                    onAddIngredient={props.onAddIngredient}
                    onClose={props.onClose}
                />
        </Dialog>
    );
}

NewIngredientDialog.propTypes = {
    show: PropTypes.bool.isRequired,
    products: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired,
    onAddIngredient: PropTypes.func.isRequired
}

export {NewIngredientPanel};

export default NewIngredientDialog;
