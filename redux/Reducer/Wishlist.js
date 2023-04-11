import { types } from "../Action/actionTypes";
import { logfunction } from "../../helpers/FunctionHelper";

const initialState = {
    wishlistCount: 0,
    wishlistData: []
}
export default (state = initialState, action) => {
    switch (action.type) {
        case types.SUCCESS_WISHLIST:
          // console.log('REDUCER', action.payload)
          return {
            ...state,
            wishlistCount: action.payload.totalCount,
            wishlistData: action.payload.wishlistData
          };
        default:
          return state;
      }
    
}
