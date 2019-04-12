import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {OrderedList, OrderedListAddButton} from '../ui/lists';
import {AddForm, EditableTextItem} from '../ui/forms';
import {FaPencilAlt, FaTrash, FaSave, FaRegTimesCircle} from 'react-icons/fa';


class InstructionsSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newInstruction: "",
            editingInstruction: -1,
            editedInstructionText: "",
        }

        this.onChange = this.onChange.bind(this);
        this.newInstruction = this.newInstruction.bind(this);
        this.handleSaveEditedInstruction = this.handleSaveEditedInstruction.bind(this);
        this.handleCancelEditingInstruction = this.handleCancelEditingInstruction.bind(this);
        this.handleToggleEditingInstruction = this.handleToggleEditingInstruction.bind(this);
    }

    newInstruction(event) {
        event.preventDefault();
        const instruction = this.state.newInstruction;
        this.props.addInstruction(instruction);
        this.setState({newInstruction: ""});
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
        this.setState({
            editingInstruction: -1,
            editedInstructionText: "",
        });
    }

    handleCancelEditingInstruction() {
        this.setState({editingInstruction: -1});
    }

    handleToggleEditingInstruction(index) {
        this.setState({
            editingInstruction: index,
            editedInstructionText: this.props.recipe.instructions[index],
        });
    }

    render() {
        const instructions = this.props.instructions.map((item, step) => { 
            return (
                <li key={step}>
                    {
                        this.state.editingInstruction === step ?
                        <form className="detail-instruction" onSubmit={(e) => this.handleSaveEditedInstruction(e, step)}>
                            <input value={this.state.editedInstructionText} onChange={this.onChange}
                                name="editedInstructionText" required placeholder="There must be an instruction here." />
                            <button type="submit"
                                ><FaSave/></button>
                            <button type="button" 
                                onClick={this.handleCancelEditingInstruction}><FaRegTimesCircle/></button>
                        </form> :
                        <div className="detail-instruction">
                            <div className="content">{item}</div>
                            <button type="button" onClick={() => this.handleToggleEditingInstruction(step)}><FaPencilAlt/></button>
                            <button type="button" onClick={() => this.props.removeInstruction(step)}><FaTrash/></button>
                        </div>
                    }
                </li>
            )
        });

        return (
            <div className="detail-instructions">
                <OrderedList 
                    title="Instructions"
                >
                    {instructions}
                </OrderedList>
                <AddForm addItem={this.newInstruction}
                    className={this.props.classNameAddform}>
                    <input name="newInstruction" required
                        value={this.state.newInstruction} 
                        onChange={this.onChange}
                        placeholder="new instruction..." />
                </AddForm>
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


class IngredientsSection extends Component {
    render() {
        const ingredients = this.props.ingredients.map((item, step) => { 
            return (
                <li key={item.id}>
                    <div className="content">{item.name}</div>
                    <div className="amount">{item.quantity}</div>
                    <div className="unit">{item.unit}</div>
                    <button type="button" 
                        onClick={() => this.props.removeIngredient(item.id)}>
                      <FaTrash/>
                    </button>
                </li>
            )
        });

        return (
            <OrderedListAddButton
                className="detail-ingredients"
                title="Ingredients"
                onClick={this.props.addIngredient}
                buttonTitle="Add Ingredient..."
            >
                {ingredients}
            </OrderedListAddButton>
        );
    }
}

IngredientsSection.propTypes = {
    addIngredient: PropTypes.func.isRequired,
    removeIngredient: PropTypes.func.isRequired,
    ingredients: PropTypes.array.isRequired,
}


class TitleSection extends Component {
    render() {
        return (
            <EditableTextItem 
                className="detail-title"
                updateText={this.props.updateTitle}
                text={this.props.title}
                placeholder="Recipe Title"
            />
        );
    }
}


export {InstructionsSection, IngredientsSection, TitleSection};


