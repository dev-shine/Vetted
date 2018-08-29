import {
     API_LOADING,
     OPERATION_FAILED,
     GET_MULTIPLEDROPDOWN_OPTIONS_SUCCESS,
} from '../constants/actionTypes';
import {
    fetchDataService
} from '../apis'
/* Api Loading  */
export function fetchingData() {
    return {
        type: API_LOADING
    }
}
/* In case of Failed, Emit Error Handle */
export function operationFailed(error) {
    return {
        type: OPERATION_FAILED,
        error 
    }
}
/* In case of Success, Get options from backed API */
export function getedMultiOptionsSuccess(options) {
    return {
        type: GET_MULTIPLEDROPDOWN_OPTIONS_SUCCESS,
        options
    }
}
/* Get Multi Options from backend Api */
export function getMultiOptions() {
    return (dispatch, getState) => {
        console.log(getState())
        dispatch(fetchingData());
        return fetchDataService('/multioptions/') // getState().Auth.userId , getState().Auth.authentication_token) it will be required in Real App.
        .then((response) => {
            dispatch(getedMultiOptionsSuccess(response));
        })
        .catch(err => {
            dispatch(operationFailed(err));
        })
    }
}