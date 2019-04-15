import React, { Component } from 'react';
import {FaPlusSquare, FaPencilAlt, FaSave, FaRegTimesCircle} from 'react-icons/fa';
import PropTypes from 'prop-types';


class AddForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.addItem} 
                    className={ this.props.className ? this.props.className : "" }>
                <button type="submit"><FaPlusSquare/></button>
                {this.props.children}
            </form>
        );
    }
}

AddForm.propTypes = {
    className: PropTypes.string,
    addItem: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
}


class EditableTextItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            text: props.text,
        };

        this.toggleEditing = this.toggleEditing.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    toggleEditing(event) {
        this.setState(
            {
                isEditing: !this.state.isEditing,
                text: this.props.text,
            }
        );
    }

    onSubmit(event) {
        event.preventDefault();
        const text = this.state.text;
        this.props.updateText(text);
        this.setState(
            {
                isEditing: !this.state.isEditing
            }
        );
    }

    onChange(event) {
        this.setState({text: event.target.value})
    }

    render() {
        return (
            <React.Fragment>
                {
                    !this.state.isEditing ?
                    <div className={ this.props.className ? this.props.className : "" }>
                        <div>{this.props.text}</div>
                        <button 
                            type="button" 
                            onClick={this.toggleEditing}>
                            <FaPencilAlt/>
                        </button>
                    </div> :
                    <form 
                        className={ this.props.className ? this.props.className : "" }
                        onSubmit={this.onSubmit}>
                        <input value={this.state.text} onChange={this.onChange} 
                            required name="text"
                            placeholder={this.props.placeholder ? this.props.placeholder : null} />
                        <button type="submit"><FaSave/></button>
                        <button 
                            type="button" 
                            onClick={this.toggleEditing}>
                            <FaRegTimesCircle/>
                        </button>
                    </form>
                }
            </React.Fragment>
        );
    }
}

EditableTextItem.propTypes = {
    className: PropTypes.string,
    updateText: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
}


export {AddForm, EditableTextItem};

