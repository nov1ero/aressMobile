import { types } from "../Action/actionTypes";
import { logfunction } from "../../helpers/FunctionHelper";

const initialState = {
    detailsData:  {"attributes": [], "brand_name": "Blueline", "combinations": [{"default": "Yes", "id": 21, "images": [Array], "mainprice": 2400000, "maxorderlimit": 1, "minorderlimit": 1, "off_in_percent": 0, "offerprice": 0, "pricein": "KZT", "stock": 100, "symbol": "₸", "variants": [Array], "weight": "0g"}], "comments": [], "common_variant": [], "coupans": null, "description": {"ru": "MacBook Air M2 MacBook Air M2 MacBook Air M2 MacBook Air M2 MacBook Air M2 MacBook Air M2"}, "images_path": "https://aress.kz/public/images/simple_products/gallery", "is_in_wishlist": false, "key_features": [], "other_services": [], "product_id": 21, "product_name": {"ru": "MacBook Pro M2"}, "rating": 0, "ratingState": {"overallrating": 0, "price": 0, "quality": 0, "value": 0}, "ratingsAndreviews": [], "reviews": 0, "special_services": [{"description": "With our partnered courier services your product will be delivered fast", "heading": "Fast Delivery"}, {"description": "6 Quality checks your product quality is 100% trustable", "heading": "Quality Assurance"}, {"description": "All your purcahse are secured from our leading payment gateways.", "heading": "Purchase Protection"}], "store_id": 2, "store_logo": "166047596772-729809_collection-of-free-mouse-vector-laboratory-mouse-drawing.png", "store_logo_path": "https://aress.kz/public/images/store", "store_name": "Test", "tags": null, "tax_info": "Inclusive of all taxes", "thumbnail_path": "https://aress.kz/public/images/simple_products", "total_comments": 0, "total_reviews": 0, "videoThumbnail": null, "videoThumburl": "https://aress.kz/public/images/videothumbnails", "videoUrl": null, "viewallcomment": "View all (0) comments", "viewallreview": "View all (0) reviews", "warranty": null},
    loading: false,
    error: null
  };

const productDetailsReducer = (state = initialState, action) => {
  
    switch (action.type) {
      case types.GET_PRODUCT_DETAILS_REQUEST:
        return { ...state, loading: true };
      case types.GET_PRODUCT_DETAILS_SUCCESS:
        //console.log("syuda smotry",action.payload?.data.product)
        return { ...state, detailsData: action.payload?.data?.product, loading: false, error: null };
      case types.GET_PRODUCT_DETAILS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export default productDetailsReducer;
