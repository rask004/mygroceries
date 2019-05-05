import C from './constants';
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
