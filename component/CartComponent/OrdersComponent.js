import React from 'react';
import { View, StyleSheet, Text, FlatList, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { OtrixDivider } from '@component';
import Fonts from '@helpers/Fonts';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GlobalStyles, Colors } from '@helpers';
import Icon from 'react-native-vector-icons/MaterialIcons';

function OrdersComponent(props) {
    let products = props.products;


    return (
        <>
            {/* <OtrixDivider size={'md'} /> */}
            {
                products.length > 0 && products.map((item, index) =>
                    <>
                        <View style={styles.cartContent} key={index}>
                            <View style={styles.cartBox} >
                                <View style={styles.imageView}>
                                    <Image source={{uri: "https://cdn-icons-png.flaticon.com/512/5220/5220625.png"}} style={styles.image}
                                    ></Image>
                                </View>
                                <View style={styles.infromationView}>
                                    <View >
                                        <Text style={styles.name}>Идентификатор заказа:{"\n"}{item.order_id}</Text>
                                    </View>
                                    <Text style={styles.orderDate}>Дата заказа: {item.orderDate}</Text>
                                    <Text style={styles.orderDate}>Общее количество: <Text style={styles.orderStatuss}>{item.total_qty}</Text></Text>
                                    <Text style={styles.orderDate}>Общая стоимость: <Text style={styles.orderStatuss}>₸  {item.order_total}</Text></Text>
                                </View>

                            </View>


                        </View>
                        <View style={GlobalStyles.horizontalLine}></View>
                        {/* <TouchableOpacity onPress={() => props.navigation.navigate('ProductDetailScreen', { id: item.id })} style={styles.bottomButton}>
                            <Text style={styles.bottomLeftTxt}>Buy it Again</Text>
                            <TouchableOpacity onPress={() => props.navigation.navigate('ProductDetailScreen', { id: item.id })} style={{ padding: 4 }}>
                                <Icon name="arrow-forward-ios" ></Icon>
                            </TouchableOpacity>
                        </TouchableOpacity> */}
                        <View style={GlobalStyles.horizontalLine}></View>
                        <TouchableOpacity onPress={() => {
                            props.getOneOrder(item.id),
                            props.navigation.navigate('OrderDetailScreen', { orderID: item.id })
                    }} style={[styles.bottomButton, { marginBottom: hp('2%') }]}>
                            <Text style={styles.bottomLeftTxt}>Детали заказа</Text>
                            <TouchableOpacity style={{ padding: 4 }}>
                                <Icon name="arrow-forward-ios" ></Icon>
                            </TouchableOpacity>
                        </TouchableOpacity>

                    </>
                )
            }
        </>
    )
}

export default OrdersComponent;
const styles = StyleSheet.create({
    cartContent: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Colors.white,
        justifyContent: 'center',
        borderRadius: wp('2%'),
        marginLeft: wp('1%'),
        height: hp('17%'),
    },
    cartBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: hp('11%'),
        width: wp('90%'),
        flex: 0.90,
    },
    imageView: {
        flex: 0.30,
        backgroundColor: Colors.light_white,
        margin: wp('1%'),
        marginTop: 40,
        height: hp('10%'),
        borderRadius: wp('1.5%')
    },
    image: {
        resizeMode: 'contain',
        alignSelf: 'center',
        height: undefined,
        aspectRatio: 1,
        marginTop: 10,
        marginLeft: 10,
        width: wp('15.5%')
    },
    infromationView: {
        flex: 0.70,
        height: hp('20%'),
        marginBottom: hp('1.4%'),
        marginLeft: wp('1%'),
        marginTop: hp('8%'),
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    name: {
        textAlign: 'center',
        color: Colors.text_color,
        fontSize: wp('3.8%'),
        fontFamily: Fonts.Font_Bold,
    },
    orderDate: {
        textAlign: 'center',
        color: Colors.secondry_text_color,
        lineHeight: hp('3%'),
        fontSize: wp('3.5%'),
        fontFamily: Fonts.Font_Regular,
    },



    bottomButton: {
        height: hp('6%'),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
        flexDirection: 'row',
        borderRadius: wp('2%'),
        marginLeft: wp('1%'),
        marginBottom: hp('0%')
    },
    bottomLeftTxt: {
        textAlign: 'left',
        fontSize: wp('3.8%'),
        flex: 0.90
    },
    orderStatuss: {
        fontFamily: Fonts.Font_Bold,
        fontSize: wp('3.5%'),
        color: Colors.text_color
    }
});