import { types } from "../Action/actionTypes";

const initialState = {
    address:[]
}
export default (state = initialState, action) => {
    switch (action.type) {
            case types.GET_ADDRESS_REQUEST:
                return{
                    ...state,
                }
            case types.GET_ADDRESS_SUCCESS:
                return{
                    ...state,
                    address: action.payload
                }
                case types.ADD_ADDRESS:
                    return{
                        ...state,
                    }
            case types.UPDATE_ADDRESS:
                return{
                    ...state,
                }
        default:
          return state;
      }
    
}
