import React from 'react';
import {create} from 'react-test-renderer';

import RecipeTitle from './RecipeTitle';



describe('RecipeTitle Component render tests', () => {
    
    const getComponent = (title) => (create(<RecipeTitle 
            title={title}
            updateTitle={jest.fn()}
        />));

    test('renders correctly', () => {
        expect(getComponent("title").toJSON()).toMatchSnapshot();
    });

    test('renders the given title', () => {
        const title = "Testing title";
        const rootInstance = getComponent(title).root;
        const content = rootInstance.findByProps({className:"detail-content-title"});
        expect(content.props.children).toBe(title);
    });
});


describe('RecipeTitle Component behaviour tests', () => {

    const component = create(<RecipeTitle 
        title="Testing title"
        updateTitle={jest.fn()}
    />);

    test('update button click calls updateTitle', () => {
        const rootComponent = component.root;

        const newTitle = "New Title";

        const toggleButton = rootComponent.findByProps({className:"action-toggle"});
        toggleButton.props.onClick();

        const titleField = rootComponent.findByProps({name: "text"});
        const onChangeEvent = {
            target: {
                name: "text",
                value: newTitle
            }
        }
        titleField.props.onChange(onChangeEvent);

        const titleForm = rootComponent.findByType("form")
        const onSubmitEvent = {
            preventDefault: () => {}
        }
        titleForm.props.onSubmit(onSubmitEvent);

        expect(rootComponent.props.updateTitle).toHaveBeenCalledWith(newTitle);
    });

    test('cancel button click reverts UI', () => {

        const rootComponent = component.root;

        const newTitle = "Cancelled Title";

        const toggleButton = rootComponent.findByProps({className:"action-toggle"});
        toggleButton.props.onClick();

        const titleField = rootComponent.findByProps({name: "text"});
        const onChangeEvent = {
            target: {
                name: "text",
                value: newTitle
            }
        }
        titleField.props.onChange(onChangeEvent);

        const cancelButton = rootComponent.findByProps({className:"action-cancel"});
        cancelButton.props.onClick();


        const content = rootComponent.findByProps({className:"detail-content-title"});
        expect(content.props.children).toBe("Testing title");
    });
});
