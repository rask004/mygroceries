import React, { Component } from 'react';
import * as D from 'date-fns';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { addShoppingDay, removeShoppingDay, 
    removeShoppingItem, addShoppingItem } from '../../store/actions';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {FaTrash, FaPlus} from 'react-icons/fa';
import ShoppingListDialog, {ShoppingListPanel} from './NewShoppingDialog';
import 'typeface-roboto';
import '../../css/shoppinglist.css';


class ShoppingList extends Component {

    state = {
        showModal: false
    }

    toggleShowModal = () => {
        this.setState((prevState) => {return {showModal: !prevState.showModal}});
    }

    render() {
        const products = this.props.products;
        const shoppinglists = this.props.shoppingLists.length > 0 ?
        this.props.shoppingLists.map( (shoplist, step) => {
            const items = shoplist.items.slice();
            const shoppingitems = items.length > 0 ?
            items.map( (item) => {
                const product = products.find(p => p.id === item.id);
                return (
                    <li key={item.id}>
                        <Grid container>
                            <Grid item xs={12} sm={6} md={3}>
                                <Typography component="span" className="content-brand">
                                    {product.brand}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography component="span" className="content-name">
                                    {product.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={1}>
                                <Typography component="span" className="content-quantity" align="right">
                                    {item.quantity}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={1}>
                                <Typography component="span" className="content-unit">
                                    {item.unit}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={2}>
                                <Typography component="span" className="content-price" align="right">
                                    -unit * quantity price-
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={1} align="right">
                                <Button variant="contained" size="small" color="primary" type="button"
                                    className="remove-item-action"
                                    onClick={() => this.props.onRemoveShoppingListItem(shoplist.datetime, item.id)}>
                                    <FaTrash/>
                                </Button>
                            </Grid>
                        </Grid>
                    </li>
                );
            }) :
            <Grid container>
                <Grid item xs={12}>
                    <Typography component="span">This list has no items.</Typography>
                </Grid>
            </Grid>;

            const summaryItem = items.length > 0 ?
            <li key={-1}>
                <Grid container>
                    <Grid item xs={12} sm={6} md={9} />
                    <Grid item xs={12} sm={6} md={2} align="right">
                        <Typography className="content-total" align="right">
                            -total price-
                        </Typography>
                    </Grid> 
                </Grid>
            </li> :
            "";

            return (
                <div key={shoplist.datetime} className="content-shopping">
                    <div className="content-title">
                        <Grid container>
                            <Grid item xs={12} sm={6} md={11}>
                                <Typography className="content-date" variant="title">
                                    {D.format(shoplist.datetime, "dddd, Do MMMM")}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={1} align="right">
                                <Button variant="contained" size="medium" color="primary" type="button"
                                    className="remove-list-action"
                                    onClick={() => this.props.onRemoveShoppingList(shoplist.datetime)}>
                                    <FaTrash/>
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                    
                    <ul className="content-items">
                        {shoppingitems}
                        {summaryItem}
                    </ul>
                </div>
            )
        }) :
        <div className="content-notice">
            <Typography component="span">
                No shopping lists are present at this time.
            </Typography>
        </div>;

        return (
            <React.Fragment>
                <Card className="shopping-list">
                    <Typography className="shopping-title" variant="display1" 
                        gutterBottom={true}>
                        Shopping Lists
                    </Typography>
                    {shoppinglists}
                    <div className="content-add-section">
                        <Button className="action-add" variant="contained"
                            size="large" color="primary" type="button" 
                            onClick={this.toggleShowModal}>
                            Add...
                        </Button>
                    </div>
                </Card>
                <ShoppingListDialog
                    show={this.state.showModal}
                    onClose={this.toggleShowModal}
                    products={this.props.products}
                    shoppingLists={this.props.shoppingLists}
                    addList={this.props.onAddShoppingList}
                    addListItem={this.props.onAddShoppingListItem}
                />
            </React.Fragment>
        );
    }
}
ShoppingList.propTypes = {
    mealplans: PropTypes.array.isRequired,
    recipes: PropTypes.array.isRequired,
    products: PropTypes.array.isRequired,
    shoppingLists: PropTypes.array.isRequired,
    onAddShoppingList: PropTypes.func.isRequired,
    onRemoveShoppingList: PropTypes.func.isRequired,
    onAddShoppingListItem: PropTypes.func.isRequired,
    onRemoveShoppingListItem: PropTypes.func.isRequired,
}


const mapStateToProps = state => {
	return {
        mealplans: state.mealplans,
        recipes: state.recipes,
        products: state.products,
        shoppingLists: state.shoppinglists
    }
}

const mapDispatchToProps = dispatch => {
	return {
		onAddShoppingList(datetime, recurring, frequencyType, frequencyRate) {
			dispatch(
				addShoppingDay(datetime, recurring, frequencyType, frequencyRate)
			);
        },
        onRemoveShoppingList(datetime) {
            dispatch(
                removeShoppingDay(datetime)
            );
        },
        onAddShoppingListItem(datetime, item) {
            dispatch(
                addShoppingItem(datetime, item)
            );
        },
        onRemoveShoppingListItem(datetime, id) {
            dispatch(
                removeShoppingItem(datetime, id)
            );
        }
	}
}

export {ShoppingList};

const ConnectedShoppingList = connect(mapStateToProps, mapDispatchToProps)(ShoppingList);
export default withRouter(ConnectedShoppingList);