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
            return state.filter(item => !item.datetime.isSame(action.payload));
        default:
            return state;
    };
}


export default combineReducers({
    products,
    recipes,
    mealplans,
});