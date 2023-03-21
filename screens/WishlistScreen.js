import React, { useEffect } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
} from "react-native";
import { connect } from 'react-redux';
import { Button } from 'native-base';
import {
    OtrixContainer, OtrixHeader, OtrixContent, OtirxBackButton, WishlistComponent
} from '@component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { GlobalStyles, Colors } from '@helpers';
import { _roundDimensions } from '@helpers/util';
import Icon from 'react-native-vector-icons/Ionicons';
import Fonts from "@helpers/Fonts";
import { addToWishList, getProductDetailsRequest } from '@actions';
import { _getWishlist, _addToWishlist } from "@helpers/FunctionHelper";
import ProductListDummy from '@component/items/ProductListDummy';

function WishlistScreen(props) {
    const [state, setState] = React.useState({ loading: true, noRecord: false, wishlistArr: [] });

    const wishlistSetData = async () => {
        const { wishlistData } = props;
        const {detailsData} = props;
        console.log("PRODUCT", detailsData)
        const  productDetail = detailsData;
        const wishItems = wishlistData
        console.log("WISH_DATA", wishItems)
    
        let noRecord = true;
        let wishlistItems = [];
        if (wishlistData && wishlistData.length > 0) {
            for (const id of wishlistData) {
                // Retrieve product details from some source (e.g. an API or a local data store)
                const product = await productId(id);
                console.log("Product", product)
                wishlistItems.push({
                    name: product.name || "Krevetka",
                    price: product.price || 6000,
                    image: product.image || "https://aress.kz/images/simple_products/gallery/product_gallery_63c161319f7ab.jpg",
                    id: product || " "
                });
            }
            noRecord = false;
            console.log("WISH_LIST", wishlistItems)
        }
    
        setState({ ...state, loading: false, noRecord: noRecord, wishlistArr: wishlistItems })
    }
    
    const productId = async (id)=>{
        props.getProductDetailsRequest(id)
    }
    const onDeleteItem = async (id) => {
        let wishlistData = await _addToWishlist(id);
        props.addToWishList(wishlistData);
        
        wishlistSetData()
    }

    useEffect(() => {
        wishlistSetData()
    }, []);

    const { wishlistArr, loading, noRecord } = state;
    return (
        <OtrixContainer customStyles={{ backgroundColor: Colors.light_white }}>

            {/* Header */}
            <OtrixHeader customStyles={{ backgroundColor: Colors.light_white }}>
                <TouchableOpacity style={GlobalStyles.headerLeft} onPress={() => props.navigation.goBack()}>
                    <OtirxBackButton />
                </TouchableOpacity>
                <View style={[GlobalStyles.headerCenter, { flex: 1 }]}>
                    <Text style={GlobalStyles.headingTxt}>  Wishlist</Text>
                </View>
            </OtrixHeader>

            {/* Content Start from here */}
            <OtrixContent >
                {/* Cart Component Start from here
                                    // <CartView navigation={props.navigation} products={cartProducts} deleteItem={onDeleteItem} decrementItem={decrement} incrementItem={increment} />

                */}
                {
                    !noRecord && !loading &&
                    <WishlistComponent navigation={props.navigation} products={wishlistArr} deleteItem={onDeleteItem} />
                }
                {
                    !loading && noRecord && <View style={styles.noRecord}>
                        <Text style={styles.emptyTxt}>Wishlist is empty!</Text>
                        <Button
                            size="lg"
                            variant="solid"
                            bg={Colors.themeColor}
                            style={[GlobalStyles.button, { marginHorizontal: wp('2%'), marginBottom: hp('2.5%'), marginTop: hp('1%') }]}
                            onPress={() => props.navigation.navigate('HomeScreen')}
                        >
                            <Text style={GlobalStyles.buttonText}><Icon name={"md-heart"} color={Colors.white} style={{ fontSize: wp('4.5%') }} />  Add Now</Text>
                        </Button>
                    </View>
                }
            </OtrixContent>


        </OtrixContainer >
    )
}

function mapStateToProps(state) {
    return {
        cartData: state.cart.cartData,
        wishlistData: state.wishlist.wishlistData,
        detailsData: state.product.detailsData,
    }
}



export default connect(mapStateToProps, { addToWishList })(WishlistScreen);

const styles = StyleSheet.create({
    noRecord: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: hp('25%')
    },
    emptyTxt: {
        fontSize: wp('6%'),
        marginVertical: hp('1.5%'),
        fontFamily: Fonts.Font_Semibold,
        color: Colors.secondry_text_color
    }
});