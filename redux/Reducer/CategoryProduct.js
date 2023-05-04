import { types } from "../Action/actionTypes";

const initialState = {
    product: null,
    error: null,
    loading: false
}

export default (state = initialState, action) => {
    // logfunction("STATE LOG ====", action)
    switch (action.type) {
        case types.FETCH_CATEGORIES_REQUEST:
                return { ...state, loading: true };
        case types.CAT_PRODUCT_LIST_SUCCESS:
            console.log('CatPRODUCTS', action.payload.products)
             return {
                 ...state,
                 product: action.payload.products,
                 loading: false
             };
        default:
             return state;
     }
 }

