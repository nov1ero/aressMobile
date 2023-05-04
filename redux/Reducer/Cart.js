import { types } from "../Action/actionTypes";
import { logfunction } from "../../helpers/FunctionHelper";

const initialState = {
    cartCount: 0,
    cartData: []
}
export default (state = initialState, action) => {
    const { payload } = action;
    // logfunction("PAYLOAD IN REDUCER ", payload)
    switch (action.type) {

        case types.SUCCESS_CART:
            //console.log("CART_COUNT", payload.cartData.totalCount)
            //console.log("CART_DATA", payload.cartData.cartProducts)
            return {
                ...state,
                cartCount: payload.cartCount,
                cartData: payload.cartData
            }
        case types.SUCCESS_CHECKOUT:
            return {
                ...state,
                cartCount: 0,
                cartData: []
            }
        case types.CART_LOGOUT:
            return{
                ...state,
                cartCount: 0,
                cartData: []
            }
        default:
            return state;
    }
}
