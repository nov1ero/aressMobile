import { types } from "../Action/actionTypes";

const initialState = {
    orders:[],
    one_order:[]
}
export default (state = initialState, action) => {
    switch (action.type) {
            case types.GET_ORDERS_REQUEST:
                return{
                    ...state,
                }
            case types.GET_ORDERS_SUCCESS:
                return{
                    ...state,
                    orders: action.payload
                }
                case types.GET_ONE_ORDER_REQUEST:
                    return{
                        ...state,
                    }
            case types.GET_ONE_ORDER_SUCCESS:
                console.log("ONE_REDUCER", action.payload)
                return{
                    ...state,
                    one_order: action.payload
                }
        default:
          return state;
      }
    
}