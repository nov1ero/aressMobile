import { types } from "../Action/actionTypes";
import { logfunction } from "../../helpers/FunctionHelper";

const initialState = {
    detailsData:  {"product": {"product_id": 17,"product_name": {"ru": "Керамическая посуда"},"brand_name": "Cape racer","store_name": "Test","store_logo_path": "https://aress.kz/images/store","store_logo": "166047596772-729809_collection-of-free-mouse-vector-laboratory-mouse-drawing.png","store_id": 2,"key_features": [],"description": {"ru": "Керамические тарелки"},"tags": null,"rating": 0,"reviews": 0,"attributes": [],"videoThumbnail": null,"videoUrl": null,"total_comments": 0,"total_reviews": 0,"videoThumburl": "https://aress.kz/images/videothumbnails","thumbnail_path": "https://aress.kz/images/simple_products","images_path": "https://aress.kz/images/simple_products/gallery","common_variant": [],"combinations": [{"id": 17,"mainprice": 3299,"offerprice": 0,"images": [{"image": "product_gallery_63c164871a2e5.jpg"},{"image": "product_gallery_63c164872abd6.jpg"},{"image": "product_gallery_63c164873d06c.jpg"}],"pricein": "KZT","symbol": "₸","weight": "0g","stock": 100,"off_in_percent": 0,"minorderlimit": 1,"maxorderlimit": 1,"default": "Yes","variants": []}],"tax_info": "Inclusive of all taxes","other_services": [],"warranty": null,"special_services": [{"heading": "Fast Delivery","description": "With our partnered courier services your product will be delivered fast"},{"heading": "Quality Assurance","description": "6 Quality checks your product quality is 100% trustable"},{"heading": "Purchase Protection","description": "All your purcahse are secured from our leading payment gateways."}],"coupans": null,"comments": [],"viewallcomment": "View all (0) comments","ratingState": {"overallrating": 0,"price": 0,"quality": 0,"value": 0},"ratingsAndreviews": [],"viewallreview": "View all (0) reviews","is_in_wishlist": false},"relatedProducts": null,"hotdeals": []},
    is_in_wishlist: null,
    loading: false,
    error: null
  };

const productDetailsReducer = (state = initialState, action) => {
  
    switch (action.type) {
      case types.GET_PRODUCT_DETAILS_REQUEST:
        return { ...state, loading: true };
      case types.GET_PRODUCT_DETAILS_SUCCESS:
        //console.log("syuda smotry",action.payload)
        return { ...state, detailsData: action.payload, loading: false, error: null };
      case types.GET_PRODUCT_DETAILS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export default productDetailsReducer;
