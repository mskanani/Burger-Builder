import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        salad:    0,
        cheese:   0,
        mushroom: 0,
        meat:     0
    },
    totalPrice: 6,
};

const reducer = (state = initialState, action) => {
    switch(action.type) { //here we don't need break because we are returning anyways
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state, //only this line is not enough because it does not create deep clones of objects
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                }
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                }
            };
        default:
            return state;
    }
};

export default reducer;