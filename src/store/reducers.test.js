import moment from 'moment';
import * as reducers from "./reducers";
import actiontypes from './constants';
import sampledata from '../data/initialState.json';


describe('Test Reducers, Product', () => {
    test('product reducer, add' , () => {
        const state = sampledata.products;
        const new_product = {
            id:25,
            name:"apple",
            coo:"Australia",
            brand:"Sunstroke LTD",
            category:"produce",
            subcategory:"fruit",
            defaultUnit:"each"
        };
        
        const add_action = {
            type: actiontypes.ADD_PRODUCT,
            payload: new_product,
        };

        const expected_state = [
            ...state, 
            new_product,
        ];

        expect(reducers.products(state, add_action)).toEqual(expected_state);

        const poor_add_action = {
            type: actiontypes.ADD_PRODUCT,
            payload: {
                id:2,
                name:"orange",
                coo:"New Zealand",
                brand:"Pure Orchards LTD",
                category:"produce",
                subcategory:"fruit",
                defaultUnit:"each"
            }
        };

        expect(reducers.products(state, poor_add_action)).toEqual(state);
    });

    test('product reducer, remove' , () => {
        const state = sampledata.products;
        const remove_action = {
            type: actiontypes.REMOVE_PRODUCT,
            payload: 2,
        };

        const expected_state = state.filter(x => x.id !== 2);

        expect(reducers.products(state, remove_action)).toEqual(expected_state);

        const poor_remove_action = {
            type: actiontypes.REMOVE_PRODUCT,
            payload: {
                id: -1,
            },
        };

        expect(reducers.products(state, poor_remove_action)).toEqual(state);
    });
});

describe('Test Reducers, Recipes', () => {
    test('add recipe' , () => {
        const state = sampledata.recipes;
        const recipe = {
            id: 7,
            title: "test recipe",
            ingredients: [],
            instructions: [],
        };
        const add_action = {
            type: actiontypes.ADD_RECIPE,
            payload: recipe,
        };
        const expected_state = [
            ...state,
            recipe,
        ];

        expect(reducers.recipes(state, add_action)).toEqual(expected_state);

        const existing_recipe = {
            id:2,
            title:"another test recipe",
            ingredients:[
               {
                  id:3,
                  quantity:2,
                  unit:"each"
               },
               {
                  id:4,
                  quantity:0.5,
                  unit:"litre"
               }
            ],
            instructions:[
               "pour milk into a container.",
               "slice and add the bananas."
            ]
         };

         const poor_add_action = {
            type: actiontypes.ADD_RECIPE,
            payload: existing_recipe,
        };

        expect(reducers.recipes(state, poor_add_action)).toEqual(state);
    });

    test('remove recipe' , () => {
        const id = 1;
        const state = sampledata.recipes;
        const remove_action = {
            type: actiontypes.REMOVE_RECIPE,
            payload: id,
        }
        const expected_state = state.filter(x => x.id !== id);

        expect(reducers.recipes(state, remove_action)).toEqual(expected_state);

        const poor_remove_action = {
            type: actiontypes.REMOVE_RECIPE,
            payload: -1,
        }
        expect(reducers.recipes(state, poor_remove_action)).toEqual(state);
    });


    test('update recipe' , () => {
        const state = sampledata.recipes;
        const recipe = {
            id:1,
            title:"test recipe",
            ingredients:[
               {
                  id:1,
                  quantity:2,
                  unit:"each"
               },
               {
                  id:2,
                  quantity:3,
                  unit:"each"
               },
               {
                  id:5,
                  quantity:10,
                  unit:"each"
               },
            ],
            instructions:[
               "eat the apples.",
               "eat the oranges.",
               "eat the pineapple slices",
            ]
         };
        const update_action = {
            type: actiontypes.UPDATE_RECIPE,
            payload: recipe,
        };

        // updates to recipes move the updated recipe to the end
        const expected_state = [
            ...(state.filter(x => x.id !== recipe.id)),
            recipe,
        ];

        expect(reducers.recipes(state, update_action)).toEqual(expected_state);

        const absent_recipe = {
            id:-1,
            title:"non existant recipe",
            ingredients:[
               {
                  id:1,
                  quantity:2,
                  unit:"each"
               },
            ],
            instructions:[
               "eat the apples.",
            ]
        };
        const poor_update_action = {
            type: actiontypes.UPDATE_RECIPE,
            payload: absent_recipe,
        };

        expect(reducers.recipes(state, poor_update_action)).toEqual(state);
    });
});

describe('Test Reducers: Meal Plans', () => {
    test('add meal plan' , () => {
        const state = [
            {
                datetime: moment("2017-06-12 12:30+12:00"),
                recipeId: 2,
            }, 
            {
                datetime: moment("2017-06-12 13:30+12:00"),
                recipeId: 5,
            }
        ];
        const planned_meal = {
            datetime: moment("2020-06-12 19:30:30+12:00"), 
            recipeId: 1
        }
        const add_action = {
            type: actiontypes.ADD_MEAL,
            payload: planned_meal,
        };
        const expectedState = [
            ...state,
            planned_meal,
        ];

        expect(reducers.mealplans(state, add_action)).toEqual(expectedState);

        const existing_meal = {
            datetime: moment("2017-06-12 13:30+12:00"), 
            recipeId: 3
        };
        const poor_add_action = {
            type: actiontypes.ADD_MEAL,
            payload: existing_meal,
        };

        expect(reducers.mealplans(state, poor_add_action)).toEqual(state);
    });

    test('remove meal plan' , () => {
        const state = [
            {
                datetime: moment("2017-06-12 12:30+12:00"),
                recipeId: 2,
            }, 
            {
                datetime: moment("2017-06-12 13:30+12:00"),
                recipeId: 5,
            }
        ];
        
        const datetime = moment("2017-06-12 12:30+12:00");
        const remove_action = {
            type: actiontypes.REMOVE_MEAL,
            payload: datetime,
        }
        const expectedState = [
            {
                datetime: moment("2017-06-12 13:30+12:00"),
                recipeId: 5,
            }
        ];
        
        expect(reducers.mealplans(state, remove_action)).toEqual(expectedState);

        const bad_datetime = moment("2029-06-12 12:30+12:00");
        const poor_remove_action = {
            type: actiontypes.REMOVE_MEAL,
            payload: bad_datetime,
        }

        expect(reducers.mealplans(state, poor_remove_action)).toEqual(state);
    });
});