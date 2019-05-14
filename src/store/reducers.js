import C from './constants';
import { combineReducers } from 'redux';


export const recipes = (state=[], action) => {
    switch(action.type) {
        case C.ADD_RECIPE:
            const hasRecipeAlready = state.some(recipe => recipe.id === action.payload.id);
            return (hasRecipeAlready) ?
            state :
            [
                ...state, 
                action.payload,
            ];

        case C.REMOVE_RECIPE:
            return state.filter(recipe => recipe.id !== action.payload);

        case C.UPDATE_RECIPE:
            const hasRecipe = state.some(recipe => recipe.id === action.payload.id);
            if (!hasRecipe) 
            {
                return(state);
            }
            const recipes = state.slice().filter(recipe => recipe.id !== action.payload.id);
            recipes.push(action.payload);
            return(recipes);

        default:
            return state;
    }
}


export const products = (state=[], action) => {
    switch(action.type) {
        case C.ADD_PRODUCT:
            const hasIngredientAlready = state.some(ingredient => ingredient.id === action.payload.id);
            return (hasIngredientAlready) ?
            state :
            [
                ...state, 
                action.payload,
            ];
        case C.REMOVE_PRODUCT:
            return state.filter(ingredient => ingredient.id !== action.payload);
        default:
            return state;
    };
}

export const mealplans = (state=[], action) => {
    // enact sorting when adding meals.
    switch(action.type) {
        case C.ADD_MEAL:
            const dateTimeUsedAlready = state.some(item => item.datetime === action.payload.datetime);
            return dateTimeUsedAlready ?
            state :
            [
                ...state,
                action.payload,
            ]
        case C.REMOVE_MEAL:
            return state.filter(item => item.datetime !== action.payload);
        default:
            return state;
    };
}

export const shoppinglists = (state=[], action) => {
    const listforDateTimeExists = state.some(item => item.datetime === action.payload.datetime);
    switch(action.type) {
        case C.ADD_SHOPPING_DAY:
            if (listforDateTimeExists) {
                return state;
            } else {
                const newList = action.payload;
                newList.items = [];
                const newState =  [
                    ...state,
                    newList
                ];
                return newState;
            }

        case C.REMOVE_SHOPPING_DAY:
            return state.filter(item => item.datetime !== action.payload);

        case C.ADD_SHOPPING_ITEM:
            if (!listforDateTimeExists) {
                return state;
            } else {
                const shoppingList = state.find(item => item.datetime === action.payload.datetime);
                const newState = state.filter(item => item.datetime !== action.payload.datetime);
                shoppingList.items.push(action.payload.item);
                // enact sorting of shopping lists by date.
                return [
                    ...newState,
                    shoppingList
                ]
                
            }

        case C.REMOVE_SHOPPING_ITEM:
            if (!listforDateTimeExists) {
                return state;
            } else {
                const shoppingList = state.find(item => item.datetime === action.payload.datetime);
                shoppingList.items = shoppingList.items.filter(item => item.id !== action.payload.id)
                const newState = state.filter(item => item.datetime !== action.payload.datetime);
                newState.push(shoppingList);
                // enact sorting of shopping lists by date.
                return newState;
            }

        default:
            return state;
    }
}


export default combineReducers({
    products,
    recipes,
    mealplans,
    shoppinglists
});