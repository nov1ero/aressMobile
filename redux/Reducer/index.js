
import { combineReducers } from "redux";
import Cart from "./Cart";
import Product from "./Product";
import MainScreenReducer from "./MainScreenReducer";
import Auth from "./Auth"
import Home from "./Home"
import Wishlist from "./Wishlist"
import Categories from "./Categories"
import CategoryProduct from "./CategoryProduct"
import Profile from "./Profile";
import Search from "./Search";

const reducers = combineReducers({
    mainScreenInit: MainScreenReducer,
    cart: Cart,
    auth: Auth,
    home: Home,
    product: Product,
    wishlist: Wishlist,
    categories: Categories,
    profile: Profile,
    cat_product: CategoryProduct,
    search: Search
})

export default reducers;


