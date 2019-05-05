import React from 'react';
import {create} from 'react-test-renderer';

import InstructionsList from './RecipeInstructions';


// static (constant) values for testing
const staticInstructions = [
    "Walk to the door.",
    "Open the door.",
    "Walk inside.",
    "Close the door.",
    "Smile.",
];
const staticRemoveInstruction = jest.fn();
const staticSaveInstruction = jest.fn();
const staticAddInstruction = jest.fn();
// constant component for first testsuite.
const staticComponent = create(<InstructionsList
            instructions={staticInstructions}
            addInstruction={staticAddInstruction}
            saveInstruction={staticSaveInstruction}
            removeInstruction={staticRemoveInstruction}
        />);


describe('InstructionsList Component render tests', () => {

    test('renders correctly', () => {
        expect(staticComponent.toJSON()).toMatchSnapshot();
    });

    test('InstructionsList renders the listed instructions', () => {
        const rootInstance = staticComponent.root;
        const listitems = rootInstance.findAllByType("li");
        for (let i = 0; i < listitems.length; i++) {
            const contentNode = listitems[i].findByProps({className: "detail-content"});
            expect(contentNode.props.children).toBe(staticInstructions[i]);
        }
    });
});


describe('InstructionsList Component behaviour tests', () => {

    test('save button click calls saveInstruction', () => {
        let instructions = [
            "Peel the Orange",
            "Eat the Orange",
        ];

        const component = create(<InstructionsList
            instructions={instructions}
            addInstruction={jest.fn()}
            saveInstruction={jest.fn()}
            removeInstruction={jest.fn()}
        />).root;

        const listitems = component.findAllByType("li");
        const toggleButton = listitems[listitems.length - 1].findByProps({className:"action-toggle"});
        toggleButton.props.onClick();

        const newListitems = component.findAllByType("li");
        const changeInstructionForm = newListitems[newListitems.length - 1].findByType("form");
        const changeInstructionField = newListitems[newListitems.length - 1].findByProps({name:"editedInstructionText"});
        expect(changeInstructionField.props.value).toBe(instructions[1]);
        
        const newInstruction = "Sit on the Orange";
        const onChangeEvent = {
            target: {
                name:  "editedInstructionText",
                value: newInstruction,
            }
        }
        changeInstructionField.props.onChange(onChangeEvent);
        const onSubmitEvent = {
            preventDefault: () => {},
        }
        changeInstructionForm.props.onSubmit(onSubmitEvent);
        expect(component.props.saveInstruction).toHaveBeenCalledWith(1, newInstruction);
    });

    test('cancel button click reverts UI', () => {
        let instructions = [
            "Peel the Orange",
            "Eat the Orange",
        ];

        const component = create(<InstructionsList
            instructions={instructions}
            addInstruction={jest.fn()}
            saveInstruction={jest.fn()}
            removeInstruction={jest.fn()}
        />).root;

        const listitem = component.findAllByType("li")[0];
        const content = listitem.findByProps({className:"detail-content"});
        expect(content.props.children).toBe(instructions[0]);
        const toggleButton = listitem.findByProps({className:"action-toggle"});
        toggleButton.props.onClick();

        const newListitem = component.findAllByType("li")[0];
        const changeInstructionField = newListitem.findByProps({name:"editedInstructionText"});
        const newInstruction = "Sit on the Orange";
        const onChangeEvent = {
            target: {
                name:  "editedInstructionText",
                value: newInstruction,
            }
        }
        changeInstructionField.props.onChange(onChangeEvent);
        const cancelButton = newListitem.findByProps({className: "action-cancel"});
        cancelButton.props.onClick();

        const finalListitem = component.findAllByType("li")[0];
        const finalContent = finalListitem.findByProps({className:"detail-content"});
        expect(finalContent.props.children).toBe(instructions[0]);
    });

    // test deleting
    test('remove button click calls removeInstruction', () => {
        let instructions = [
            "Peel the Orange",
            "Eat the Orange",
        ];

        const component = create(<InstructionsList
            instructions={instructions}
            addInstruction={jest.fn()}
            saveInstruction={jest.fn()}
            removeInstruction={jest.fn()}
        />).root;

        const index = 0;
        const listitem = component.findAllByType("li")[index];
        const removeButton = listitem.findByProps({className:"action-remove"});
        removeButton.props.onClick();

        expect(component.props.removeInstruction).toHaveBeenCalledWith(index);
    });

    // test adding
    test('submit new instruction calls addInstruction', () => {
        let instructions = [
            "Peel the Orange",
            "Eat the Orange",
        ];

        const addFunction = jest.fn()
        const component = create(<InstructionsList
            instructions={instructions}
            addInstruction={addFunction}
            saveInstruction={jest.fn()}
            removeInstruction={jest.fn()}
        />);

        const addForm = component.root.findByProps({className:"instruction-add"});
        const addField = addForm.findByProps({name: "newItemName"});

        const newInstruction = "Put the peels in the bin";
        const mockChangeEvent = {
            target: {
                name:  "newItemName",
                value: newInstruction
            }
        }
        const mockSubmitEvent = {
            preventDefault: () => {},
        }

        addField.props.onChange(mockChangeEvent);
        addForm.props.onSubmit(mockSubmitEvent);

        expect(addFunction).toHaveBeenLastCalledWith(newInstruction);
    });
});
