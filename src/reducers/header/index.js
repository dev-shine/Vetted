import _ from 'lodash'
import {
    TOGGLE_DESIGN_STYLE,
} from '../../constants/actionTypes';
/* Initial State */
const initialState = {
   isAntD: localStorage.getItem("antd") || false,
};
/* Need Comment? This is Reducer Switch Case for each Action Type */
const reducer = (state = initialState, action) => {
    let newState = _.cloneDeep(state);
    
    switch(action.type) {
        case TOGGLE_DESIGN_STYLE:
            newState.isAntD = action.isAntD
            console.log("************************************", action.isAntD)
            localStorage.setItem("antd", action.isAntD)
            return newState
        default:
            return state;
    }
};

export default reducer;