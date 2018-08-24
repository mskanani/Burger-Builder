import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
};

export const setIngredients = (ingredients) => { // will be use only internally
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }; 
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
};

export const initIngredients = () => {
    //return dispatch => {}; return a function that recieves dispatch as a fucntion, this syntax is available becuse of thunk
    return dispatch => {
        axios.get('https://react-my-burger-954cd.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch(setIngredients(response.data));
        }).catch(error => {
            dispatch(fetchIngredientsFailed());
        });
    };
};