import { call, put, takeEvery, select } from "redux-saga/effects";
import { types } from "@actions/actionTypes";
import { Alert } from 'react-native';
import {
    getHomeSuccess, 
    loginFailure, 
    registerSuccess, 
    loginSuccess, 
    getProductDetailsSuccess, 
    successInt, 
    successCart, 
    successCheckout, 
    authStatus, 
    successWishlist, 
    getCategoriesFailure, 
    getCategoriesSuccess, 
    fetchCategoriesRequest,
    profileSet,
    isAuth
} from "@actions";
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';
import { getDataService, getUsers, getDataServices} from '../Api/getApi';
import ProductView from "../../component/ProductCompnent/ProductView";

export function* watchGeneralRequest() {
    yield takeEvery(types.GET_PRODUCT_DETAILS_REQUEST, getProductDetailsData);
    yield takeEvery(types.GET_HOME_REQUEST, getHomeData);
    yield takeEvery(types.REQUEST_INIT, requestInit);
    yield takeEvery(types.ADD_TO_CART, addToCart);
    yield takeEvery(types.ADD_TO_WISHLIST, addToWishlist);
    yield takeEvery(types.REMOVE_FROM_WISHLIST, removeFromWishlist);
    yield takeEvery(types.REMOVE_CART, removeFromCart);
    yield takeEvery(types.INCREMENT_QUANTITY, incrementQuantity);
    yield takeEvery(types.DECREMENT_QUANTITY, decrementQuantity);
    yield takeEvery(types.PROCEED_CHECKOUT, proceedCheckout);
    // yield takeEvery(types.DO_LOGIN, doLogin);
    yield takeEvery(types.DO_LOGOUT, doLogout);
    yield takeEvery(types.FETCH_CATEGORIES, fetchCategoriesSaga);
    yield takeEvery(types.LOGIN_REQUEST, login_Request);
    yield takeEvery(types.REGISTER_REQUEST, register_Request);
    yield takeEvery(types.PROFILE_REQUEST, profile_Request);
    //yield takeEvery(types.CART_FETCH_PRODUCT_DETAILS_REQUEST, fetchProductDetails);
}

const delay = (ms) => new Promise(res=> setTimeout(res, ms))


function* requestInit(action) {
    try {

        // ************** If you want to login based home page then do stuff here ****************
        // console.log("__INIT__" , action.payload.userAuth)
        // if (action.payload.userAuth) {
        //     yield put(successInt('HomeScreen'));
        // }
        // else {
        //     yield put(successInt('LoginScreen'));
        // }

        // ************** Else here ****************

        //AsyncStorage.removeItem('IS_AUTH');

        //get local login data
        // let getAuth = yield call(AsyncStorage.getItem, "IS_AUTH")
        // // console.log("IS LODDED ", getAuth)
        // if (getAuth == 1) {
        //     yield put(authStatus(true));
        // }
        // else {
        //     yield put(authStatus(false));
        // }

        yield put(successInt('HomeScreen'));

        
        const access_token = yield call(AsyncStorage.getItem, 'access_token')
        if(access_token){
          yield put(isAuth(true))

        var profHeaders = new Headers();
        profHeaders.append("Authorization", "Bearer" + " "+ access_token)
       

        var requestOptions = {
            method: 'GET',
            headers: profHeaders,
            redirect: 'follow'
          };
          
          const profResponse = yield fetch("https://aress.kz/api/myprofile?secret=a7727fec-2b3e-4745-97cd-bb212bed0d99", requestOptions)
          const profData = yield profResponse.json(); 
          yield put(profileSet(profData))
          console.log("PROF_DATA", data)


          var getHeaders = new Headers();
          getHeaders.append("Accept", "application/json");
          getHeaders.append("Authorization", "Bearer" + " "+ access_token)
          var requestOptions = {
              method: 'GET',
              headers: getHeaders,
            };
  
          //cart count set
          const cart_response =  yield fetch('https://aress.kz/api/cart?currency=KZT', requestOptions);
          const carData = yield cart_response.json();
          console.log("CART_DATA", carData)
          if (carData.status == "fail") {
            yield call(Alert.alert, 'Ошибка', "Корзина не прогрузилась");
          }else if(carData.status == "success" && carData.msg=="Your cart is empty !"){
            let data = { cartCount: 0, cartData: [] }
            yield put(successCart(data));
          }else{
            let data = { cartCount: carData.products.length, cartData: carData.products }
              yield put(successCart(data));
          }
  
          //Wishlist count set
            const response =  yield fetch('https://aress.kz/api/wishlist?currency=KZT', requestOptions);
            const data = yield response.json(); 
            yield put(successWishlist(data)); 
          }else{
            console.log("не авторизован")
          }
         


    } catch (e) {
        console.log("requestInitError",e)
        // console.log(e)
    }
}

