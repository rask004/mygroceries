import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Modal from '../ui/modal';
import {IconContext} from 'react-icons';
import {FaSave, FaRegTimesCircle} from 'react-icons/fa';
import '../../css/modal.css';
import '../../css/recipes.css';


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
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({[name]: value});
    }

    handleSubmit(event) {
        event.preventDefault();
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
        // FIXME modal should clear on adding an ingredient, but not clear if no ingredient added.
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
            });
        }
    }

    handleClose(event) {
        this.setState({
            name: "",
            category: "",
            subcategory: "",
            coo: "",
            brand: "",
            defaultunit: "",
            quantity: 0,
            unit: "",
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
            <Modal show={this.props.show} onClose={this.handleClose}>
                <section className="add-ingredient">
                    <form onSubmit={this.handleSubmit} autoComplete="off">
                        <div className="title">Add Ingredient</div>
                        <div className="row">
                            <label className="col-1">Name:</label>
                            <input className="col-2" required name="name"
                                placeholder="name of ingredient" 
                                list="names"
                                onChange={this.handleChange}
                                value={this.state.name} />
                            <datalist id="names">
                                {names}
                            </datalist>
                        </div>
                        <div className="row">
                            <label className="col-1">Category:</label>
                            <input className="col-2" required 
                                name="category" placeholder="category" 
                                list="categories"
                                onChange={this.handleChange}
                                value={this.state.category}/>
                            <datalist id="categories">
                                {categories}
                            </datalist>
                            <label className="col-4">Subcategory:</label>
                            <input className="col-5" required 
                                name="subcategory" placeholder="subcategory" 
                                list="subcategories"
                                onChange={this.handleChange}
                                value={this.state.subcategory}/>
                            <datalist id="subcategories">
                                {subcategories}
                            </datalist>
                        </div>
                        <div className="row">
                            <input className="col-2" 
                                required name="brand" placeholder="brand" 
                                list="brands"
                                onChange={this.handleChange}
                                value={this.state.brand}/>
                            <datalist id="brands">
                                {brands}
                            </datalist>
                            <input className="col-5" 
                                required name="coo" placeholder="country of origin" 
                                list="coo-sources"
                                onChange={this.handleChange}
                                value={this.state.coo}/>
                            <datalist id="coo-sources">
                                {countries}
                            </datalist>
                        </div>
                        <div className="row"></div>
                        <div className="row"></div>
                        <div className="row">
                            <input className="col-5" 
                                required name="defaultunit" placeholder="default unit" 
                                list="unit-defaults"
                                onChange={this.handleChange}
                                value={this.state.defaultunit}/>
                            <datalist id="unit-defaults">
                                {defaultUnits}
                            </datalist>
                        </div>
                        <div className="row"></div>
                        <div className="row">
                            <label className="col-1" >Quantity:</label>
                            <input className="col-2" type="number" 
                                min="0" required 
                                name="quantity" 
                                onChange={this.handleChange}
                                value={this.state.quantity}/>
                            <label className="col-4" >Unit:</label>
                            <input className="col-5" required
                                name="unit" 
                                list="units"
                                onChange={this.handleChange}
                                value={this.state.unit}/>
                            <datalist id="units">
                                {defaultUnits}
                            </datalist>
                        </div>
                        <div className="button-pane">
                            <button type="button" onClick={this.props.onClose}>
                            <IconContext.Provider value={{size: "1.1em"}}>
                                <FaRegTimesCircle/>
                            </IconContext.Provider>
                            </button>
                            <button type="submit">
                            <IconContext.Provider value={{size: "1.1em"}}>
                                <FaSave/>
                            </IconContext.Provider>
                            </button>
                        </div>
                    </form>
                </section>
            </Modal>
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