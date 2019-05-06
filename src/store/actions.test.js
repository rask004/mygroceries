import moment from 'moment';

import * as actions from './actions';
import actiontypes from './constants';


describe('Test Action Creators: Products', () => {
    test('add product' , () => {
        const product = {
            id: 1,
            name: "test product",
            brand: "test brand",
            category: "foodstuffs",
            subcategory: "pickle ricks",
            country: "wouldn't you like to know",
            defaultUnit: "each",
        }
        const expectedAction = {
            type: actiontypes.ADD_PRODUCT,
            payload: product,
        }
        expect(actions.addProduct(product)).toEqual(expectedAction);
    });

    test('remove product' , () => {
        const id = 1;
        const expectedAction = {
            type: actiontypes.REMOVE_PRODUCT,
            payload: id,
        }
        expect(actions.removeProduct(id)).toEqual(expectedAction);
    });
});

describe('Test Action Creators: Recipes', () => {
    test('add recipe' , () => {
        const id = 2;
        const title = "new recipe";
        const expectedAction = {
            type: actiontypes.ADD_RECIPE,
            payload: {
                id: id,
                title: title,
                ingredients: [],
                instructions: [],
            },
        }
        expect(actions.addRecipe(id, title)).toEqual(expectedAction);
    });

    test('remove recipe' , () => {
        const id = 1;
        const expectedAction = {
            type: actiontypes.REMOVE_RECIPE,
            payload: id,
        }
        expect(actions.removeRecipe(id)).toEqual(expectedAction);
    });

    test('update recipe' , () => {
        const recipe = {
            id: 3,
            title: "test recipe",
            instructions: [
                "cut the oranges and bananas",
                "make a salad",
            ],
            ingredients: [
                {id: 3, quantity: 5, unit: "each"},
                {id: 4, quantity: 4, unit: "each"},
            ]
        }

        const expectedAction = {
            type: actiontypes.UPDATE_RECIPE,
            payload: recipe,
        }
        expect(actions.updateRecipe(recipe)).toEqual(expectedAction);
    });
});

describe('Test Action Creators: Meal Plans', () => {
    test('add meal plan' , () => {
        const datetime = moment("2020-06-12 12:30:30+12:00");
        const recipeId = 1;
        const expectedAction = {
            type: actiontypes.ADD_MEAL,
            payload: {datetime, recipeId},
        }
        expect(actions.addPlannedMeal(datetime, recipeId)).toEqual(expectedAction);
    });

    test('remove meal plan' , () => {
        const datetime = moment("2020-06-12 12:30:30+12:00");
        const expectedAction = {
            type: actiontypes.REMOVE_MEAL,
            payload: datetime,
        }
        expect(actions.removePlannedMeal(datetime)).toEqual(expectedAction);
    });
});
