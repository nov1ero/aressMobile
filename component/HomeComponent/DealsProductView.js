import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { GlobalStyles, Colors } from '@helpers'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Fonts from '@helpers/Fonts';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/FontAwesome';

function DealsProductView(props) {
    const data = props.data;
    //console.log("__DATA__", data)
    const wishlistArr = props.wishlistData.productid ? props.wishlistData.productid : null;
    //console.log("__wishlistArr__", wishlistArr)

    return (
        <TouchableOpacity style={styles.productBox} onPress={() => props.navToDetail(data)}>
            <View style={styles.imageView}>
                <Image source={data.image} style={styles.image}></Image>
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
                <Text style={styles.productName} numberOfLines={2}>{data.name}</Text>
                <View style={styles.priceView}>
                    {
                        <View style={styles.SpcialView}>
                            <Text style={styles.price}>{data.specialPrice} </Text>
                            <Text style={styles.originalPrice}>{data.price}</Text>
                        </View>
                    }
                    <Text style={styles.offerTxt}>{data.off}</Text>
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
                wishlistArr && wishlistArr.length > 0 && wishlistArr.includes(data.id) ? <TouchableOpacity style={GlobalStyles.FavCircle} onPress={() => props.addToWishlist(data.id)} >
                    <Icon name="heart" style={GlobalStyles.FavIcon} color={Colors.white} />
                </TouchableOpacity> : <TouchableOpacity style={GlobalStyles.unFavCircle} onPress={() => props.addToWishlist(data.id)}>
                    <Icon name="heart-o" style={GlobalStyles.unFavIcon} color={Colors.secondry_text_color} />
                </TouchableOpacity>
            }

        </TouchableOpacity>

    )
}

export default DealsProductView;

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
        flex: 0.60,
        backgroundColor: Colors.light_white,
        width: wp('42.2%'),
        borderTopStartRadius: wp('2%'),
        borderTopEndRadius: wp('2%')
    },
    image: {
        resizeMode: 'contain',
        alignSelf: 'center',
        height: hp('16%'),
        width: wp('30%')
    },
    infromationView: {
        flex: 0.40,
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
    SpcialView: {
        flex: 0.30,
        flexDirection: 'row'
    },
    price: {
        color: Colors.black,
        fontFamily: Fonts.Font_Bold,
        fontSize: wp('4%')
    },
    originalPrice: {
        color: Colors.secondry_text_color,
        fontFamily: Fonts.Font_Bold,
        fontSize: wp('3%'),
        textDecorationLine: 'line-through'
    },
    offerTxt: {
        flex: 0.70,
        textAlign: 'right',
        color: Colors.link_color,
        fontFamily: Fonts.Font_Semibold,
        fontSize: wp('2.8%'),
        textTransform: 'uppercase'
    }

});