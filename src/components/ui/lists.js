import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {FaPlusSquare} from 'react-icons/fa';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Input from '@material-ui/core/Input';


class OrderedList extends Component {
    render() {
        return (
            <div className={ this.props.className ? this.props.className : "" }>
                {
                    this.props.title ?
                    <p>{this.props.title}</p> :
                    ""
                }
                <List component='ol'>
                    {this.props.children}
                </List>
            </div>
        );
    }
}


OrderedList.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
}


class OrderedListAddButton extends Component {
    render() {
        return (
            <div className={ this.props.className ? this.props.className : "" }>
                {
                    this.props.title ?
                    <p>{this.props.title}</p> :
                    ""
                }
                <List component='ol'>
                    {this.props.children}
                </List>
                <Button type="button" color="primary" size="medium" variant="contained" 
                    onClick={this.props.onClick}>
                    {this.props.buttonTitle}
                </Button>
            </div>
        );
    }
}

OrderedListAddButton.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    onClick: PropTypes.func.isRequired,
    buttonTitle: PropTypes.string.isRequired,
}


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
    title: null
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
                {
                    this.props.title ?
                    this.props.title :
                    ""
                }

                {listRendering}

                <form onSubmit={this.onSubmit} className={this.props.classFormName}>
                    <Button color="primary" size="medium" variant="contained" type="submit">
                        <FaPlusSquare />
                    </Button>
                    <Input name="newItemName" required
                        placeholder={this.props.placeholder}
                        value={this.state.newItemName} 
                        onChange={this.onChange}/>
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
}


export {OrderedList, OrderedListAddButton, ListWithAddForm, ListWithAddButton};