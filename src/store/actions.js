import C from './constants';
import frequencyTypes from './frequencyConstants'
import fetch from 'isomorphic-fetch';


export const addRecipe = (id, title) => (
    {
        type: C.ADD_RECIPE,
        payload: {
            id: id,
            title: title,
            ingredients: [],
            instructions: []
        }
    }
);


export const removeRecipe = (id) => (
    {
        type: C.REMOVE_RECIPE, 
        payload: id
    }
);


export const updateRecipe = (recipe) => (
    {
        type: C.UPDATE_RECIPE,
        payload: recipe
    }
);

export const addProduct = (product) => (
    {
        type: C.ADD_PRODUCT,
        payload: product
    }
);

export const removeProduct = (id) => (
    {
        type: C.REMOVE_PRODUCT,
        payload: id
    }
);

export const addPlannedMeal = (datetime, recipeId) => (
    {
        type: C.ADD_MEAL,
        payload: {datetime, recipeId},
    }
);

export const removePlannedMeal = (datetime) => (
    {
        type: C.REMOVE_MEAL,
        payload: datetime,
    }
);

export const addShoppingDay = (datetime, recurring, frequencyType=frequencyTypes.WEEKLY, frequencyRate=1) => (
    {
        type: C.ADD_SHOPPING_DAY,
        payload: {datetime, recurring, frequency: {type: frequencyType, rate: frequencyRate} }
    }
);

export const removeShoppingDay = (datetime) => (
    {
        type: C.REMOVE_SHOPPING_DAY,
        payload: datetime
    }
);

export const addShoppingItem = (datetime, item) => (
    {
        type: C.ADD_SHOPPING_ITEM,
        payload: {datetime, item}
    }
);

export const removeShoppingItem = (datetime, id) => (
    {
        type: C.REMOVE_SHOPPING_ITEM,
        payload: {datetime, id}
    }
);
