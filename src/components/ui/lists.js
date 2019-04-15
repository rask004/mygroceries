import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {FaPlusSquare} from 'react-icons/fa';


class OrderedList extends Component {
    render() {
        return (
            <div className={ this.props.className ? this.props.className : "" }>
                {
                    this.props.title ?
                    <p>{this.props.title}</p> :
                    ""
                }
                <ol>
                    {this.props.children}
                </ol>
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
                <ol>
                    {this.props.children}
                </ol>
                <button type="button" onClick={this.props.onClick}>{this.props.buttonTitle}</button>
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
                <ol>
                    {this.props.children}
                </ol> :
                <ul>
                    {this.props.children}
                </ul>;

        return (
            <React.Fragment>
                {
                    this.props.title ?
                    <p>{this.props.title}</p> :
                    ""
                }

                {listRendering}

                <form onSubmit={this.onSubmit}
                        className={this.props.classFormName}>
                    <div><button type="submit"><FaPlusSquare /></button></div>
                    <div>
                        <input name="newItemName" required 
                            placeholder={this.props.placeholder}
                            value={this.state.newItemName} 
                            onChange={this.onChange}/>
                    </div>
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
    title: PropTypes.string,
}

ListWithAddForm.defaultProps = {
    classFormName: null,
    placeholder: "Add Item...",
}


export {OrderedList, OrderedListAddButton, ListWithAddForm};