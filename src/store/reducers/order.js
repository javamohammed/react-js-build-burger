import * as actionsTypes from '../actions/actionTypes';
const initialState = {
    orders: [],
    loading: false,
    purchased: false
}
const fetchOrdersStart = (state) => {
    return {
        ...state,
        loading: true
    }
}
const fetchOrdersSuccess = (state, action) => {
    return {
        ...state,
        orders: action.orderData,
        loading: false
    }
}
const fetchOrdersFail = (state) => {
    return {
        ...state,
        loading: true
    }
}

const purchaseInit = (state) => {
    return {
        ...state,
        purchased: false
    }
}
const purchaseBurgerStart = (state) => {
    return {
        ...state,
        loading: true
    }
}
const purchaseBurgerSuccess = (state, action) => {
    const newOrder = {
        ...action.orderData,
        id: action.orderId

    }
    return {
        ...state,
        orders: state.orders.concat(newOrder),
        loading: false,
        purchased: true

    }
}
const purchaseBurgerFail = (state) => {
    return {
        ...state,
        loading: false
    }
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.FETCH_ORDERS_START: return fetchOrdersStart(state)
        case actionsTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action)
        case actionsTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state)
        case actionsTypes.PURCHASE_INIT: return purchaseInit(state)
        case actionsTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state)
        case actionsTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action)
        case actionsTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state)
        default: return state
    }

}
export default reducer