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
import { addToWishList, removeFromWishlist } from '@actions';
import MatIcon from 'react-native-vector-icons/FontAwesome5';
import { marginLeft, marginRight } from "styled-system";
// import { _getWishlist, _addToWishlist } from "@helpers/FunctionHelper";

function WishlistScreen(props) {
    const [state, setState] = React.useState({ loading: true, noRecord: false, wishlistArr: [], wishlistData: null });
    const { wishlistData } = props;
    
    
    const wishlistSetData = async () => {
        console.log("WISH_DATA", wishlistData)
    
        let noRecord = true;
        let wishlistItems = [];
        wishlistData && wishlistData.length > 0 && wishlistData.forEach(function (item, index) {
            wishlistItems.push({
                wishlist_id: item.wishlist_id? item.wishlist_id: index,
                name: item.productname.ru? item.productname.ru : "Something went wrong",
                price: item.offerprice?item.offerprice: item.mainprice,
                image: item.thumb_path+"/"+item.thumbnail? item.thumb_path+"/"+item.thumbnail : "https://t4.ftcdn.net/jpg/03/08/92/49/360_F_308924911_jsWAfFOqdSGglzvF7zcNcXIo06eS7Wch.jpg",
                id: item.productid
            });
    })
            noRecord = false;
            console.log("WISH_LIST", wishlistItems)

    
        setState({ ...state, loading: false, noRecord: noRecord, wishlistArr: wishlistItems })
    
    }

    const onDeleteItem = async (id) => {
        await props.removeFromWishlist(id);
        wishlistSetData()
    }
      

    useEffect(() => {

        wishlistSetData()
    }, [wishlistData]);

    const { wishlistArr, loading, noRecord } = state;
    return (
        <OtrixContainer customStyles={{ backgroundColor: Colors.light_white }}>

            {/* Header */}
            <OtrixHeader customStyles={{ backgroundColor: Colors.light_white }}>
                <TouchableOpacity style={GlobalStyles.headerLeft} onPress={() => props.navigation.goBack()}>
                    <OtirxBackButton />
                </TouchableOpacity>
                <View style={[GlobalStyles.headerCenter, { flex: 1 }]}>
                    <Text style={GlobalStyles.headingTxt}>  Избранное</Text>
                </View>
            </OtrixHeader>

            {/* Content Start from here */}
            <OtrixContent >
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
const mapDispatchToProps = (dispatch) => {
    return {
      removeFromWishlist: (id) => dispatch(removeFromWishlist(id))
    };
  };



export default connect(mapStateToProps, mapDispatchToProps)(WishlistScreen);

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
    },
    trash:{
        marginRight: 50,
        fontSize: 15
    }
});