function* addToCart(action) {
    try {
      const isInSystem = yield select(state => state.auth.isAuthenticated);
      console.log("ИС_ИН_СИСТЕМ", isInSystem)

      if(isInSystem == true){

        const id = action.payload.id
        const qty = action.payload.qty
        const max_qty = action.payload.max_qty
        console.log("CARTochka", id)
        console.log("CARTochka", qty)
        console.log("CARTochka", max_qty)
        if(qty>max_qty){
          yield call(Alert.alert, 'Не возможно добавить', 'Максимально количество которое можно добавить: '+max_qty);
        }else{
        
        let access_token = yield call(AsyncStorage.getItem, 'access_token')

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer" + " "+ access_token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "simple_pro_id": id,
            "type": "s",
            "quantity": qty,
            "currency": "KZT"
          });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        };

          const response =  yield fetch('https://aress.kz/api/addtocart?currency=KZT&type=s&quantity=1&simple_pro_id='+id, requestOptions);
          const data = yield response.json(); 
          console.log("CART_ADD", data)
          yield call(Alert.alert, 'Успех', 'Предмет добавлен в Корзину');

        
        var getHeaders = new Headers();
        getHeaders.append("Accept", "application/json");
        getHeaders.append("Authorization", "Bearer" + " "+ access_token)
        // console.log("124235", access_token)
        var getRequestOptions = {
            method: 'GET',
            headers: getHeaders,
          };

          const cart_response =  yield fetch('https://aress.kz/api/cart?currency=KZT', getRequestOptions);
        const carData = yield cart_response.json();
        console.log("CART_DATA", carData)
        if (carData) {
            let data = { cartCount: carData.products.length, cartData: carData.products }

            yield put(successCart(data));
        }}
      }else{
        yield call(Alert.alert, 'Вы не авторизованы в системе', 'Войдите в систему');
      }

          
    } catch (e) {
        console.log('ERROR NAHUI =', e);
        yield call(Alert.alert, 'Ошибка', 'Что-то пошло не так!');
    }
}

function* removeFromCart(action) {
    try {
        const id = action.payload.id
        console.log("REMOVE_ID", id)
        
        let access_token = yield call(AsyncStorage.getItem, 'access_token')

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer" + " "+ access_token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "cartid": id
          });
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw
          };

          const response =  yield fetch('https://aress.kz/api/remove/cart/item', requestOptions);
          const data = yield response.json(); 
          console.log("REMOVE_ID", data)
          yield call(Alert.alert, 'Успех', 'Предмет убран из Корзины');

        
          var getHeaders = new Headers();
          getHeaders.append("Accept", "application/json");
          getHeaders.append("Authorization", "Bearer" + " "+ access_token)
          var requestOptions = {
              method: 'GET',
              headers: getHeaders,
            };
          const cart_response =  yield fetch('https://aress.kz/api/cart?currency=KZT', requestOptions);
          const carData = yield cart_response.json();
          console.log("CART_DATA", carData)
          if (carData) {
            if (carData.status == "fail") {
              yield call(Alert.alert, 'Ошибка', "Корзина не прогрузилась");
            }else if(carData.status == "success" && carData.msg=="Your cart is empty !"){
              let data = { cartCount: 0, cartData: [] }
              yield put(successCart(data));
            }else{
              let data = { cartCount: carData.products.length, cartData: carData.products }
                yield put(successCart(data));
            }
          }

          
        // yield put(successWishlist({ totalCount: data.totalCount, data. }));
    } catch (e) {
        console.log('ERROR NAHUI =', e);
        yield call(Alert.alert, 'Ошибка', 'Что-то пошло не так!');
    }
}

function* incrementQuantity(action) {
    try {

      const id = action.payload.id
      const qty = action.payload.qty
      const qty_1 = qty+1
      console.log("QTY_INCREASED", qty_1)
      const max_qty = action.payload
      console.log("MAXOR", max_qty)
      if(qty_1>max_qty){
        yield call(Alert.alert, 'Не возможно добавить', 'Максимально количество которое можно добавить: '+max_qty);
      }else{
      let access_token = yield call(AsyncStorage.getItem, 'access_token')

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer" + " "+ access_token);
        myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "cartid": id,
        "quantity": qty+1
      });
      console.log("RAW", raw)
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      const response = yield fetch("https://aress.kz/api/increase-quantity/in/cart?currency=KZT", requestOptions);
      const data = yield response.json();
      if(data.status == 'fail'){
        if(data.msg == "Product max qty limit reached !"){
          yield call(Alert.alert, 'Ошибка', "Продукт достиг максимального колчества");
        }else{
          yield call(Alert.alert, 'Ошибка', "Продукция не найдена");
        }
        console.log("Increment", data)
      }else{
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
        };
        const cart_response =  yield fetch('https://aress.kz/api/cart?currency=KZT', requestOptions);
        const carData = yield cart_response.json();
        console.log("CART_DATA", carData)
      }}
    } catch (e) {
      console.log('ERROR =', e)
    }
  }
  

