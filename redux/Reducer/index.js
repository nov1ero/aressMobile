
import { combineReducers } from "redux";
import Cart from "./Cart";
import Product from "./Product";
import MainScreenReducer from "./MainScreenReducer";
import Auth from "./Auth"
import Home from "./Home"
import Wishlist from "./Wishlist"
import Categories from "./Categories"

const reducers = combineReducers({
    mainScreenInit: MainScreenReducer,
    cart: Cart,
    auth: Auth,
    home: Home,
    product: Product,
    wishlist: Wishlist,
    categories: Categories
})

export default reducers;


