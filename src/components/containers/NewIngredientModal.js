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
import 'typeface-roboto';
import '../../css/recipemodals.css';


class NewIngredientModal extends Component {
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
            errors: {
                name: true,
                category: true,
                subcategory: true,
                coo: true,
                brand: true,
                defaultunit: true,
                quantity: true,
                unit: true,
                message: "quantity requires a decimal or whole number greater than 0.",
            },
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleErrorChecking = this.handleErrorChecking.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        const newState = {[name]: value};
        newState.errors = this.state.errors;
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

        if(name !== undefined) {
            if(name === "quantity") {
                if (isNaN(value) || value === "") {
                    errors[name] = true;
                } else if (Number(value) <= 0) {
                    errors[name] = true;
                } else {
                    errors[name] = false;
                }
            } else {
                if (value === "") {
                    errors[name] = true;
                } else {
                    errors[name] = false;
                }
            }
        }

        if(errors.quantity) {
            errors.message = "quantity requires a decimal or whole number greater than 0.";
        } else if (errors.name) {
            errors.message = "ingredient name must have a value.";
        } else if (errors.brand) {
            errors.message = "brand must have a value.";
        } else if (errors.category) {
            errors.message = "category must have a value.";
        } else if (errors.subcategory) {
            errors.message = "subcategory must have a value.";
        } else if (errors.coo) {
            errors.message = "country of origin must have a value.";
        } else if (errors.defaultunit) {
            errors.message = "default unit must have a value.";
        } else if (errors.unit) {
            errors.message = "unit must have a value.";
        } else {
            errors.message = "";
        }

        this.setState({errors: errors});
    }

    handleSubmit(event) {
        event.preventDefault();
        const errors = this.state.errors;
        const isError = errors.brand || errors.category || errors.coo || errors.defaultunit
                        || errors.name || errors.quantity || errors.subcategory || errors.unit;
        if (isError) {
            return false;
        }
        const ingredient = {
            name: this.state.name,
            category: this.state.category,
            subcategory: this.state.subcategory,
            coo: this.state.coo,
            brand: this.state.brand,
            defaultunit: this.state.defaultunit,
        };
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
                errors: {
                    name: true,
                    category: true,
                    subcategory: true,
                    coo: true,
                    brand: true,
                    defaultunit: true,
                    quantity: true,
                    unit: true,
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
            errors: {
                name: true,
                category: true,
                subcategory: true,
                coo: true,
                brand: true,
                defaultunit: true,
                quantity: true,
                unit: true,
                message: "quantity requires a decimal or whole number greater than 0.",
            }
        });

        this.props.onClose();
    }

    render() {

        let names = this.props.products.map( item => item.name);
        names = Array.from(new Set(names));
        names = names.sort().map( (item, step) => {
            return (
                <option key={step} value={item} />
            )
        });

        let countries = this.props.products.map( item => item.coo);
        countries = Array.from(new Set(countries));
        countries = countries.sort().map( (item, step) => {
            return (
                <option key={step} value={item} />
            )
        });

        let categories = this.props.products.map( item => item.category);
        categories = Array.from(new Set(categories));
        categories = categories.sort().map( (item, step) => {
            return (
                <option key={step} value={item} />
            )
        });

        let subcategories = this.props.products.map( item => item.subcategory);
        subcategories = Array.from(new Set(subcategories));
        subcategories = subcategories.map( (item, step) => {
            return (
                <option key={step} value={item} />
            )
        });

        let brands = this.props.products.map( item => item.brand);
        brands = Array.from(new Set(brands));
        brands = brands.map( (item, step) => {
            return (
                <option key={step} value={item} />
            )
        });

        let defaultUnits = this.props.products.map( item => item.defaultUnit);
        defaultUnits = Array.from(new Set(defaultUnits));
        defaultUnits = defaultUnits.map( (item, step) => {
            return (
                <option key={step} value={item} />
            )
        });

        return (
            <React.Fragment>
                <Dialog open={this.props.show} onClose={this.handleClose}
                    maxWidth="md" fullWidth scroll="body">
                    <form className="add-ingredient" 
                        onSubmit={this.handleSubmit}>
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
                                    <datalist id="names">
                                        {names}
                                    </datalist>
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
                                    <datalist id="categories">
                                        {categories}
                                    </datalist>
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
                                    <datalist id="subcategories">
                                        {subcategories}
                                    </datalist> 
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
                                    <datalist id="brands">
                                        {brands}
                                    </datalist>
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
                                    <datalist id="countries">
                                        {countries}
                                    </datalist>
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
                                    <datalist id="default-units">
                                        {defaultUnits}
                                    </datalist>
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
            </React.Fragment>
        );
    }
}

NewIngredientModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onAddIngredient: PropTypes.func.isRequired
}


const mapStateToProps = state => {
	return {
        products: state.products
    }
}


export default connect(mapStateToProps)(NewIngredientModal);