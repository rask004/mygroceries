import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {ListWithAddForm} from '../ui/lists';
import {FaPencilAlt, FaTrash, FaSave, FaRegTimesCircle} from 'react-icons/fa';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';


const defaultInstructionsState = {
    editingInstruction: -1,
    editedInstructionText: "",
}


class InstructionsSection extends Component {
    constructor(props) {
        super(props);

        this.state = defaultInstructionsState;

        this.onChange = this.onChange.bind(this);
        this.handleSaveEditedInstruction = this.handleSaveEditedInstruction.bind(this);
        this.handleCancelEditingInstruction = this.handleCancelEditingInstruction.bind(this);
        this.handleToggleEditingInstruction = this.handleToggleEditingInstruction.bind(this);
    }

    onChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({[name] : value});
    }

    handleSaveEditedInstruction (event, index) {
        event.preventDefault();
        const text = this.state.editedInstructionText;
        this.props.saveInstruction(index, text);
        this.setState(defaultInstructionsState);
    }

    handleCancelEditingInstruction() {
        this.setState(defaultInstructionsState);
    }

    handleToggleEditingInstruction(index) {
        this.setState({
            editingInstruction: index,
            editedInstructionText: this.props.instructions[index],
        });
    }

    render() {
        const instructions = this.props.instructions.map((item, step) => { 
            return (
                    <li key={step}>
                        <Typography component="span">
                        {
                            this.state.editingInstruction === step ?
                            <form onSubmit={(e) => this.handleSaveEditedInstruction(e, step)}>
                            <Grid container component="div" direction="row">
                                <Grid item component="span" xs={12} sm={12} md={9} lg={10}>
                                <Input value={this.state.editedInstructionText} onChange={this.onChange}
                                    fullWidth={true}
                                    name="editedInstructionText" required placeholder="There must be an instruction here." 
                                    className="input-existing-instruction"/>
                                </Grid>
                                <Grid item component="span" xs={12}  sm={6} md={2} lg={1}>
                                <Button type="submit" color="primary" size="medium" variant="contained"
                                    className="action-save">
                                    <FaSave/>
                                </Button>
                                </Grid>
                                <Grid item component="span" xs={12}  sm={6} md={1} lg={1}>
                                <Button type="button" color="primary" size="medium" variant="contained"
                                    className="action-cancel"
                                    onClick={this.handleCancelEditingInstruction}>
                                    <FaRegTimesCircle/>
                                </Button>
                                </Grid>
                            </Grid>
                            </form> :
                            <Grid container component="div" direction="row">
                                <Grid item component="span" xs={12} sm={12} md={9} lg={10} 
                                    className="detail-content">
                                    {item}
                                </Grid>
                                <Grid item component="span" xs={12}  sm={6} md={2} lg={1}>
                                    <Button type="button" color="primary" size="medium" variant="contained"
                                        className="action-toggle"
                                        onClick={() => this.handleToggleEditingInstruction(step)}><FaPencilAlt/></Button>
                                </Grid>
                                <Grid item component="span" xs={12}  sm={6} md={1} lg={1}>
                                    <Button type="button" color="primary" size="medium" variant="contained"
                                        className="action-remove"
                                        onClick={() => this.props.removeInstruction(step)}><FaTrash/></Button>
                                </Grid>
                            </Grid>
                        }
                        </Typography>
                    </li>
            )
        });

        const title = <Typography className="detail-subtitle" variant="title" gutterBottom={true}>Instructions</Typography>;
        const element = <ListWithAddForm orderedlist={true}
                    classFormName="instruction-add"
                    placeholder="New instruction..."
                    title={title}
                    addItem={this.props.addInstruction}
                >
                    {instructions}
                </ListWithAddForm>

        return (
            <div className="detail-instructions">
                {element}
            </div>
        );
    }
}

InstructionsSection.propTypes = {
    addInstruction: PropTypes.func.isRequired,
    saveInstruction: PropTypes.func.isRequired,
    removeInstruction: PropTypes.func.isRequired,
    instructions: PropTypes.array.isRequired,
}



export default InstructionsSection;