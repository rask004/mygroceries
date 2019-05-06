import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {FaPlusSquare} from 'react-icons/fa';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Input from '@material-ui/core/Input';


class ListWithAddButton extends Component {
    render() {
        const listRendering =  this.props.orderedlist ?
                <List component='ol'>
                    {this.props.children}
                </List> :
                <List component='ul'>
                    {this.props.children}
                </List>;
        const title = this.props.title ?
                this.props.title :
                ""

        return (
            <div className={ this.props.className ? this.props.className : "" }>
                {title}
                {listRendering}
                <Button type="button" color="primary" size="medium" variant="contained" 
                    className="action-add"
                    onClick={this.props.onClick}>
                    {this.props.buttonContent}
                </Button>
            </div>
        );
    }
}

ListWithAddButton.propTypes = {
    orderedlist: PropTypes.bool.isRequired,
    className: PropTypes.string,
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]).isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    onClick: PropTypes.func.isRequired,
    buttonContent: PropTypes.string.isRequired,
}

ListWithAddButton.defaultProps = {
    className: null,
    title: null,
    orderedList: true
}


class ListWithAddForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newItemName: "",
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        const name = this.state.newItemName;
        this.props.addItem(name);
        this.setState({newItemName: ""});
    }

    onChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({[name]: value});
    }

    render() {
        let listRendering;
        listRendering =  this.props.orderedlist ?
                <List component='ol'>
                    {this.props.children}
                </List> :
                <List component='ul'>
                    {this.props.children}
                </List>;

        return (
            <React.Fragment>
                {this.props.title}

                {listRendering}

                <form onSubmit={this.onSubmit} className={this.props.classFormName}>
                    <Button color="primary" size="medium" variant="contained" type="submit"
                        className="action-add">
                        <FaPlusSquare />
                    </Button>
                    <Input name="newItemName" required
                        placeholder={this.props.placeholder}
                        value={this.state.newItemName} 
                        onChange={this.onChange}
                        className="input-new-instruction" />
                </form>
            </React.Fragment>
        );
    }
}

ListWithAddForm.propTypes = {
    orderedlist: PropTypes.bool.isRequired,
    addItem: PropTypes.func.isRequired,
    classFormName: PropTypes.string,
    placeholder: PropTypes.string,
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
}

ListWithAddForm.defaultProps = {
    classFormName: null,
    placeholder: "Add Item...",
    title: "",
}


export {ListWithAddForm, ListWithAddButton};