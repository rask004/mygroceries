import React, { Component } from 'react';
import * as D from 'date-fns';
import frequencies from '../../store/frequencyConstants'
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from "@material-ui/core/TextField";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {FaPlus} from 'react-icons/fa'
import {assign, omit, uniq} from 'lodash';
import 'typeface-roboto';
import '../../css/shoppinglistmodal.css';


class ShoppingListPanel extends Component {
    state = {
        addingList: false,
        newList: {
            listDate: D.format(Date(), "YYYY-MM-DD"),
            recurring: false,
            freqRate: 1,
            freqType: frequencies.DAILY,
        },
        newItem: {
            date: this.props.shoppingLists.length > 0 ? this.props.shoppingLists[0].datetime : null,
            id: this.props.products.length > 0 ? this.props.products[0].id : null,
            quantity: 1,
            unit: "each"
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if(this.state.addingList) {
            const data = this.state.newList;
            // addList
            console.log("add new list...");
        } else {
            const data = this.state.newItem;
            // addItem
            console.log("add new item...");
        }

        this.props.onClose();
    }

    toggleAddingList = (e) => {
        const value = e.target.value;
        this.setState({addingList:value});
    }

    handleChangeList = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        const newList = this.state.newList;

        newList[name] = value;
        this.setState({newList:newList});
    }

    handleChangeItem = (e) => {
        const newItem = this.state.newItem;
        const {
            name,
            value
        } = e.target;

        newItem[name] = value;
        this.setState({newItem});
    }

    render() {
        const {
            products,
            shoppingLists,
            addList,
            addListItem
        } = this.props;

        const items = products.map(p => (
            { 
                id: p.id, 
                string: `${p.brand} ${p.name}, ${p.coo}`,
            }
        ));
        const datetimes = uniq(shoppingLists.map(s => s.datetime));

        const freqTypes = Object.keys(frequencies).map( (key, i) => (
            <MenuItem key={i} value={frequencies[key]}>{frequencies[key]}</MenuItem>
        ));

        return (
            <div className="add-shopping">
                <DialogContent>
                    <Grid container className="control-add-form">
                        <Grid item xs={12} md={4}>
                            <FormControl>
                                <Select
                                    className="select-add-form"
                                    onChange={this.toggleAddingList}
                                    value={this.state.addingList}
                                    name="addingList">
                                        <MenuItem value={true}>New List...</MenuItem>
                                        <MenuItem value={false}>New Item...</MenuItem>
                                </Select>
                                <FormHelperText>Which are you adding?</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={8} />
                    </Grid>
                    { this.state.addingList ?
                        <form className="add-shopping-form" 
                            onSubmit={this.handleSubmit}>
                            <Grid container>
                                <Grid item xs={12} md={2} className="input-content">
                                    -datetime-
                                </Grid>
                                <Grid item xs={12} md={3} className="input-content">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                            className="input-list-recurring"
                                            checked={this.state.newList.recurring}
                                            onChange={this.handleChangeList}
                                            name="recurring"
                                            value="recurring"
                                            color="primary"
                                            />
                                        }
                                        label="Recurring"
                                    />
                                </Grid>
                                <Grid item xs={12} md={2} className="input-content">
                                    <TextField onChange={this.handleChangeList}
                                        className="input-list-freq-rate"
                                        value={this.state.newList.freqRate}
                                        inputProps={{
                                            type: "number",
                                            min: 1,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={3} className="input-content">
                                    <Select
                                        className="input-list-freq-type"
                                        onChange={this.handleChangeList}
                                        value={this.state.newList.freqType}
                                        name="addingList">
                                            {freqTypes}
                                    </Select>
                                </Grid>
                                <Grid item xs={12} md={2} align="right">
                                    <Button className="action-add" variant="contained"
                                        size="medium" color="primary" type="submit">
                                        <FaPlus/>
                                    </Button>
                                </Grid>
                            </Grid>
                        </form> :
                        <form className="add-shopping-form" 
                            onSubmit={this.handleSubmit}>
                            <Grid container>
                                <Grid item xs={12} md={2} className="input-content">
                                    -select datetime-
                                </Grid>
                                <Grid item xs={12} md={3} className="input-content">
                                    -select item-
                                </Grid>
                                <Grid item xs={12} md={2} className="input-content">
                                    -quantity-
                                </Grid>
                                <Grid item xs={12} md={3} className="input-content">
                                    -select unit-
                                </Grid>
                                <Grid item xs={12} md={2} align="right">
                                    <Button className="action-add" variant="contained"
                                        size="medium" color="primary" type="submit">
                                        <FaPlus/>
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    }
                </DialogContent>
            </div>
        );
    }
}
ShoppingListPanel.propTypes = {
    products: PropTypes.array.isRequired,
    shoppingLists: PropTypes.array.isRequired,
    addList: PropTypes.func.isRequired,
    addListItem: PropTypes.func.isRequired
}

const ShoppingListDialog = (props) => {
    return (
        <Dialog open={props.show}
            onClose={props.onClose}
            maxWidth="md" fullWidth scroll="body">
            <ShoppingListPanel 
                products={props.products}
                shoppingLists={props.shoppingLists}
                addList={props.addList}
                addListItem={props.addListItem}
                onClose={props.onClose}
            />
        </Dialog>
    );
}
ShoppingListDialog.propTypes = {
    show: PropTypes.bool.isRequired,
    products: PropTypes.array.isRequired,
    shoppingLists: PropTypes.array.isRequired,
    addList: PropTypes.func.isRequired,
    addListItem: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
}


export {ShoppingListPanel};

export default ShoppingListDialog;
