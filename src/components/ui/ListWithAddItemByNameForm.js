import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {FaPlusSquare} from 'react-icons/fa';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import {ListWithAddForm} from './lists';


class ListWithAddItemByNameForm extends Component {
    state = {
        newItemName: "",
    }

    onSubmit = (event) => {
        event.preventDefault();
        const name = this.state.newItemName;
        this.props.addItem(name);
        this.setState({newItemName: ""});
    }

    onChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({[name]: value});
    }

    render() {
        const {
            orderedList,
            title,
            classFormName,
            placeholder
        } = this.props;
        const formChildren = (
            <form onSubmit={this.onSubmit} className={classFormName}>
                <Button color="primary" size="medium" variant="contained" type="submit"
                    className="action-add">
                    <FaPlusSquare />
                </Button>
                <Input name="newItemName" required
                    placeholder={placeholder}
                    value={this.state.newItemName} 
                    onChange={this.onChange}
                    className="input-new-instruction" />
            </form> 
        );

        const listProps = {orderedList, title, formChildren};

        return (
            <ListWithAddForm {...listProps}>
                {this.props.children}
            </ListWithAddForm>
        );
    }
}
ListWithAddItemByNameForm.propTypes = {
    orderedlist: PropTypes.bool.isRequired,
    addItem: PropTypes.func.isRequired,
    classFormName: PropTypes.string,
    placeholder: PropTypes.string,
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
}
ListWithAddItemByNameForm.defaultProps = {
    classFormName: null,
    placeholder: "Add Item...",
    title: "",
}


export default ListWithAddItemByNameForm;