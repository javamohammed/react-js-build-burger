import { ADD_INGREDIENTS, REMOVE_INGREDIENTS, SET_INGREDIENTS, FETCH_INGREDIENTS_FIELD } from './actionTypes';
import axios from '../../axios-orders'
export const addIngredients = (name) => {
    return {
        type : ADD_INGREDIENTS,
        ingredientName: name
    }
}

export const removeIngredients = (name) => {
    return {
        type: REMOVE_INGREDIENTS,
        ingredientName: name
    }
}
export const setIngredients = (ingredients) => {
    return {
        type: SET_INGREDIENTS,
        ingredients: ingredients
    }
}
export const fetchIngredientsField = () => {
    return {
        type: FETCH_INGREDIENTS_FIELD
    }
}

export const iniSetIngredients = () => {
    return  dispatch =>{
        axios.get('https://react-js-burger-bc8fd.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data))
            }).catch(error => {
                dispatch(fetchIngredientsField())
            })
    }
}