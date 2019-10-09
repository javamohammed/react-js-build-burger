import * as actionsTypes from '../actions/actionTypes';
const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}
const authStart = (state) => {
    return {
        ...state,
        loading: true,
        error: null
    }
}
const authSuccess = (state, action) => {
    return {
        ...state,
        token: action.idToken,
        userId: action.userId,
        loading: false
    }
}
const authFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    }
}
const authLogout = (state) => {
    return {
         ...state,
        token: null,
        userId: null,
        loading: false
    }
}
const setAuthRedirectPath = (state, action) => {
    return {
        ...state,
        authRedirectPath: action.path
    }
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.AUTH_START: return authStart(state)
        case actionsTypes.AUTH_SUCCESS: return authSuccess(state, action)
        case actionsTypes.AUTH_FAIL: return authFail(state, action)
        case actionsTypes.AUTH_LOGOUT: return authLogout(state, action)
        case actionsTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action)
        default: return state
    }

}
export default reducer