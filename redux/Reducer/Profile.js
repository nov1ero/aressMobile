import { types } from "../Action/actionTypes";

const initialState = {
    name: null,
    email: null, 
    mobile: null,
    email_verified_at: null,
    role_id: null

}
export default (state = initialState, action) => {
    switch (action.type) {
      case types.PROFILE_SET:
          return {
            ...state,
            name: action.payload.name,
            email: action.payload.email, 
            mobile: action.payload.mobile,
            email_verified_at: action.payload.email_verified_at,
            role_id: action.payload.role_id
          };
        case types.UPDATE_PROFILE:
          return {
            ...state,
            
          };
          case types.CHANGE_PASSWORD:
          return {
            ...state,
          };
        default:
          return state;
      }
}