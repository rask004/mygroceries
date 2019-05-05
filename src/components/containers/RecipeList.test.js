import React from 'react';
import {create} from 'react-test-renderer';

import RecipeList from './RecipeList';

import sampleData from '../../data/initialState.json';


const recipes = sampleData.recipes;
const id = recipes[0].id;

// constant component for first testsuite.
const recipeList = create(<RecipeList
        currentRecipeId={id}
        recipes={recipes}
        onAddRecipe={jest.fn()}
        onSelectRecipe={jest.fn()}
        onRemoveRecipe={jest.fn()}
    />);


describe('InstructionsList Component render tests', () => {

    test('renders correctly', () => {
        expect(recipeList.toJSON()).toMatchSnapshot();
    });

    test('InstructionsList renders the listed instructions', () => {
        const rootInstance = recipeList.root;
        const listitems = rootInstance.findAllByType("li");
        for (let i = 0; i < listitems.length; i++) {
            const title = recipes[i].title;
            const selectButton = listitems[i].findByProps({className:"action-select"});
            expect(selectButton.props.children).toBe(title);
        }
    });
});


describe('InstructionsList Component behaviour tests', () => {

    test('add button click calls onAddRecipe', () => {
        const newRecipeTitle = "test recipe";
        const id = 4;
        const component = recipeList.root;
        const addForm = component.findByProps({className:"recipe-add"});
        const titleField = addForm.findByProps({name: "newItemName"});

        const mockChangeEvent = {
            target: {
                name:  "newItemName",
                value: newRecipeTitle
            }
        };
        titleField.props.onChange(mockChangeEvent);
        addForm.props.onSubmit({preventDefault: () => {}});

        expect(component.props.onAddRecipe).toHaveBeenCalledWith(id, newRecipeTitle);
    });

    test('title button click calls onSelectRecipe', () => {
        const selectedId = recipes[1].id;
        const component = recipeList.root;
        const listitem = component.findAllByType("li")[1];
        const selectButton = listitem.findByProps({className:"action-select"});
        selectButton.props.onClick();
        expect(component.props.onSelectRecipe).toHaveBeenCalledWith(selectedId);
    });

    test('remove button click calls onRemoveRecipe', () => {
        const component = recipeList.root;
        const listitem = component.findAllByType("li")[0];
        const id = recipes[0].id;
        const removeButton = listitem.findByProps({className:"action-remove"});
        removeButton.props.onClick();

        expect(component.props.onRemoveRecipe).toHaveBeenCalledWith(id);
    });
});
