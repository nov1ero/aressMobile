import React, { } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { GlobalStyles, Colors } from '@helpers'
import OtrixDivider from '../OtrixComponent/OtrixDivider';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Fonts from '@helpers/Fonts';
import { checked } from '@common';
import { _roundDimensions } from '@helpers/util';
import { Button } from "native-base"
import Icon from 'react-native-vector-icons/FontAwesome5';

function PaymentSuccessComponent(props) {

    return (
        <View>
            {Platform.OS === 'ios' &&
                <View style={{ height: hp('5%') }}></View>
            }
            <View style={styles.modelView}>

                <View style={styles.contentView}>
                    <Image source={checked} style={styles.checkImg} />
                    <OtrixDivider size={'md'} />
                    <Text style={styles.paymentSuccess}>Платеж Подтвержден</Text>
                    <OtrixDivider size={'lg'} />
                    <OtrixDivider size={'lg'} />
                    <Text style={styles.paymentDescTxt}>Ваш заказ подтвержден, вскоре вы получите электронное письмо / SMS с подтверждением {'\n'} заказа и ожидаемой датой доставки ваших товаров.</Text>
                    <Button
                        size="md"
                        variant="solid"
                        bg={Colors.themeColor}
                        style={[GlobalStyles.button, { marginHorizontal: wp('4%'), top: hp('2%') }]}
                        onPress={() => props.navigation.navigate('HomeScreen')}
                    >
                        <Text style={GlobalStyles.buttonText}><Icon name="shopping-bag" size={wp('5%')} />  Продолжить Покупки</Text>
                    </Button>
                    <Button
                        size="md"
                        variant="solid"
                        bg={'#0ab97a'}
                        style={[GlobalStyles.button, { marginHorizontal: wp('4%'), marginTop: hp('4%') }]}
                        onPress={() => props.navigation.navigate('OrderScreen')}                    >
                        <Text style={GlobalStyles.buttonText}><Icon name="smile" size={wp('5%')} />  Мои Заказы</Text>
                    </Button>
                </View>
            </View>
        </View>
    )
}

export default PaymentSuccessComponent;

const styles = StyleSheet.create({
    modelView: {
        height: hp('100%'),
        width: wp('100%'),
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
    },
    round: {
        justifyContent: 'center',
        alignItems: 'center',
        height: _roundDimensions()._height * 0.042,
        width: _roundDimensions()._height * 0.040,
        borderRadius: _roundDimensions()._borderRadius,
        backgroundColor: Colors.white,
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 0.2 },
        shadowOpacity: 0.10,
        shadowRadius: 3,
        elevation: 2,
    },
    button: {
        height: _roundDimensions()._height * 0.016,
        width: _roundDimensions()._height * 0.016,
    },
    contentView: {
        marginHorizontal: wp('4%'),
        bottom: hp('10%')
    },
    paymentSuccess: {
        fontSize: wp('4.8%'),
        fontFamily: Fonts.Font_Semibold,
        textAlign: 'center'
    },
    checkImg: {
        height: hp('20%'),
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    paymentDescTxt: {
        fontSize: wp('4%'),
        fontFamily: Fonts.Font_Regular,
        textAlign: 'left',
        left: wp('2.5%'),
        lineHeight: hp('3%')
    }
});