import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    ingredients: null, //null until they are fetched from firebase
    totalPrice: 6,
    error: false
};

const INGREDIENT_PRICES = { //Global constance
    salad:    0.4,
    cheese:   0.5,
    mushroom: 0.3,
    meat:     0.7
};

const reducer = (state = initialState, action) => {
    switch(action.type) { //here we don't need break because we are returning anyways
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
            const updatedIngredients = updateObject( state.ingredients, updatedIngredient );
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
            return updateObject(state, updatedState); // (passing state) only this line is not enough because it does not create deep clones of objects

        case actionTypes.REMOVE_INGREDIENT:
            const updatedIngredient_  = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
            const updatedIngredients_ = updateObject(...state.ingredients, updatedIngredient_);
            const updatedState_ = {
                ingredients: updatedIngredients_,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
            return updateObject(state, updatedState_); 
        case actionTypes.SET_INGREDIENTS:
            return updateObject(state, {
                ingredients: {
                    salad: action.ingredients.salad,
                    mushroom: action.ingredients.mushroom,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                totalPrice: 6,
                error: false
            });
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, { error: true });
        default:
            return state;
    }
};

export default reducer;