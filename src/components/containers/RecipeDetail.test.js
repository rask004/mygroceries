import React from 'react';
import {create} from 'react-test-renderer';

import {RecipeDetail} from './RecipeDetail';

import sampleData from '../../data/initialState.json';


const products = sampleData.products;
const recipes = sampleData.recipes;

const detail = <RecipeDetail 
        products={products}
        recipes={recipes}
        onUpdateRecipe={jest.fn()}
        onAddProduct={jest.fn()}
    />


describe('RecipeDetail Component render tests', () => {

    test('renders correctly', () => {
        const component = create(detail);
        expect(component.toJSON()).toMatchSnapshot();
    });
});
