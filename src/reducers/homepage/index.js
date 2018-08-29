import _ from 'lodash'
import {
    OPERATION_FAILED,
    API_LOADING,
    GET_MULTIPLEDROPDOWN_OPTIONS_SUCCESS,
    SUBMIT_FROMDATA_SUCCESS,
} from '../../constants/actionTypes';
/* Initial State */
const initialState = {
    apiLoading: false,
    options: {},
    errors: [],
};
/* Need Comment? This is Reducer Switch Case for each Action Type */
const reducer = (state = initialState, action) => {
    let newState = _.cloneDeep(state);
    
    switch(action.type) {
        
        case API_LOADING:
            newState.apiLoading = true;
            return newState;

        case GET_MULTIPLEDROPDOWN_OPTIONS_SUCCESS:
            newState.apiLoading = false;
            newState.options = action.options;
            return newState;

        case OPERATION_FAILED:
            newState.apiLoading = false;
            newState.errors.push(action.error);

        case SUBMIT_FROMDATA_SUCCESS:
            newState.apiLoading = false
        default:
            return state;
    }
};

export default reducer;