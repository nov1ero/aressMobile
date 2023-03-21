import { types } from "../Action/actionTypes";

const initialState = {
    categories: [],
    error: null,
    loading: false
}

export default (state = initialState, action) => {
    // logfunction("STATE LOG ====", action)
    switch (action.type) {
        case types.FETCH_CATEGORIES_REQUEST:
                return { ...state, loading: true };
        case types.GET_CATEGORIES_SUCCESS:
            console.log('Categories', action.payload.categories.categories)
             return {
                 ...state,
                 categories: action.payload.categories.categories,
                 loading: false
             };
        case types.GET_CATEGORIES_FAILURE:
            return{
                ...state, error: action.payload,
                loading: false
            }
        default:
             return state;
     }
 }

