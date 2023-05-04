import React, { useEffect, } from "react";
import {
    View,
    ActivityIndicator,
    TouchableOpacity,
    Text,
    StyleSheet,
    Modal,
    // Badge, ScrollView, Button,
    Image
} from "react-native";
import { connect } from 'react-redux';
import {
    OtrixContainer, OtrixContent, OtrixDivider, OtirxBackButton, OtrixLoader, FeaturedProduct, SizeContainerComponent, RatingComponent
} from '@component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { GlobalStyles, Colors } from '@helpers';
import { _roundDimensions } from '@helpers/util';
import ProductListDummy from '@component/items/ProductListDummy';
import { bottomCart, checkround2, close } from '@common';
import { SliderBox } from 'react-native-image-slider-box';
import { Badge, ScrollView, Button } from "native-base";
import Fonts from "../helpers/Fonts";
import { addToCart, addToWishList, removeFromWishlist, getProductDetailsRequest } from '@actions';
import Icon from 'react-native-vector-icons/AntDesign'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import ImageViewer from 'react-native-image-zoom-viewer';
import Stars from 'react-native-stars';

const COLORS = ['#3ad35c', Colors.themeColor, '#efcd19', '#ff1e1a'];

function ProductDetailScreen(props) {
    const { detailsData, loading, wishlistData, wishlistArr, homeData } = props;
    const  productDetail = detailsData.product;
    console.log("DETData", productDetail)
    const combinationsProduct = productDetail.combinations
    // console.log("COMBPRO", productDetail.product_name)
    const  productImages = productDetail?(combinationsProduct[0].images.map(i => (productDetail.images_path + '/' + i.image))):[];
    const [state, setState] = React.useState({ loading: true, productCount: 1, fetchCart: false, selectedColor: 1,productImages:[], showZoom: false, msg: '' });
    const { selectedColor, productCount, showZoom, msg } = state;
    const max_qty = combinationsProduct[0].maxorderlimit



    

    const addToWish = async (id) => {
        props.addToWishList(id);
    }

    const removeFromWishlist = async (id) => {
        const index = wishlistArr.indexOf(id);
        const wishlist_id = wishlistData[index].wishlist_id;
        props.removeFromWishlist(wishlist_id);
        
    }

    const showOutofStock = () => {
        setTimeout(() => {
            setState({ ...state, msg: '' });
        }, 2500);
        setState({ ...state, msg: 'Нет в наличии' });
    }

    const _addToCart = async () => {
        setState({ ...state, fetchCart: true, msg: '' })
        props.addToCart(
            productDetail.product_id, 
            productCount, 
            max_qty
            )
    }
    
    useEffect(() => {
        const { id } = props.route.params;
        props.getProductDetailsRequest(id);
        setState({
            ...state,
            productImages: productDetail.combinations[0].images.map(i => (productDetail.images_path + '/' + i.image))
        })
    }, [productDetail.images_path]);


    //console.log('KARTINKI', productImages)
    
    let zoomImages = [];
    
    useEffect(() => {
        const { id } = props.route.params;

        // let findProduct = ProductListDummy.filter(p => p.id == id);

        //zoom images
        productDetail.combinations[0].images.length > 0 && productDetail.combinations[0].images.forEach(function (item) {
            zoomImages.push({
                url: '',
                props: {
                    source: item
                }
            })
        });

        let loadPage = setTimeout(() => setState({ ...state, loading: false, combinationsProduct: productDetail.combinations[0], zoomImages }), 500);

        return () => {
            clearTimeout(loadPage);
        };
    }, []);
    const { cartCount } = props;
    return (
        <OtrixContainer customStyles={{ backgroundColor: Colors.light_white }}>

            {
                loading ? <OtrixLoader /> : <>

                    {/* Product Detail View */}
                    {
                        productImages.length?
                        <View style={styles.container} >
                            <SliderBox images={productImages}
                                onCurrentImagePressed={index => setState({ ...state, showZoom: true })}
                                dotColor={Colors.themeColor}
                                inactiveDotColor="#90A4AE"
                                sliderBoxHeight={hp('35%')}
                                paginationBoxVerticalPadding={20}
                                autoplay={true}
                                ImageComponentStyle={{ borderRadius: 15, width: '80%', marginTop: 5, }}
                                circleLoop={true}
                                resizeMode={'cover'}
                                dotStyle={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: 15,
                                    marginHorizontal: 0,
                                    padding: 0,
                                    margin: 0
                                }}
                            />
                        </View>:<></>
                    }

                    {/* Header */}
                    <View style={{ flexDirection: 'row', position: 'absolute', marginTop: hp('2%') }}>
                        <TouchableOpacity style={[GlobalStyles.headerLeft, { zIndex: 999999999, flex: 0.90, alignItems: 'flex-start' }]} onPress={() => props.navigation.goBack()}>
                            <OtirxBackButton />
                        </TouchableOpacity>
                        <TouchableOpacity style={[GlobalStyles.headerRight, { zIndex: 999999999, flex: 0.10, backgroundColor: 'transparent', alignItems: 'center', alignSelf: 'flex-end' }]} onPress={() => props.navigation.navigate('CartScreen')}>
                            <Image source={bottomCart} style={styles.menuImage} />
                            {
                                cartCount > 0 && <Badge style={[GlobalStyles.badge, {
                                    left: wp('4.4%'),
                                    top: - hp('1.4%'),
                                    height: cartCount > 9 ? 28 : 24,
                                    width: cartCount > 9 ? 28 : 24,
                                    backgroundColor: Colors.white
                                }]}>
                                    <Text style={[GlobalStyles.badgeText, { color: Colors.themeColor, fontSize: cartCount > 9 ? wp('2.5%') : wp('3%'), }]}>{cartCount}</Text>
                                </Badge>
                            }

                        </TouchableOpacity>
                    </View>

                    {/* Content Start from here */}
                    <OtrixContent customStyles={styles.productDetailView}>
                        <OtrixDivider size={'lg'} />
                        <ScrollView style={styles.childView} showsVerticalScrollIndicator={false}>

                            {/* Color And Heart Icon */}
                            <View style={styles.colorView}>
                                {/* Color */}
                                {/* <View style={styles.colorContainer}>
                                    <Text style={styles.containerTxt}>Цвета:</Text>
                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: wp('1%') }}>

                                        {
                                            COLORS.map((item, index) =>
                                                <TouchableOpacity style={[styles.box, { backgroundColor: item }]} onPress={() => setState({ ...state, selectedColor: index })}>
                                                    {index == selectedColor && <Image source={checkround2} style={styles.colorimageView} />}
                                                </TouchableOpacity>
                                            )
                                        }

                                        <TouchableOpacity style={{ justifyContent: 'center' }}>
                                            <Icon name="right" style={styles.arrowRight} ></Icon>
                                        </TouchableOpacity>

                                    </View>
                                </View> */}

                                {/* Heart Icon */}
                                <View style={styles.heartIconView}>
                                    {
                                        wishlistArr.includes(productDetail.product_id) ? <TouchableOpacity onPress={() => removeFromWishlist(productDetail.product_id)} style={[GlobalStyles.FavCircle, { left: wp('12%'), top: 0 }]} >
                                            <FontAwesomeIcon name="heart" style={GlobalStyles.FavIcon} color={Colors.white} />
                                        </TouchableOpacity> : <TouchableOpacity onPress={() => addToWish(productDetail.product_id)} style={[GlobalStyles.unFavCircle, { left: wp('12%'), top: 0 }]} >
                                            <FontAwesomeIcon name="heart-o" style={[GlobalStyles.unFavIcon, { fontSize: wp('3.8%') }]} color={Colors.secondry_text_color} />
                                        </TouchableOpacity>
                                    }
                                </View>

                            </View>

                            <OtrixDivider size={'md'} />

                            {/* Name Container*/}
                            <View style={styles.subContainer}>
                                <Text style={styles.headingTxt}>{productDetail.product_name.ru ? productDetail.product_name.ru:''}</Text>
                                <Text style={[styles.stock, {
                                    color: !productDetail.out_of_stock ? '#5ddb79' : '#fe151b'
                                }]}>{!productDetail.out_of_stock ? 'В наличии' : 'Не в наличии'}</Text>
                            </View>
                            <OtrixDivider size={'md'} />

                            {/* Price Container*/}
                            <View style={styles.subContainer}>
                                <Text style={styles.productPrice}>{productDetail.combinations[0]?.mainprice}</Text>
                                {/* <View style={styles.starView}>
                                    <Stars
                                        default={productDetail.rating}
                                        count={5}
                                        half={true}
                                        starSize={45}
                                        fullStar={<FontAwesomeIcon name={'star'} size={wp('3.5%')} style={[styles.myStarStyle]} />}
                                        emptyStar={<FontAwesomeIcon name={'star-o'} size={wp('3.5%')} style={[styles.myStarStyle, styles.myEmptyStarStyle]} />}
                                        halfStar={<FontAwesomeIcon name={'star-half-empty'} size={wp('3.5%')} style={[styles.myStarStyle]} />}
                                        disabled={true}
                                    />
                                    <Text style={styles.reviewTxt}>({productDetail.reviews} Отзывов)</Text>
                                </View> */}
                            </View>
                            <OtrixDivider size={'lg'} />
                            <View style={GlobalStyles.horizontalLine}></View>
                            <OtrixDivider size={'md'} />

                            {/* Sizes Container*/}
                            {/* <SizeContainerComponent productData={productDetail} /> */}

                            <OtrixDivider size={'md'} />

                            {/* Description Container*/}
                            <Text style={[styles.headingTxt, { fontSize: wp('3.8%') }]}>Описание</Text>
                            <OtrixDivider size={'sm'} />
                            <Text style={styles.description}>{productDetail.description['ru'] ? productDetail.description['ru']:''}</Text>
                            <OtrixDivider size={'md'} />
                            <View style={GlobalStyles.horizontalLine}></View>

                            {/* Rating Container*/}
                            {/* <RatingComponent productData={productDetail} /> */}

                            {/* Similar Product Component */}
                            <FeaturedProduct featuredProducts={homeData.featuredProducts} navigation={props.navigation} wishlistArr={wishlistData} addToWishlist={addToWish} removeFromWishlist={removeFromWishlist}/>

                        </ScrollView>
                    </OtrixContent>

                    {/* Zoom image */}
                    {/* <Modal visible={showZoom}
                        transparent={true}>
                        <ImageViewer imageUrls={zoomImages}
                            saveToLocalByLongPress={false}
                            backgroundColor={Colors.light_white}
                            renderIndicator={
                                (currentIndex, allSize) => {
                                    return (
                                        <View style={styles.pageindexview}>
                                            <TouchableOpacity onPress={() => setState({ ...state, showZoom: false })} style={{ padding: 8 }}>
                                                <Image square source={close} style={styles.cancleIcon} />
                                            </TouchableOpacity>
                                            <Text style={styles.pageindextext}>{currentIndex} / {allSize}</Text>
                                        </View>
                                    );
                                }
                            }
                        />
                    </Modal> */}

                    {/* Bottom View */}
                    <View style={styles.footerView}>
                        <Button
                            size="md"
                            variant="solid"
                            bg={Colors.themeColor}
                            style={[GlobalStyles.button, { flex: 0.70, marginHorizontal: wp('2%') }]}
                            onPress={() => !productDetail.out_of_stock ? _addToCart() : showOutofStock()}
                        >
                            <Text style={GlobalStyles.buttonText}>Добавить в корзину</Text>
                        </Button>
                        <View style={styles.countBox}>
                            <Text style={styles.countTxt}>{productCount}</Text>
                            <View style={styles.arrowContainer}>
                                <TouchableOpacity style={{ flex: 0.50 }} onPress={() => setState({ ...state, productCount: productCount + 1 })}>
                                    <MaterialIconsIcon name="keyboard-arrow-up" style={styles.plusminusArrow} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flex: 0.50 }} onPress={() => setState({ ...state, productCount: productCount > 1 ? productCount - 1 : 1 })}>
                                    <MaterialIconsIcon name="keyboard-arrow-down" style={styles.plusminusArrow} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </>
            }
        </OtrixContainer >
    )
}

