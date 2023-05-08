import React, { useEffect } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Modal
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { connect } from 'react-redux';
import {
    OtrixContainer, OtrixHeader, OtrixDivider, OtirxBackButton, OrdersComponent, OtrixLoader
} from '@component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { GlobalStyles, Colors } from '@helpers';
import { _roundDimensions } from '@helpers/util';
import { proceedCheckout, getOneOrderRequest, getOneOrderSuccess } from '@actions';
import Fonts from "@helpers/Fonts";
import DummyAddress from '@component/items/DummyAddress';
import OrdersDummy from '@component/items/OrdersDummy';

function OrderScreen(props) {

    const { orders } = props

    console.log("ORDER_SCREEN", orders)
    const clear = ()=>{
        props.getOneOrderSuccess([])
    }
    const getOneOrderRequest = async (id) =>{
        await props.getOneOrderRequest(id)
    }

    useEffect(() => {

    }, []);


    return (
        <OtrixContainer customStyles={{ backgroundColor: Colors.light_white }}>

        {
            orders == [] ? <OtrixLoader /> : <>
            {/* Header */}
            <OtrixHeader customStyles={{ backgroundColor: Colors.light_white }}>
                <TouchableOpacity style={GlobalStyles.headerLeft} onPress={() => props.navigation.goBack()}>
                    <OtirxBackButton />
                </TouchableOpacity>
                <View style={[GlobalStyles.headerCenter, { flex: 1 }]}>
                    <Text style={GlobalStyles.headingTxt}>  Покупки</Text>
                </View>
            </OtrixHeader>

            {/* Orders Content start from here */}
            <OtrixDivider size={"md"} />
            <Text style={styles.deliveryTitle}>Ваши покупки</Text>
            <OtrixDivider size={"sm"} />
            <View style={styles.addressContent}>
                <ScrollView style={styles.addressBox} showsHorizontalScrollIndicator={false} vertical={true}>
                    {
                        <OrdersComponent navigation={props.navigation} products={orders} getOneOrder={getOneOrderRequest} clear={clear}/>
                    }
                </ScrollView>
            </View>
            </>
        }


        </OtrixContainer >

    )
}

function mapStateToProps(state) {
    return {
        cartData: state.cart.cartData,
        orders: state.orders.orders
    }
}


export default connect(mapStateToProps, { proceedCheckout, getOneOrderRequest, getOneOrderSuccess })(OrderScreen);

const styles = StyleSheet.create({

    deliveryTitle: {
        fontFamily: Fonts.Font_Semibold,
        fontSize: wp('3.8%'),
        color: Colors.text_color,
        marginLeft: wp('5%')
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
        height: hp('30.5%'),
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

});