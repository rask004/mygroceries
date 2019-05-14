import * as actions from './actions';
import actiontypes from './constants';
import frequencyTypes from './frequencyConstants';


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
        const datetime = "2020-06-12T12:30";
        const recipeId = 1;
        const expectedAction = {
            type: actiontypes.ADD_MEAL,
            payload: {datetime, recipeId},
        }
        expect(actions.addPlannedMeal(datetime, recipeId)).toEqual(expectedAction);
    });

    test('remove meal plan' , () => {
        const datetime = "2020-06-12T12:30";
        const expectedAction = {
            type: actiontypes.REMOVE_MEAL,
            payload: datetime,
        }
        expect(actions.removePlannedMeal(datetime)).toEqual(expectedAction);
    });
});

describe('Test Action Creators: Shopping Lists', () => {
    test('add shopping day' , () => {
        const datetime = "2020-06-12";
        const recurring = true;
        const frequencyType = frequencyTypes.MONTHLY;
        const frequencyRate = 2;
        const expectedAction = {
            type: actiontypes.ADD_SHOPPING_DAY,
            payload: {datetime, recurring, frequency: {type: frequencyType, rate: frequencyRate} },
        }
        expect(actions.addShoppingDay(datetime, recurring, frequencyType, frequencyRate))
            .toEqual(expectedAction);

        const expectedActionDefaultRate = {
            type: actiontypes.ADD_SHOPPING_DAY,
            payload: {datetime, recurring, frequency: {type: frequencyType, rate: 1} },
        }
        expect(actions.addShoppingDay(datetime, recurring, frequencyType))
            .toEqual(expectedActionDefaultRate);

        const expectedActionDefaultFreq = {
            type: actiontypes.ADD_SHOPPING_DAY,
            payload: {datetime, recurring, frequency: {type: frequencyTypes.WEEKLY, rate: 1} },
        }
        expect(actions.addShoppingDay(datetime, recurring))
            .toEqual(expectedActionDefaultFreq);

        const expectedActionOneOff = {
            type: actiontypes.ADD_SHOPPING_DAY,
            payload: {datetime, recurring: false, frequency: {type: frequencyTypes.WEEKLY, rate: 1}},
        }
        expect(actions.addShoppingDay(datetime, false))
            .toEqual(expectedActionOneOff);
    });

    test('remove shopping day' , () => {
        const datetime = "2020-06-12";
        const expectedAction = {
            type: actiontypes.REMOVE_SHOPPING_DAY,
            payload: datetime,
        }
        expect(actions.removeShoppingDay(datetime))
            .toEqual(expectedAction);
    });

    test('add shopping item' , () => {
        const datetime = "2020-06-12";
        const item = {
            id: 1,
            quantity: 100,
            unit: "grams",
        }
        const expectedAction = {
            type: actiontypes.ADD_SHOPPING_ITEM,
            payload: {datetime, item},
        }
        expect(actions.addShoppingItem(datetime, item))
            .toEqual(expectedAction);
    });

    test('remove shopping item' , () => {
        const datetime = "2020-06-12";
        const id = 1;
        const expectedAction = {
            type: actiontypes.REMOVE_SHOPPING_ITEM,
            payload: {datetime, id},
        }
        expect(actions.removeShoppingItem(datetime, id))
            .toEqual(expectedAction);
    });
});
