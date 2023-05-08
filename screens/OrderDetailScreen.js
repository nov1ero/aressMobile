import React, { useEffect } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { connect } from 'react-redux';
import {
    OtrixContainer, OtrixHeader, OtrixDivider, OtirxBackButton, OtrixLoader
} from '@component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { GlobalStyles, Colors } from '@helpers';
import { _roundDimensions } from '@helpers/util';
import { proceedCheckout, getOneOrderSuccess } from '@actions';
import Fonts from "@helpers/Fonts";

function OrderDetailScreen(props) {
    const order = props.order
    const { orderID } = props.route.params
    const product = order.orderitems
    console.log("ONE_ORDER", orderID, " == ", order.id)

    return (
        <OtrixContainer customStyles={{ backgroundColor: Colors.light_white }}>
        {
            orderID != order.id ? <OtrixLoader /> : <>
            {/* Header */}
            <OtrixHeader customStyles={{ backgroundColor: Colors.light_white }}>
                <TouchableOpacity style={GlobalStyles.headerLeft} onPress={() => {
                    props.navigation.goBack()
                
                }}>
                    <OtirxBackButton />
                </TouchableOpacity>
                <View style={[GlobalStyles.headerCenter, { flex: 1 }]}>
                    <Text style={GlobalStyles.headingTxt}> Детали Заказа </Text>
                </View>
            </OtrixHeader>

            {/* Orders Content start from here */}
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.addressContent}>
                <ScrollView style={styles.addressBox} showsHorizontalScrollIndicator={false} vertical={true}>

                    <OtrixDivider size={"md"} />
                    <Text style={styles.deliveryTitle}>Просмотр сведений о заказах</Text>
                    <OtrixDivider size={"sm"} />
                    <View style={styles.cartContent} >
                        <View style={styles.detailBox} >
                            <View style={styles.detailRow}>
                                <View style={styles.leftView}>
                                    <Text style={styles.leftTxt}>Дата Заказа</Text>
                                </View>
                                <View style={styles.rightView}>
                                    <Text style={styles.rightTxt}>{order.orderDate}</Text>
                                </View>
                            </View>
                            <View style={styles.detailRow}>
                                <View style={styles.leftView}>
                                    <Text style={styles.leftTxt}>Заказ</Text>
                                </View>
                                <View style={styles.rightView}>
                                    <Text style={styles.rightTxt}>#{order.order_id}</Text>
                                </View>
                            </View>
                            {/* <View style={styles.detailRow}>
                                <View style={styles.leftView}>
                                    <Text style={[styles.leftTxt]}>Общая стоимость заказа</Text>
                                </View>
                                <View style={styles.rightView}>
                                    <Text style={styles.rightTxt}>{order.grand_total}</Text>
                                </View>
                            </View> */}
                        </View>
                    </View>

                    <OtrixDivider size={"md"} />
                    <Text style={styles.deliveryTitle}>Детали Продукта</Text>
                    <OtrixDivider size={"sm"} />
                    {
                product.length > 0 && product.map((item, index) =>
                    <>
                    <View style={styles.cartContent} key={index}>
                        <View style={styles.cartBox} >
                            <View style={styles.imageView}>
                                <Image source={{uri : item.thumb_path+"/"+item.product_thumb}} style={styles.image}
                                ></Image>
                            </View>
                            <View style={styles.infromationView}>
                                <View >
                                    <Text style={styles.name}>{item.product_name.en}</Text>
                                </View>
                                <View >
                                    <Text style={styles.name}>Накладная: {item.invoice_no}</Text>
                                </View>
                                <Text style={styles.orderDate}>Количество: {item.qty}</Text>
                                <Text style={styles.orderDate}>Статус заказа: <Text style={styles.orderSstatustatuss}>{item.status}</Text></Text>
                            </View>
                        </View>
                        <View style={styles.priceView}>
                            <Text style={styles.price}>₸  {item.price}</Text>
                        </View>
                    </View>
                    </>
                )
            }

                    <OtrixDivider size={"md"} />
                    <Text style={styles.deliveryTitle}>Адрес доставки</Text>
                    <OtrixDivider size={"sm"} />
                    <View style={styles.cartContent} >
                        <TouchableOpacity style={[styles.deliveryBox]}    >
                            <Text style={styles.addressTxt} numberOfLines={1}>{order.shipping_address.name}     </Text>
                            <Text style={styles.addressTxt} numberOfLines={2}>{order.shipping_address.email} , {order.shipping_address.phone}  </Text>
                            <Text style={styles.addressTxt} numberOfLines={2}>{order.shipping_address.region}, {order.shipping_address.city}</Text>
                            <Text style={styles.addressTxt} numberOfLines={1}>{order.shipping_address.address}</Text>
                        </TouchableOpacity>
                    </View>


                    <OtrixDivider size={"md"} />
                    <Text style={styles.deliveryTitle}>Краткое описание заказа</Text>
                    <OtrixDivider size={"sm"} />
                    <View style={styles.cartContent} >
                        <View style={[styles.detailBox, { height: hp('26%') }]} >
                            <View style={styles.detailRow}>
                                <View style={styles.leftView}>
                                    <Text style={styles.leftTxt}>Общее количество</Text>
                                </View>
                                <View style={styles.rightView}>
                                    <Text style={styles.rightTxt}>{order.total_qty}</Text>
                                </View>
                            </View>
                            {/* <View style={styles.detailRow}>
                                <View style={styles.leftView}>
                                    <Text style={styles.leftTxt}>Общая стоимтость</Text>
                                </View>
                                <View style={styles.rightView}>
                                    <Text style={styles.rightTxt}>₸  {order.grand_total}</Text>
                                </View>
                            </View> */}
                            <View style={styles.detailRow}>
                                <View style={styles.leftView}>
                                    <Text style={styles.leftTxt}>Идентификатор заказа</Text>
                                </View>
                                <View style={styles.rightView}>
                                    <Text style={styles.rightTxt}>{order.order_id}</Text>
                                </View>
                            </View>
                            <View style={styles.detailRow}>
                                <View style={styles.leftView}>
                                    <Text style={styles.leftTxt}>Метод оплаты</Text>
                                </View>
                                <View style={styles.rightView}>
                                    <Text style={styles.rightTxt}>{order.payment_method}</Text>
                                </View>
                            </View>
                            <View style={styles.detailRow}>
                                <View style={styles.leftView}>
                                    <Text style={[styles.leftTxt, { color: Colors.link_color, fontSize: wp('4.5%') }]}>Общая стоимость заказа</Text>
                                </View>
                                <View style={styles.rightView}>
                                    <Text style={[styles.rightTxt, , { color: Colors.link_color, fontSize: wp('4.5%') }]}>₸  {order.grand_total}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                </ScrollView>
            </View>
            </ScrollView>


            </>
        }
        </OtrixContainer >

    )
}

