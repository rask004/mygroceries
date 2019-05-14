import React, { Component } from 'react';
import {FaPencilAlt, FaSave, FaRegTimesCircle} from 'react-icons/fa';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import 'typeface-roboto';


class EditableTextItem extends Component {
    state = {
        isEditing: false,
        text: this.props.text,
    };

    toggleEditing = () => {
        this.setState( (prevState) =>
            {
                return {
                    isEditing: !prevState.isEditing,
                    text: this.props.text,
                }
            }
        );
    }

    onSubmit = (event) => {
        event.preventDefault();
        const text = this.state.text;
        this.props.updateText(text);
        this.setState( (prevState) =>
            {
                return {isEditing: !prevState.isEditing};
            }
        );
    }

    onChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value})
    }

    render() {
        const {
            variant,
            text,
            placeholder
        } = this.props;
        return (
            <React.Fragment>
                {
                    !this.state.isEditing ?
                    <Grid container component="div" 
                        className={variant}>
                        <Grid item xs={12} md={3} component="span" className="detail-content-title">
                        {text}
                        </Grid>
                        <Grid item xs={12} md={1} component="span">
                        <Button 
                            color="primary" size="medium" variant="contained"
                            type="button" onClick={(e) => this.toggleEditing()}
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
                                    placeholder={placeholder} />
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
    variant: PropTypes.string,
    updateText: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
}

EditableTextItem.defaultProps = {
    variant: "",
    placeholder: "",
}





export {EditableTextItem};

