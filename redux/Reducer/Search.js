import { types } from "../Action/actionTypes";

const initialState = {
    product: [],
    error: null,
    loading: false
}

export default (state = initialState, action) => {
    // logfunction("STATE LOG ====", action)
    switch (action.type) {
        case types.GET_SEARCH:
                return { ...state, loading: true };
        case types.SEARCH_SUCCESS:
            console.log('search', action.payload.products)
             return {
                 ...state,
                 product: action.payload.products,
                 loading: false
             };
        default:
             return state;
     }
 }

