import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { GlobalStyles, Colors } from '@helpers'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Fonts from '@helpers/Fonts';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/FontAwesome';


function ProductView(props) {
    const data = props.data;
    const thumbnail = props.thumbnail
    const thumbnail_path = props.thumbnail_path
    const image =   thumbnail_path + "/" + thumbnail
    const addToWishlist = async (id) => {
        props.addToWishlist(id);
        console.log('добавлен', id)
    }

    const removeFromWishlist = async (id) => {
        const index = wishlistArr.indexOf(id);
        const wishlist_id = props.wishlistArray[index].wishlist_id;
        props.removeFromWishlist(wishlist_id);
        
    }

    //console.log('immm', data.thumbnail_path + "/" + data.thumbnail)
    const wishlistArr = props.wishlistArray ? props.wishlistArray.map(item => item.productid) : null;
    const wishlistID = props.wishlistArray ? props.wishlistArray.map(item => item.wishlist_id) : null;
    return (
        <TouchableOpacity style={styles.productBox} onPress={() => props.navToDetail(data)}>

            <View style={[styles.imageView, { backgroundColor: props.imageViewBg ? props.imageViewBg : Colors.light_white }]}>
                <Image source={{ uri: image}} style={styles.image}
                ></Image>
            </View>
            <View style={styles.infromationView}>
                <View style={styles.starView}>
                    <Stars
                        default={data.rating}
                        count={5}
                        half={true}
                        starSize={45}
                        fullStar={<Icon name={'star'} size={11} style={[styles.myStarStyle]} />}
                        emptyStar={<Icon name={'star-o'} size={11} style={[styles.myStarStyle, styles.myEmptyStarStyle]} />}
                        halfStar={<Icon name={'star-half-empty'} size={11} style={[styles.myStarStyle]} />}
                        disabled={true}
                    />
                </View>
                <Text style={styles.productName} numberOfLines={2}>{data.productname ? data.productname?.ru : ''}</Text>
                <View style={styles.priceView}>
                    <Text style={styles.price}>{data.offerprice ? data.offerprice:data.mainprice} {data.symbol}</Text>
                    <Text style={styles.offerTxt}>{data.offerprice ? data.mainprice + data.symbol:''}</Text>
                </View>
            </View>
            {
                data.out_of_stock && <View style={GlobalStyles.outstockview} >
                    <Text style={GlobalStyles.outofstockTxt}>Нет в наличии</Text>
                </View>
            }
            {
                data.out_of_stock == false && data.new == true &&
                <View style={GlobalStyles.newtextView} >
                    <Text style={GlobalStyles.newTxt}>Новый</Text>
                </View>
            }
            {
                data.offerprice?
                <View style={GlobalStyles.newtextView} >
                        <Text style={GlobalStyles.newTxt}>{'-'+data.off_in_percent + '%'}</Text>
                </View>:
                <></>
            }
            {
                wishlistArr && wishlistArr.length > 0 && wishlistArr.includes(data.productid) ? <TouchableOpacity style={GlobalStyles.FavCircle} onPress={() => removeFromWishlist(data.productid)} >
                    <Icon name="heart" style={GlobalStyles.unFavIcon} color={Colors.white} />
                </TouchableOpacity> : <TouchableOpacity style={GlobalStyles.unFavCircle} onPress={() => addToWishlist(data.productid)}>
                    <Icon name="heart-o" style={GlobalStyles.unFavIcon} color={Colors.secondry_text_color} />
                </TouchableOpacity>
            }

        </TouchableOpacity>

    )
}

export default ProductView;

const styles = StyleSheet.create({
    productBox: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 'auto',
        paddingBottom: hp('1%'),
        width: wp('44%'),
        maxWidth: wp('44%'),
        marginHorizontal: wp('2%'),
        flex: 0.5,
        backgroundColor: Colors.white,
        marginBottom: wp('3%'),
        borderRadius: wp('2%'),
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 0.4 },
        shadowOpacity: 0.30,
        shadowRadius: 3,
        elevation: 6,
        flexDirection: 'column'
    },
    imageView: {
        flex: 0.63,
        backgroundColor: Colors.light_white,
        width: wp('30.2%'),
        borderTopStartRadius: wp('2%'),
        borderTopEndRadius: wp('2%')
    },
    image: {
        resizeMode: 'cover',
        alignSelf: 'center',
        height: hp('16%'),
        width: wp('40%')
    },
    infromationView: {
        flex: 0.37,
        width: wp('35%'),
    },
    starView: {
        alignItems: 'flex-start',
        marginVertical: hp('0.6%'),
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
    productName: {
        color: Colors.secondry_text_color,
        fontFamily: Fonts.Font_Semibold,
        fontSize: wp('3.5%')
    },
    priceView: {
        flex: 1,
        marginTop: hp('0.6%'),
        flexDirection: 'row',
    },
    price: {
        flex: 0.30,
        color: Colors.black,
        fontFamily: Fonts.Font_Bold,
        fontSize: wp('3%')
    },
    offerTxt: {
        textDecorationLine:'line-through',
        flex: 0.70,
        textAlign: 'right',
        color: Colors.link_color,
        fontFamily: Fonts.Font_Semibold,
        fontSize: wp('2.8%'),
        textTransform: 'uppercase'
    }

});