function mapStateToProps(state) {
    return {
        cartData: state.cart.cartData,
        order : state.orders.one_order

    }
}


export default connect(mapStateToProps, { proceedCheckout, getOneOrderSuccess })(OrderDetailScreen);

const styles = StyleSheet.create({

    deliveryTitle: {
        fontFamily: Fonts.Font_Semibold,
        fontSize: wp('3.8%'),
        color: Colors.text_color,
        marginLeft: wp('2%')
    },
    addressBox: {
        marginLeft: wp('5%'),
        marginRight: wp('2.5%'),
        flex: 1,
        height: 'auto',
        borderRadius: wp('2%'),
    },
    deliveryBox: {
        marginHorizontal: wp('1.5%'),
        width: wp('88%'),
        marginVertical: hp('0.5%'),
        height: hp('14.5%'),
        borderRadius: wp('2%'),
        backgroundColor: Colors.white,
        padding: wp('2.5%')
    },
    addressTxt: {
        fontSize: wp('3.6%'),
        fontFamily: Fonts.Font_Reguler,
        color: Colors.text_color,
        textAlign: 'left',

    },
    deliveryAddressTxt: {
        textAlign: 'right',
        fontSize: wp('3.4%'),
        fontFamily: Fonts.Font_Reguler,
        color: Colors.link_color,
    },
    edit: {
        textAlign: 'right'
    },
    editView: { justifyContent: 'flex-start', },
    addressContent: {
        flexDirection: 'row',
    },

    cartContent: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Colors.white,
        justifyContent: 'center',
        borderRadius: wp('2%'),
        marginLeft: wp('1%'),
    },
    cartBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: hp('11%'),
        width: wp('90%'),
        flex: 0.85,
    },
    detailBox: {
        justifyContent: 'center',
        alignItems: 'center',
        height: hp('11%'),
        flex: 1,
    },
    imageView: {
        flex: 0.30,
        backgroundColor: Colors.light_white,
        margin: wp('1%'),
        height: hp('8%'),
        borderRadius: wp('1.5%')
    },
    image: {
        resizeMode: 'contain',
        alignSelf: 'center',
        height: undefined,
        aspectRatio: 1,
        width: wp('15.5%')
    },
    infromationView: {
        flex: 0.70,
        marginBottom: hp('1.4%'),
        marginLeft: wp('1%'),
        marginTop: hp('1%'),
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
    orderStatuss: {
        fontFamily: Fonts.Font_Bold,
        fontSize: wp('3.5%'),
        color: Colors.text_color
    },
    priceView: {
        flex: 0.15,
        marginTop: hp('1%'),
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginRight: wp('2%')
    },
    price: {
        color: Colors.link_color,
        fontSize: wp('4%'),
        fontFamily: Fonts.Font_Semibold
    },
    leftView: {
        flex: 0.30,
        marginLeft: wp('3%'),
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    rightView: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flex: 0.70
    },
    leftTxt: {
        fontFamily: Fonts.Font_Semibold,
        fontSize: wp('3.5%'),
        color: Colors.secondry_text_color
    },
    rightTxt: {
        fontFamily: Fonts.Font_Semibold,
        fontSize: wp('4%'),
        justifyContent: 'center',
        alignItems: 'center',
        color: Colors.text_color
    },
    detailRow: {
        flexDirection: 'row',
        marginVertical: hp('0.4%')
    }
});