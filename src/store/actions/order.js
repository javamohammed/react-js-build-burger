import { PURCHASE_BURGER_FAIL, PURCHASE_BURGER_SUCCESS, PURCHASE_BURGER_START, PURCHASE_INIT,
         FETCH_ORDERS_START, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAIL
        }
        from './actionTypes';
import axios from '../../axios-orders'



export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: PURCHASE_BURGER_SUCCESS,
        orderId : id,
        orderData: orderData
    }
}
export const purchaseBurgerField = (error) => {
    return {
        type: PURCHASE_BURGER_FAIL,
        error: error
    }
}
export const purchaseBurgerStart = () => {
    return {
        type: PURCHASE_BURGER_START,
    }
}

export const purchaseBurger = (orderData, token) => {
    return  dispatch =>{
        dispatch(purchaseBurgerStart())
         axios.post('/orders.json?auth='+token, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            }).catch(error => {
                dispatch(purchaseBurgerField(error))
            })
    }
}

export const purchaseInit = () => {
    return {
        type: PURCHASE_INIT,
    }
}





export const fetchOrdersSuccess = (orders) => {
    return {
        type: FETCH_ORDERS_SUCCESS,
        orderData: orders
    }
}
export const fetchOrdersField = (error) => {
    return {
        type: FETCH_ORDERS_FAIL,
        error: error
    }
}
export const fetchOrdersStart = () => {
    return {
        type: FETCH_ORDERS_START,
    }
}

export const fetchOrders = (token,userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart())
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
        //console.log('https://react-js-burger-bc8fd.firebaseio.com/orders.json' + queryParams)
         axios.get('https://react-js-burger-bc8fd.firebaseio.com/orders.json' + queryParams)
            .then( res => {
                const fetchOrders = []
                for (const key in res.data) {
                    fetchOrders.push({...res.data[key],id: key})
                }
                dispatch(fetchOrdersSuccess(fetchOrders))
            })
            .catch(err => {
                console.log(err)
                dispatch(fetchOrdersField(err))
            })
    }
}