function* decrementQuantity(action) {
    try {
      const id = action.payload.id
      const qty = action.payload.qty
      let access_token = yield call(AsyncStorage.getItem, 'access_token')

      var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer" + " "+ access_token);
        myHeaders.append("Content-Type", "application/json");

      if(qty == 1){
        var del_raw = JSON.stringify({
          "cartid": id,
        });
        var del_requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: del_raw,
          redirect: 'follow'
        };

        const response =  yield fetch('https://aress.kz/api/remove/cart/item', del_requestOptions);
          const data = yield response.json(); 
          console.log("REMOVE_ID", data)
      }{
        var raw = JSON.stringify({
          "cartid": id,
          "quantity": qty-1
        });
          console.log("RAW", raw)
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        const response = yield fetch("https://aress.kz/api/increase-quantity/in/cart?currency=KZT", requestOptions);
        const data = yield response.json();
        if(data.status == 'fail'){
          yield call(Alert.alert, 'Ошибка', "Продукция не найдена");
          console.log("Decrement", data)
        }else{
          var requestOptions = {
            method: 'GET',
            headers: myHeaders,
          };
          const cart_response =  yield fetch('https://aress.kz/api/cart?currency=KZT', requestOptions);
          const carData = yield cart_response.json();
          console.log("CART_DATA", carData)
        }
      }

        

      
    } catch (e) {
        console.log('ERROR =', e)
    }
}


function* proceedCheckout(action) {
    try {
        AsyncStorage.removeItem('CART_DATA');
        yield put(successCheckout());

    } catch (e) {
        console.log('ERROR =', e)
    }
}

function* addToWishlist(action) {
    try {
      const isInSystem = yield select(state => state.auth.isAuthenticated);
      console.log("ИС_ИН_СИСТЕМ", isInSystem)

      if(isInSystem == true){
        const id = action.payload.id
        // const accessToken = useSelector(state => state.auth.access_token);
        // console.log("TOKENS", accessToken)
        let access_token = yield call(AsyncStorage.getItem, 'access_token')

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer" + " "+ access_token)

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
          };

          const response =  yield fetch('https://aress.kz/api/wishlist/add/'+ id, requestOptions);
          const data = yield response.json(); 
          yield call(Toast.show, 'Предмет добавлен в Избраное!', {
            duration: 2000,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });
          

        
        var getHeaders = new Headers();
        getHeaders.append("Accept", "application/json");
        getHeaders.append("Authorization", "Bearer" + " "+ access_token)
        // console.log("124235", access_token)
        var getRequestOptions = {
            method: 'GET',
            headers: getHeaders,
          };

          const getResponse =  yield fetch('https://aress.kz/api/wishlist?currency=KZT', getRequestOptions);
          const getData = yield getResponse.json(); 
          console.log("aWish", getData)
          yield put(successWishlist(getData));
      }else{
        yield call(Alert.alert, 'Вы не авторизованы в системе', 'Войдите в систему');
      }

        

          
    } catch (e) {
        console.log('ERROR NAHUI =', e);
    }
}

function* removeFromWishlist(action) {
    try {
        const id = action.payload.id
        console.log("REDUX_REMOVE", id)
        
        let access_token = yield call(AsyncStorage.getItem, 'access_token')

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer" + " "+ access_token)

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
          };

          const response =  yield fetch('https://aress.kz/api/wishlist/remove/'+ id, requestOptions);
          const data = yield response.json(); 
          console.log("REMOVE", data)
          if(data.msg == "Wishlist item not found !"){
            yield call(Alert.alert, 'Ошибка', 'Что-то пошло не так!');
          }else{
            yield call(Toast.show, 'Предмет удален из Избраного!', {
              duration: 2000,
              position: Toast.positions.CENTER,
              shadow: true,
              animation: true,
              hideOnPress: true,
              delay: 0,
            });
          }
          

        
        var getHeaders = new Headers();
        getHeaders.append("Accept", "application/json");
        getHeaders.append("Authorization", "Bearer" + " "+ access_token)
        // console.log("124235", access_token)
        var getRequestOptions = {
            method: 'GET',
            headers: getHeaders,
          };

          const getResponse =  yield fetch('https://aress.kz/api/wishlist?currency=KZT', getRequestOptions);
          const getData = yield getResponse.json(); 
          console.log("rWish", getData)
          yield put(successWishlist(getData));
    } catch (e) {
        console.log('ERROR NAHUI =', e);
        yield call(Alert.alert, 'Ошибка', 'Что-то пошло не так!');
    }
}

