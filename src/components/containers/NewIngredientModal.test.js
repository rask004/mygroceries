import React from 'react';
import {create} from 'react-test-renderer';
import {render} from 'react-testing-library';

import {NewIngredientModal} from './NewIngredientModal';

import sampleData from '../../data/initialState.json';


//jest.mock('@material-ui/core/Dialog');


const products = sampleData.products;

const modal = <NewIngredientModal 
        products={products}
        show={true}
        onClose={jest.fn()}
        onAddIngredient={jest.fn()}
    />


describe('NewIngredientModal Component render tests', () => {

    test('renders correctly', () => {
        const component = create(modal);
        expect(component.toJSON()).toMatchSnapshot();
    });
});


describe('NewIngredientModal Component behaviour tests', () => {

    test('modal UI changes', () => {

        const component = create(modal).root;
        const nameField = component.findByProps({name:"name"})



        // check with different values inserted

        // check how state of relevant inputs changes

        // check warning message at bottom
        
        // incomplete
        expect("incomplete").not.toBeTruthy();
    });



    test('save button click', () => {

        // click button, check no save call

        // put valid values in inputs one by one, each time clicking button, checking no save call.

        // put final valid value in, check click makes correct call.
        
        // incomplete
        expect("incomplete").not.toBeTruthy();
    });

    test('cancel button click', () => {

        // 
        
        // incomplete
        expect("incomplete").not.toBeTruthy();
    });
});
