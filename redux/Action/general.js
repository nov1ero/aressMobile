import { types } from "./actionTypes";
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const fetchCategories = () => ({
    type: types.FETCH_CATEGORIES,
  });

export function fetchCategoriesRequest(params){
    return{
        type: types.FETCH_CATEGORIES_REQUEST,
        payload: {params}

    }
};

export function getCategoriesSuccess(categories){
    return {
        type: types.GET_CATEGORIES_SUCCESS,
        payload: {
            categories
        }
    };
}

export function getCategoriesFailure(error){
    return {
        type: types.GET_CATEGORIES_FAILURE,
        payload: {
            error
        }
    };
}

export function requestInit(user) {
    return {
        type: types.REQUEST_INIT,
        payload: {
            userAuth: user != null ? 1 : 0,
        }
    };
}

export function successInt(navigateScreen) {
    return {
        type: types.SUCCESS_INIT,
        payload: {
            navigateScreen
        }
    };
}

export function addToCart(id,  qty, max_qty) {
    return {
        type: types.ADD_TO_CART,
        payload:{
            id,
            qty,
            max_qty
        }
    };
}

export function addToWishList(id) {
    return {
        type: types.ADD_TO_WISHLIST,
        payload: {
            id
        }
    };
}

export function removeFromWishlist(id) {
    return {
        type: types.REMOVE_FROM_WISHLIST,
        payload: {id}
    };
}

export function getHomeRequest() {
    return {
        type: types.GET_HOME_REQUEST,
    };
}

export function customRequest() {
    return {
        type: types.GET_HOME_REQUEST,
    };
}

export function getHomeSuccess(data) {
    return {
        type: types.GET_HOME_SUCCESS,
        payload: {
            data
        }
    };
}

export function getProductDetailsRequest(id) {
    return {
        type: types.GET_PRODUCT_DETAILS_REQUEST,
        payload: {
            id
        }
    };
}

export function getProductDetailsSuccess(data) {
    return {
        type: types.GET_PRODUCT_DETAILS_SUCCESS,
        payload:
            data
    };
}

export function getProductDetailsFailure(error) {
    return {
      type: types.GET_PRODUCT_DETAILS_FAILURE,
      error,
    };
  }
  


export function successCart(data) {
    return {
        type: types.SUCCESS_CART,
        payload: data
    };
}

export function successWishlist(data) {
    return {
        type: types.SUCCESS_WISHLIST,
        payload: data
    };
}


export function removeFromCart(id) {
    return {
        type: types.REMOVE_CART,
        payload: {
            id
        }
    };
}


export function decrementQuantity(id, qty) {
    return {
        type: types.DECREMENT_QUANTITY,
        payload: {
            id, qty
        }
    };
}


export function incrementQuantity(id, qty, max_qty) {
    return {
        type: types.INCREMENT_QUANTITY,
        payload: {
            id,
            qty,
            max_qty
        }
    };
}

export function proceedCheckout() {
    return {
        type: types.PROCEED_CHECKOUT,
        payload: {

        }
    };
}

export function successCheckout() {
    return {
        type: types.SUCCESS_CHECKOUT,
        payload: {
        }
    };
}

export function authStatus(status) {
    return {
        type: types.AUTH_STATUS,
        payload: {
            status: status
        }
    }
}

export function loginRequest(data) {
    return {
        type: types.LOGIN_REQUEST,
        payload: data
    }
}
  
export function loginSuccess(api_data){
    return {
        type: types.LOGIN_SUCCESS,
        api_data
    }
  };
    
  
export function loginFailure(error){
    return{
        type: types.LOGIN_FAILURE,
        payload:{
            error 
        }
    }
    
  };

export function doLogout() {
    return {
        type: types.DO_LOGOUT,
        payload: {

        }
    }
}

export function fetchProductCart(data){
    return {
        type: types.CART_FETCH_PRODUCT_DETAILS_REQUEST,
        payload: {
            data
        }
    }
}

export function registerRequest(data){
    return {
        type: types.REGISTER_REQUEST,
        payload: data
    }
}
export function registerSuccess(data){
    return {
        type: types.REGISTER_SUCCESS,
        payload: data
    }
}

export function profileRequest(data){
    return {
        type: types.PROFILE_REQUEST,
        payload: data
    }
}
export function profileSet(data){
    return {
        type: types.PROFILE_SET,
        payload: data
    }
}
export function editProfile(data){
    return {
        type: types.EDIT_PROFILE,
        payload: data
    }
}
export function changeAddress(data){
    return {
        type: types.CHANGE_ADDRESS,
        payload: data
    }
}
export function changePassword(data){
    return {
        type: types.CHANGE_PASSWORD,
        payload: data
    }
}
export function isAuth(data){
    return {
        type: types.IS_AUTH,
        payload: data
    }
}