import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, AUTH_LOGOUT, SET_AUTH_REDIRECT_PATH} from './actionTypes';
import axios from 'axios'



export const authSuccess = (idToken, userId) => {
    return {
        type: AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    }
}
export const authFail = (error) => {
    return {
        type: AUTH_FAIL,
        error: error
    }
}
export const authStart = () => {
    return {
        type: AUTH_START,
    }
}
export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return {
        type: AUTH_LOGOUT,
    }
}
export const checkAuthTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}
export const auth = (email, password, isSignUp) => {
    return  dispatch =>{
        dispatch(authStart())
        const authData = {
                "email": email,
                "password": password,
                "returnSecureToken": true
            }
            const apiKey = ''
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + apiKey
        if (!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + apiKey
        }
        axios.post(url, authData)
        .then(response => {
            //console.log(response.data)
            const expirationDate = new  Date(new Date().getTime() + response.data.expiresIn * 1000)
            localStorage.setItem('token', response.data.idToken)
            localStorage.setItem('expirationDate', expirationDate)
            localStorage.setItem('userId', response.data.localId)
            dispatch(authSuccess(response.data.idToken, response.data.localId))
            dispatch(checkAuthTimeOut(response.data.expiresIn))
        }).catch(error =>{
            //console.log()
             dispatch(authFail(error.response.data.error.message))
        })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: SET_AUTH_REDIRECT_PATH,
        path:path
    }
}


export const authCheckState = (path) => {
    return  dispatch => {
        const token = localStorage.getItem('token')
        if(!token){
            dispatch(logout())
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if(expirationDate < new Date()){
                dispatch(logout())
            }else{
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime())/1000) )
            }

        }
    }
}
