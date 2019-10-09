import * as actionsTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}
const INGREDIENTS_PRICES = {
    salad: 0.5,
    meat: 1.3,
    bacon: 0.7,
    cheese: 0.4,
}
const addIngredients = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName],
        building: true
    }
}
const removeIngredients = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName],
        building: true
    }
}
const setIngredients = (state, action) => {
     return {
         ...state,
         ingredients: {
             salad: action.ingredients.salad,
             bacon: action.ingredients.bacon,
             cheese: action.ingredients.cheese,
             meat: action.ingredients.meat,
         },
         totalPrice: 4,
         error: false,
         building: false
     }
}
const fetchIngredientsFail = (state) => {
     return {
         ...state,
         error: true
     }
}
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.ADD_INGREDIENTS: return addIngredients(state, action)
        case actionsTypes.REMOVE_INGREDIENTS: return removeIngredients(state, action)
        case actionsTypes.SET_INGREDIENTS: return setIngredients(state, action)
        case actionsTypes.FETCH_INGREDIENTS_FIELD:return fetchIngredientsFail(state)
        default: return state
    }
}

export default rootReducer