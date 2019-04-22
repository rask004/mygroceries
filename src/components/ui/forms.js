import React, { Component } from 'react';
import {FaPlusSquare, FaPencilAlt, FaSave, FaRegTimesCircle} from 'react-icons/fa';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import 'typeface-roboto';


class AddForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.addItem} 
                    className={ this.props.className ? this.props.className : "" }>
                <Button color="primary" size="medium" variant="contained" type="submit">
                    <FaPlusSquare/>
                </Button>
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
                        {this.props.text}
                        <Button 
                            color="primary" size="medium" variant="contained"
                            type="button" 
                            onClick={this.toggleEditing}>
                            <FaPencilAlt/>
                        </Button>
                    </div> :
                    <form 
                        className={ this.props.className ? this.props.className : "" }
                        onSubmit={this.onSubmit}>
                        <Input value={this.state.text} onChange={this.onChange} 
                            required name="text"
                            placeholder={this.props.placeholder ? this.props.placeholder : null} />
                        <Button 
                            color="primary" size="medium" variant="contained"
                            type="submit"><FaSave/></Button>
                        <Button 
                            color="primary" size="medium" variant="contained"
                            type="button" 
                            onClick={this.toggleEditing}>
                            <FaRegTimesCircle/>
                        </Button>
                    </form>
                }
            </React.Fragment>
        );
    }
}

EditableTextItem.propTypes = {
    className: PropTypes.string,
    updateText: PropTypes.func.isRequired,
    text: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]).isRequired
}


export {AddForm, EditableTextItem};

