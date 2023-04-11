import { types } from "../Action/actionTypes";
import { logfunction } from "../../helpers/FunctionHelper";

const initialState = {
    access_token: null,
    expires_in: null,
    refresh_token: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    regSuccess: false
}
export default (state = initialState, action) => {
    switch (action.type) {
      case types.REGISTER_SUCCESS:
          return {
            ...state,
            regSuccess: true
          };
          case types.IS_AUTH:
            return {
              ...state,
              isAuthenticated: action.payload
            };
        case types.LOGIN_SUCCESS:
          return {
            ...state,
            access_token: action.api_data.access_token,
            expires_in: action.api_data.expires_in,
            refresh_token: action.api_data.refresh_token,
            isAuthenticated: true
          };
        case types.LOGIN_FAILURE:
          return {
            ...state,
            error: action.payload,
            isAuthenticated: false
          };
        case types.DO_LOGOUT:
          return {
            ...state,
            isAuthenticated: false
          };
        default:
          return state;
      }
}
