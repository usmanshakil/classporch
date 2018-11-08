
import {
    SEARCH_START,
    SEARCH_SUCCESS,
    SEARCH_FAIL,
    LOGOUT_USER_SUCCESS,
    TOGGLE_SEARCH_MODE
    
}  from '../actions/types'

const INITIAL_STATE = {
    searchResults:[],
    loadingSearch:false,
    searchError:null,
    searchMode:'normal'
};

export default (state=INITIAL_STATE,action) => {
    switch(action.type){
        case SEARCH_START:
            return {...state, loadingSearch:true};
        case SEARCH_SUCCESS:
            return { ...state, loadingSearch:false, searchResults:action.payload };
        case SEARCH_FAIL:
            return { ...state, loadingSearch:false, searchError:action.payload };
        case LOGOUT_USER_SUCCESS:
            return { ...state = INITIAL_STATE };
            
        case TOGGLE_SEARCH_MODE:
        console.log(action.payload);
            return { ...state, searchMode:action.payload };
      

        default:
            return state
    }
}