function* getHomeData() {
    try {
        const response = yield fetch("https://aress.kz/api/homepage?secret=a7727fec-2b3e-4745-97cd-bb212bed0d99&currency=KZT");
        const data = yield response.json(); 
        yield put(getHomeSuccess(data));
    } catch (e) {
        console.log('ERROR =', e)
    }
}

function* getProductDetailsData(action) {
    try {
      var requestOptions = {
        method: 'GET',
        body: "",
      };

      const response =  yield fetch("https://aress.kz/api/details/"+action.payload.id+"/0/s/?secret=a7727fec-2b3e-4745-97cd-bb212bed0d99&currency=KZT", requestOptions);
      const data = yield response.json(); 
      console.log("DETAIL_DATA", data)
      yield put(getProductDetailsSuccess(data));
    } catch (e) {
        console.log('ERROR =', e)
    }
}

function* login_Request(action) {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": action.payload.email,
            "password": action.payload.password
          });

          console.log("FORM_DATA", raw)
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
          };

          const response =  yield fetch('https://aress.kz/api/login?secret=a7727fec-2b3e-4745-97cd-bb212bed0d99', requestOptions);
          const data = yield response.json(); 
          console.log("DATA", data)
          if(data.status == 'fail'){
            yield call(Alert.alert, 'Ошибка', data.msg);

          }
          if (data.access_token && data.refresh_token) {
            yield put(loginSuccess(data));
            yield put(isAuth(true))
            yield AsyncStorage.setItem('access_token', data.access_token);
            yield AsyncStorage.setItem('refresh_token', data.refresh_token);
            yield AsyncStorage.setItem('expires_in', JSON.stringify(data.expires_in));
          } else {
            yield put(loginFailure('Invalid response'));
          }
        } catch (error) {
          console.log("error", error)
          yield put(loginFailure(error));
        }
  }

function* doLogout(action) {
    try {

      const access_token = yield call(AsyncStorage.getItem, 'access_token')
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer" + " "+ access_token)

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
      };
      
      const response = yield fetch("https://aress.kz/api/logout", requestOptions);
      const data = yield response.json();
      console.log("LogOut", data)
      yield call(AsyncStorage.removeItem, 'access_token')
      yield put(isAuth(false))
    } catch (e) {
        console.log('ERROR =', e)
    }
}

export function* fetchCategoriesSaga() {
    try {
        yield put(fetchCategoriesRequest());
        const response = yield fetch("https://aress.kz/api/categories?secret=a7727fec-2b3e-4745-97cd-bb212bed0d99&currency=KZT");
        const data = yield response.json();        
        yield put(getCategoriesSuccess(data));
        //console.log('CAT_DATA', data)
    } catch (error) {
        console.log("ERROR_c", error)
        yield put(getCategoriesFailure(error.message));
    }
  }
  function* register_Request(action) {
    try {
        reg_data = action.payload
        
        console.log("REG_DATA", reg_data)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify(
          {
              "name": reg_data.firstName+" "+reg_data.lastName,
              "email": reg_data.email,
              "mobile": reg_data.mobileNumber,
              "password": reg_data.password
          }
        );
        console.log("RAW", raw)

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        const response = yield fetch("https://aress.kz/api/register", requestOptions);
        const data = yield response.json();
        console.log("data", data)
        console.log("REGISTR_DATA", data)
        if(data.status == 'fail'){
          yield call(Alert.alert, 'Ошибка', data.msg);
        }else{
          yield put(registerSuccess())
          yield call(Alert.alert, 'Успех', 'Регистрация прошла успешно');
        }
        } catch (e) {
            console.log('ERROR =', e)
            yield call(Alert.alert, 'Ошибка', e);
            console.log("ERROR ==> ", e)
        }
  }

  function* profile_Request() {
    try {

        const access_token = yield call(AsyncStorage.getItem, 'access_token')
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer" + " "+ access_token)
       

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };
          
          const response = yield fetch("https://aress.kz/api/myprofile?secret=a7727fec-2b3e-4745-97cd-bb212bed0d99", requestOptions)
          const data = yield response.json(); 
          yield put(profileSet(data))
          console.log("PROF_DATA", data)
        } catch (e) {
            console.log('ERROR =', e)
            yield call(Alert.alert, 'Ошибка', 'Что-то пошло не так!');
        }
  }



// export function* fetchProductDetails(action) {
//     try {
//         const product = yield fetch (`https://aress.kz/api/details/`+action.productId); // make a GET request using fetch
//         const productData = yield product.json(); // extract the JSON data from the response
//         yield put(cartFetchProductDetailsSuccess(productData)); // dispatch a success action with the product data
//     } catch (error) {
//         yield put(cartFetchProductDetailsFailure(error)); // dispatch a failure action with the error
//     }
//   }