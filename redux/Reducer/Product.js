import { types } from "../Action/actionTypes";
import { logfunction } from "../../helpers/FunctionHelper";

const initialState = {
    detailsData: {
        "product": {
            "product_id": 15,
            "product_name": {
                "ru": "Кастрюли"
            },
            "brand_name": "Blueline",
            "store_name": "Ghostrrr",
            "store_logo_path": "https://aress.kz/images/store",
            "store_logo": "16602296808c95823dd0579c60baca00e0f1afa357 (2).png",
            "store_id": 1,
            "key_features": [],
            "description": {
                "ru": "Железные кастрюли"
            },
            "tags": null,
            "rating": 0,
            "reviews": 0,
            "attributes": [],
            "videoThumbnail": null,
            "videoUrl": null,
            "total_comments": 0,
            "total_reviews": 0,
            "videoThumburl": "https://aress.kz/images/videothumbnails",
            "thumbnail_path": "https://aress.kz/images/simple_products",
            "images_path": "https://aress.kz/images/simple_products/gallery",
            "common_variant": [],
            "combinations": [
                {
                    "id": 15,
                    "mainprice": 1299,
                    "offerprice": 1099,
                    "images": [
                        {
                            "image": "product_gallery_63c161319f7ab.jpg"
                        }
                    ],
                    "pricein": "KZT",
                    "symbol": "₸",
                    "weight": "0g",
                    "stock": 100,
                    "off_in_percent": 0,
                    "minorderlimit": 1,
                    "maxorderlimit": 1,
                    "default": "Yes",
                    "variants": []
                }
            ],
            "tax_info": "Inclusive of all taxes",
            "other_services": [],
            "warranty": null,
            "special_services": [
                {
                    "heading": "Fast Delivery",
                    "description": "With our partnered courier services your product will be delivered fast"
                },
                {
                    "heading": "Quality Assurance",
                    "description": "6 Quality checks your product quality is 100% trustable"
                },
                {
                    "heading": "Purchase Protection",
                    "description": "All your purcahse are secured from our leading payment gateways."
                }
            ],
            "comments": [],
            "viewallcomment": "View all (0) comments",
            "ratingState": {
                "overallrating": 0,
                "price": 0,
                "quality": 0,
                "value": 0
            },
            "ratingsAndreviews": [],
            "viewallreview": "View all (0) reviews",
            "is_in_wishlist": false
        },
        "relatedProducts": null,
        "hotdeals": []
    }
}
export default (state = initialState, action) => {
    //    logfunction("STATE LOG ====", action)
    switch (action.type) {
        case types.GET_PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,
                detailsData: action.payload.data
            }
        default:
            return state;
    }
}
