import React from 'react';
import {create} from 'react-test-renderer';

import {RecipeMaster} from './RecipeMaster';

import sampleData from '../../data/initialState.json';


const recipes = sampleData.recipes;

// constant component for first testsuite.
const master = create(<RecipeMaster
        recipes={recipes}
        onAddRecipe={jest.fn()}
        onRemoveRecipe={jest.fn()}
    />);


describe('InstructionsList Component render tests', () => {

    test('renders correctly', () => {
        expect(master.toJSON()).toMatchSnapshot();
    });


});
