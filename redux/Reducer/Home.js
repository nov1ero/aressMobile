import { types } from "../Action/actionTypes";
import { logfunction } from "../../helpers/FunctionHelper";

const initialState = {
    homeData: {
        "appheaders": {
            "sort": 8,
            "name": "appheader",
            "logopath": "https://aress.kz/images/genral",
            "logo": "mainlogo.png",
            "current_lang": "en",
            "current_time": "2023-01-13 09:50:12"
        },
        "categories": {
            "sort": 7,
            "name": "categories",
            "layout": "vertical",
            "enable": true,
            "path": "https://aress.kz/images/category",
            "items": [
                {
                    "id": 2,
                    "title": {
                        "en": "Электроника"
                    },
                    "icon": "fa-camera-retro",
                    "image": "apple_logo_PNG19688.png",
                    "url": "https://aress.kz/api/category/2"
                },
                {
                    "id": 3,
                    "title": {
                        "en": "Одежда"
                    },
                    "icon": "fa fa-universal-access",
                    "image": "1579088345Denim overall skirt 04-01.jpg",
                    "url": "https://aress.kz/api/category/3"
                },
                {
                    "id": 4,
                    "title": {
                        "en": "Часы"
                    },
                    "icon": "fa-clock-o",
                    "image": "1579088418GEN 5 SMARTWATCH - THE CARLYLE HR BLACK SILICONE 03-03.jpg",
                    "url": "https://aress.kz/api/category/4"
                },
                {
                    "id": 1,
                    "title": {
                        "en": "Мебель"
                    },
                    "icon": "fa-database",
                    "image": "1579087936Faye Floor Lamp, Brass and Marble 05-02.jpg",
                    "url": "https://aress.kz/api/category/1"
                },
                {
                    "id": 5,
                    "title": {
                        "en": "Книги"
                    },
                    "icon": "fa-book",
                    "image": "1593522262top-view-back-school-supplies-with-globe-book_23-2148587140.jpg",
                    "url": "https://aress.kz/api/category/5"
                },
                {
                    "id": 6,
                    "title": {
                        "ru": "Кухня"
                    },
                    "icon": "fa fa-apple",
                    "image": null,
                    "url": "https://aress.kz/api/category/6"
                }
            ]
        },
        "specialoffers": {
            "sort": 6,
            "layout": "vertical",
            "name": "specialoffers",
            "enable": true,
            "path": "https://aress.kz/variantimages/thumbnails",
            "items": []
        },
        "flashdeals": {
            "status": false,
            "deals": [],
            "path": "https://aress.kz/images/flashdeals"
        },
        "sliders": null,
        "TwoEqualAdvertise": null,
        "hotdeals": [],
        "featuredProducts": [],
        "ThreeEqualAdvertise": null,
        "topCatgories": {
            "sort": 4,
            "name": "topcategories",
            "layout": "vertical",
            "enable": true,
            "path": "https://aress.kz/images/category",
            "items": [
                {
                    "id": 2,
                    "name": {
                        "en": "Электроника"
                    },
                    "description": {
                        "en": "Гаджет как устройство или инструмент, который часто является новым или оригинальным. Смартфоны и планшеты — самые очевидные примеры электронных гаджетов. ... Другие примеры электронных гаджетов включают устройства для чтения электронных книг, умные часы, цифровые фитнес-трекеры, устройства GPS и видеоигровые автоматы."
                    },
                    "image": "apple_logo_PNG19688.png",
                    "icon": "fa-camera-retro",
                    "url": "https://aress.kz/api/category/2"
                }
            ]
        },
        "SingleAdvertise": null,
        "brands": [
            {
                "id": 1,
                "name": "Hot foil",
                "image": "1606197753brand1.png",
                "image_path": "https://aress.kz/images/brands",
                "url": "https://aress.kz/brands/1/products",
                "sale_text": null
            },
            {
                "id": 2,
                "name": "Blueline",
                "image": "1606197771brand3.png",
                "image_path": "https://aress.kz/images/brands",
                "url": "https://aress.kz/brands/2/products",
                "sale_text": null
            },
            {
                "id": 3,
                "name": "Your Logo",
                "image": "1606197795brand5.png",
                "image_path": "https://aress.kz/images/brands",
                "url": "https://aress.kz/brands/3/products",
                "sale_text": null
            },
            {
                "id": 4,
                "name": "Cape racer",
                "image": "1606197814brand6.png",
                "image_path": "https://aress.kz/images/brands",
                "url": "https://aress.kz/brands/4/products",
                "sale_text": null
            },
            {
                "id": 5,
                "name": "Market D",
                "image": "1606209428b-logo3.png",
                "image_path": "https://aress.kz/images/brands",
                "url": "https://aress.kz/brands/5/products",
                "sale_text": null
            }
        ],
        "TwoNonEqualAdvertise": null,
        "blogs": {
            "sort": 2,
            "name": "blogs",
            "layout": "vertical",
            "enable": true,
            "path": "https://aress.kz/images/blog",
            "items": [
                {
                    "title": {
                        "en": "Unique UI"
                    },
                    "des": {
                        "en": "Sell like an over-hyped sales pitch"
                    },
                    "author": {
                        "en": "John"
                    },
                    "image": "1605787994blog_big_03.jpg",
                    "created_on": "Nov 19th, 2020",
                    "url": "https://aress.kz/api/blog/post/unique-ui"
                },
                {
                    "title": {
                        "en": "Build Upon Your Brand"
                    },
                    "des": {
                        "en": "Best Ecommerce Portal"
                    },
                    "author": {
                        "en": "admin"
                    },
                    "image": "1605787631blog_big_02.jpg",
                    "created_on": "Nov 19th, 2020",
                    "url": "https://aress.kz/api/blog/post/build-upon-your-brand"
                },
                {
                    "title": {
                        "en": "Online Shopping"
                    },
                    "des": {
                        "en": "Some Demo Blog Description here...."
                    },
                    "author": {
                        "en": "Demo"
                    },
                    "image": "1605787952blog_big_01.jpg",
                    "created_on": "Nov 19th, 2020",
                    "url": "https://aress.kz/api/blog/post/online-shopping"
                }
            ]
        },
        "newProducts": [
            {
                "tabid": "0",
                "tabname": {
                    "en": "ALL"
                },
                "products": [
                    {
                        "productid": 14,
                        "variantid": 0,
                        "type": "s",
                        "productname": {
                            "ru": "Посуда"
                        },
                        "description": {
                            "ru": "Тарелки, керамика"
                        },
                        "mainprice": 568,
                        "offerprice": 0,
                        "pricein": "KZT",
                        "symbol": "₸",
                        "rating": 0,
                        "review": 0,
                        "thumbnail": "pngtree-hd-handmade-white-ceramic-plate-product-drawing-picture-image_1705891.jpg",
                        "thumbnail_path": "https://aress.kz/images/simple_products",
                        "off_in_percent": 0,
                        "tax_info": "Inclusive of all taxes",
                        "tag_text": "",
                        "tag_text_color": "#000000",
                        "tag_bg_color": "#000000",
                        "is_in_wishlist": false
                    },
                    {
                        "productid": 15,
                        "variantid": 0,
                        "type": "s",
                        "productname": {
                            "ru": "Кастрюли"
                        },
                        "description": {
                            "ru": "Железные кастрюли"
                        },
                        "mainprice": 1299,
                        "offerprice": 1099,
                        "pricein": "KZT",
                        "symbol": "₸",
                        "rating": 0,
                        "review": 0,
                        "thumbnail": "nabor-posudy-berlinger-haus-bh-6022-moonlight-edition.jpg",
                        "thumbnail_path": "https://aress.kz/images/simple_products",
                        "off_in_percent": 15,
                        "tax_info": "Inclusive of all taxes",
                        "tag_text": "",
                        "tag_text_color": "#000000",
                        "tag_bg_color": "#000000",
                        "is_in_wishlist": false
                    },
                    {
                        "productid": 16,
                        "variantid": 0,
                        "type": "s",
                        "productname": {
                            "ru": "Приборы"
                        },
                        "description": {
                            "ru": "Деревяные приборы"
                        },
                        "mainprice": 299,
                        "offerprice": 259,
                        "pricein": "KZT",
                        "symbol": "₸",
                        "rating": 0,
                        "review": 0,
                        "thumbnail": "plastic-free-disposable-eating-utensils_651171-852.jpg",
                        "thumbnail_path": "https://aress.kz/images/simple_products",
                        "off_in_percent": 13,
                        "tax_info": "Inclusive of all taxes",
                        "tag_text": "",
                        "tag_text_color": "#000000",
                        "tag_bg_color": "#000000",
                        "is_in_wishlist": false
                    },
                    {
                        "productid": 17,
                        "variantid": 0,
                        "type": "s",
                        "productname": {
                            "ru": "Керамическая посуда"
                        },
                        "description": {
                            "ru": "Керамические тарелки"
                        },
                        "mainprice": 3299,
                        "offerprice": 0,
                        "pricein": "KZT",
                        "symbol": "₸",
                        "rating": 0,
                        "review": 0,
                        "thumbnail": "0db489be0879d8a0b856df8cb3f2fca1.jpg",
                        "thumbnail_path": "https://aress.kz/images/simple_products",
                        "off_in_percent": 0,
                        "tax_info": "Inclusive of all taxes",
                        "tag_text": "",
                        "tag_text_color": "#000000",
                        "tag_bg_color": "#000000",
                        "is_in_wishlist": false
                    }
                ]
            },
            {
                "tabid": 1,
                "tabname": {
                    "en": "Мебель"
                }
            },
            {
                "tabid": 2,
                "tabname": {
                    "en": "Электроника"
                }
            },
            {
                "tabid": 3,
                "tabname": {
                    "en": "Одежда"
                }
            },
            {
                "tabid": 4,
                "tabname": {
                    "en": "Часы"
                }
            },
            {
                "tabid": 5,
                "tabname": {
                    "en": "Книги"
                }
            }
        ]
    }
}
export default (state = initialState, action) => {
    //    logfunction("STATE LOG ====", action)
    switch (action.type) {
        case types.GET_HOME_SUCCESS:
            return {
                ...state,
                homeData: action.payload.data
            }
        default:
            return state;
    }
}
