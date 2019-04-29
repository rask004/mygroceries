import React from 'react';
import {create} from 'react-test-renderer';

import IngredientsList from './RecipeIngredients';


describe('RecipeIngredients Component render tests', () => {

    const ingredients = [
        {
            id: 1,
            name: "apple",
            coo: "new zealand",
            quantity: 2,
            unit: "each",
        },
        {
            id: 2,
            name: "orange",
            coo: "australia",
            quantity: 3,
            unit: "each",
        },
    ];
    
    const component = create(<IngredientsList
            ingredients={ingredients}
            addIngredient={jest.fn()}
            removeIngredient={jest.fn()}
    />);

    test('renders correctly', () => {
        expect(component.toJSON()).toMatchSnapshot();
    });

    test('renders the given ingredients', () => {
        const rootInstance = component.root;
        const listitems = rootInstance.findAllByType("li");
        for (let i = 0; i < ingredients.length; i++) {
            const item = listitems[i];
            const contents = item.findAllByProps({className: "detail-content"});
            // actually 2 child rendered components per each declared component.
            // declared component, and clone with 'classes'
            // we only need the declared component
            expect(contents[0].props.children).toBe(ingredients[i].name);
            expect(contents[2].props.children).toBe(ingredients[i].coo);
            expect(contents[4].props.children).toBe(ingredients[i].quantity);
            expect(contents[6].props.children).toBe(ingredients[i].unit);
        }
    });
});


describe('RecipeIngredients Component behaviour tests', () => {

    const ingredients = [
        {
            id: 1,
            name: "apple",
            coo: "new zealand",
            quantity: 2,
            unit: "each",
        },
        {
            id: 2,
            name: "orange",
            coo: "australia",
            quantity: 3,
            unit: "each",
        },
    ];

    const component = create(<IngredientsList
        ingredients={ingredients}
        addIngredient={jest.fn()}
        removeIngredient={jest.fn()}
    />);

    test('add button click calls addIngredient', () => {
        const rootInstance = component.root;

        const addButton = rootInstance.findByProps({className: "action-add"});
        addButton.props.onClick();
        expect(rootInstance.props.addIngredient).toBeCalled();
    });

    test('remove button click calls removeIngredient', () => {
        const idIngredientRemove = ingredients[0].id;

        const rootInstance = component.root;
        const listitem = rootInstance.findAllByType("li")[0];
        const removeButton = listitem.findByProps({className: "action-remove"});
        removeButton.props.onClick();

        expect(rootInstance.props.removeIngredient).toBeCalledWith(idIngredientRemove);
    });
});
