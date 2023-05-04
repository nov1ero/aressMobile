import { types } from "../Action/actionTypes";

const initialState = {
    wishlistCount: 0,
    wishlistData: null,
    wishlistArr:null
}
export default (state = initialState, action) => {
    switch (action.type) {
        case types.SUCCESS_WISHLIST:
          const wishlistArr = action.payload.items.map(item => item.productid);
          //console.log("wish_REDUCER", action.payload.items)
          return {
            ...state,
            wishlistCount: action.payload.totalitem,
            wishlistData: action.payload.items,
            wishlistArr: wishlistArr
          };
          case types.WISH_LOGOUT:
            return{
                ...state,
                wishlistCount: 0,
                wishlistData: null,
                wishlistArr:null
            }
        default:
          return state;
      }
    
}
