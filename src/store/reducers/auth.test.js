import reducer from './auth'
import * as actionTypes from '../actions/actionTypes';

describe("Auth reducer", ()=> {
    it('should return the initial state', ()=> {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    })
    it('should return the state with token and userId', () => {
        expect(reducer(undefined, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'some-token',
            userId: 'some-userId'
        })).toEqual({
            token: 'some-token',
            userId: 'some-userId',
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    })
})