function mapStateToProps(state) {
    return {
        detailsData: state.product.detailsData,
        loading: state.product.loading,
        cartCount: state.cart.cartCount,
        wishlistArr: state.wishlist.wishlistArr,
        wishlistData: state.wishlist.wishlistData,
        homeData: state.home.homeData
    }
}

export default connect(mapStateToProps, { addToCart, addToWishList, removeFromWishlist, getProductDetailsRequest })(ProductDetailScreen);

const styles = StyleSheet.create({
    productDetailView: {
        backgroundColor: Colors.white,
        marginHorizontal: 0,
        borderTopRightRadius: wp('13%'),
        borderTopLeftRadius: wp('13%')
    },
    container: {
        height: hp('35%'),
        position: 'relative',
        backgroundColor: Colors.light_white,
        zIndex: 99
    },
    childView: {
        marginHorizontal: wp('5%'),
        paddingBottom: hp('1.8%')
    },
    menuImage: {
        width: wp('6%'),
        height: hp('6%'),
        resizeMode: 'contain',
        tintColor: Colors.themeColor
    },
    colorView: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1
    },
    colorContainer: {
        flex: 0.75,
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerTxt: {
        fontSize: wp('4%'),
        fontFamily: Fonts.Font_Reguler,
        color: Colors.secondry_text_color
    },
    box: {
        height: hp('3.5%'),
        width: wp('8%'),
        flexDirection: 'row',
        marginHorizontal: wp('2%'),
        backgroundColor: Colors.white,
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: Colors.light_gray,
        borderWidth: 1,
        alignItems: 'center'
    },
    borderBox: {
        borderColor: Colors.themeColor,
        borderWidth: 1,
    },
    colorimageView: {
        height: hp('2%'),
        width: wp('4%'),
        borderRadius: 50,
        marginHorizontal: wp('1%'),
    },
    arrowRight: {
        fontSize: wp('3.5%'), textAlign: 'center', textAlignVertical: 'center', color: Colors.text_color
    },
    heartIconView: {
        flex: 0.25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headingTxt: {
        fontSize: wp('4.5%'),
        fontFamily: Fonts.Font_Bold,
        textAlignVertical: 'center',
        flex: 0.80
    },
    subContainer: {
        flexDirection: 'row',
    },
    stock: {
        flex: 0.20,
        fontSize: wp('3%'),
        textAlignVertical: 'center',
        fontFamily: Fonts.Font_Semibold,
        textAlign: 'right'
    },
    productPrice: {
        fontSize: wp('5.5%'),
        fontFamily: Fonts.Font_Bold,
        textAlignVertical: 'center',
        color: Colors.themeColor,
        flex: 0.80
    },
    starView: {
        flex: 0.20
    },
    myStarStyle: {
        color: '#ffd12d',
        backgroundColor: 'transparent',
        marginHorizontal: 1,
        textShadowRadius: 1,
    },
    myEmptyStarStyle: {
        color: 'gray',
    },
    reviewTxt: {
        fontFamily: Fonts.Font_Reguler,
        fontSize: wp('2.5%'),
        marginTop: hp('0.3%'),
        textAlign: 'center',
        color: Colors.secondry_text_color
    },
    description: {
        fontSize: wp('3.5%'),
        fontFamily: Fonts.Font_Reguler,
        lineHeight: hp('2.4%'),
        color: Colors.secondry_text_color
    },


    footerView: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        height: hp('7.5%'),
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 0.4 },
        shadowOpacity: 0.30,
        shadowRadius: 3,
        elevation: 6,
        borderTopColor: Colors.light_gray,
        borderTopWidth: 1
    },
    countBox: {
        backgroundColor: Colors.light_white,
        flexDirection: 'row',
        flex: 0.20,
        height: hp('4.8%'),
        marginHorizontal: wp('1%'),
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 0.4 },
        shadowOpacity: 0.30,
        shadowRadius: 3,
        elevation: 6,
        borderRadius: 5,
        justifyContent: 'center'
    },
    countTxt: {
        fontSize: wp('4.5%'),
        flex: 0.60,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: Colors.text_color,
        fontFamily: Fonts.Font_Semibold

    },
    arrowContainer: {
        flex: 0.40,
        flexDirection: 'column',
    },
    plusminusArrow: {
        fontSize: wp('5.2%'),

    },
    cancleIcon: {
        marginLeft: wp('3%'),
        height: wp('6%'),
        width: wp('6%'),
        tintColor: Colors.black
    },
    pageindexview: {
        position: 'absolute',
        marginTop: wp('4.5%'),
        flexDirection: 'row'
    },
    pageindextext: {
        width: wp('15%'),
        textAlign: 'center',
        fontSize: wp('4.5%'),
        color: Colors.black_text,
        marginHorizontal: wp('34%')
    },
});