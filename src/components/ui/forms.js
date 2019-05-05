import React, { Component } from 'react';
import {FaPencilAlt, FaSave, FaRegTimesCircle} from 'react-icons/fa';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import 'typeface-roboto';


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
                    <Grid container component="div" 
                        className={this.props.className}>
                        <Grid item xs={12} md={3} component="span" className="detail-content-title">
                        {this.props.text}
                        </Grid>
                        <Grid item xs={12} md={1} component="span">
                        <Button 
                            color="primary" size="medium" variant="contained"
                            type="button" onClick={this.toggleEditing}
                            className="action-toggle">
                            <FaPencilAlt/>
                        </Button>
                        </Grid>
                    </Grid> :
                    <form onSubmit={this.onSubmit}>
                        <Grid container component="div" 
                            className={this.props.className}>
                            <Grid item xs={12} md={3} component="span">
                                <Input value={this.state.text} onChange={this.onChange} 
                                    required name="text"
                                    placeholder={this.props.placeholder} />
                            </Grid>
                            <Grid item xs={12} md={1} component="span">
                                <Button 
                                    color="primary" size="medium" variant="contained"
                                    type="submit" className="action-save">
                                    <FaSave/>
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={1} component="span">
                                <Button 
                                    color="primary" size="medium" variant="contained"
                                    type="button" onClick={this.toggleEditing}
                                    className="action-cancel">
                                    <FaRegTimesCircle/>
                                </Button>
                            </Grid>
                        </Grid>
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
    placeholder: PropTypes.string,
}

EditableTextItem.defaultProps = {
    className: "",
    placeholder: "",
}


export {EditableTextItem};

