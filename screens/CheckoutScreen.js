import React, { useEffect, useState } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    ScrollView,
    StyleSheet, 
    Modal
} from "react-native";
import { connect } from 'react-redux';
import { Button } from 'native-base';
import {
    OtrixContainer, OtrixHeader, OtrixContent, OtrixDivider, CheckoutView, OtirxBackButton, AddAdressComponent, EditAddressComponent, PaymentSuccessComponent
} from '@component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { GlobalStyles, Colors } from '@helpers';
import { _roundDimensions } from '@helpers/util';
import { orderConfirmation, addAddress, updateAddress, removeAddress } from '@actions';
import PaymentMethodsDummy from '@component/items/PaymentMethodsDummy';
import Icon from 'react-native-vector-icons/Ionicons';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fonts from "@helpers/Fonts";

function CheckoutScreen(props) {
    
    const [state, setState] = useState({ loading: true,pressed: true, cartArr: [], showAdd: false, cartProducts: [], sumAmount: 0, noRecord: false, selctedAddress: 0, showEdit: false, editAddressData: {}, step: 1, selectedPaymentMethod: {}});
    const [paymentModal, setPaymentModal]= useState({paymentSuccessModal: false })
    
    const {address, confirmed} = props
    console.log("CONFIRMED", confirmed)
    
    const calculateCart = () => {
        const { cartData } = props;
        let cartProducts = cartData;
        let cartItems = [];
        let sumAmount = 0;

        //find and create array
        cartProducts && cartData.length > 0 && cartProducts.forEach(function (item, index) {
            cartItems.push({
                cartid: item.cartid,
                quantity: item.qty,
                name: item.productname.ru || " ",
                price: item.offerprice > 0? item.offerprice: item.mainprice,
                image: item.thumbnail_path+"/"+item.thumbnail? item.thumbnail_path+"/"+item.thumbnail: " ",
                id: item.productid || " ",
                max_order: item.maxorderqty
            });
            //console.log("ITEMS", cartItems)
            //! поменять 30 на 'amt'
            let amt = item.price?item.price:0;
            //productImages = productDetail?(productDetail.combinations[0].images.map(i => (productDetail.images_path + '/' + i.image))):[];
            sumAmount += amt * item.quantity;
        });

        setState({ ...state, noRecord: cartProducts.length > 0 ? false : true, loading: false, cartProducts: cartItems, sumAmount: sumAmount, });
    }

    const _addAddress = async (addressData) => {
        await props.addAddress(addressData);
    }

    const _removeAddress = async (addressData) => {
        await props.removeAddress(addressData)
    }

    const _updateAddress = async (addressData) => {
        await props.updateAddress(addressData)
    }

    const editAddress = (id) => {
        const index = address.findIndex((item) => item.id === id);
        if (index !== -1) {
            const selectedAddressToEdit = address[index];
            setState({ ...state, editAddressData: selectedAddressToEdit, showEdit: true });
            console.log("Selected Address", editAddressData)

        }
    }

    const closeAddressModel = () => {
        setState({
            ...state,
            showAdd: false
        });
    }

    const closeAddressEditModel = () => {
        setState({
            ...state,
            showEdit: false
        });
    }

    const _proceedCheckout = async(amount, payment_method, addressid) => {
        await props.orderConfirmation({
            amount: amount,
            payment_method : payment_method,
            currency : "KZT",
            address_id : addressid
        });
    }

    useEffect(() => {
        if (confirmed == 'success') {
            setPaymentModal({ ...paymentModal, paymentSuccessModal: true})
        }
        calculateCart();
    }, [confirmed]);

    const { cartProducts, loading, noRecord, showAdd, addresses, selctedAddress, showEdit, editAddressData, step, selectedPaymentMethod, pressed } = state;
    const { paymentSuccessModal } = paymentModal;
    const { totalAmt } = props.route.params;
    const amount = (price) => {
        let amt = price.replace('₸ ', '');
        return amt;
    }
    
    return (
        <OtrixContainer customStyles={{ backgroundColor: Colors.light_white }}>

            {/* Header */}
            <OtrixHeader customStyles={{ backgroundColor: Colors.light_white }}>
                <TouchableOpacity style={GlobalStyles.headerLeft} onPress={() => {
                    props.navigation.goBack(),
                    setState({ ...state, pressed: false })
                }}>
                    <OtirxBackButton />
                </TouchableOpacity>
                <View style={[GlobalStyles.headerCenter, { flex: 1 }]}>
                    <Text style={GlobalStyles.headingTxt}>  Оформление</Text>
                </View>
            </OtrixHeader>

            {/* Content Start from here */}
            <View style={{ marginHorizontal: wp('4%') }} >
                {/* Arrow navigation Start from here */}
                <View style={styles.indicatorView}>
                    <View style={[styles.indicator1, { marginRight: wp('4%') }]}>
                        <View style={{ position: 'relative' }}>
                            <View style={[styles.ract, { borderColor: step == 1 ? Colors.themeColor : 'transparent' }]}>

                                <Text style={[styles.indicatorText, { color: step == 1 ? Colors.themeColor : Colors.secondry_text_color }]}>Адрес</Text>
                            </View>
                            <View style={[styles.tri]}>
                                <View style={[styles.arrow, { borderColor: step == 1 ? Colors.themeColor : 'transparent' }]}>

                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.indicator1}>
                        <View style={{ borderColor: step == 2 ? Colors.themeColor : 'transparent' }}>
                            <View style={[styles.ract, { borderColor: step == 2 ? Colors.themeColor : 'transparent' }]}>
                                <Text style={[styles.indicatorText, { color: step == 2 ? Colors.themeColor : Colors.secondry_text_color }]}>Оплата</Text>
                            </View>
                            <View style={[styles.tri]}>
                                <View style={[styles.arrow, { borderColor: step == 2 ? Colors.themeColor : 'transparent' }]}>

                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            {/* Address Content start from here */}
            {step == 1 && <>
                <OtrixDivider size={"md"} />
                <TouchableOpacity 
                onPress={() => setState({ ...state, step: 1 })}
                >
                <Text style={styles.deliveryTitle}>Адрес доставки</Text>
                </TouchableOpacity>
                <OtrixDivider size={"sm"} />
                <View style={styles.addressContent}>
                    {/*horizontal address* */}
                    <ScrollView style={styles.addressBox} showsHorizontalScrollIndicator={false} horizontal={true}>
                        {
                            address.length > 0 && address.map((item, index) =>
                                <TouchableOpacity key={item.id} style={[styles.deliveryBox, {
                                    borderWidth: selctedAddress == item.id ? 1 : 0.1,
                                    borderColor: selctedAddress == item.id ? Colors.themeColor : Colors.white
                                }]}
                                    onPress={() => setState({ ...state, selctedAddress: item.id , pressed: false})}
                                >
                                    <Text style={styles.addressTxt} numberOfLines={1}>{item.name}</Text>
                                    <Text style={styles.addressTxt} numberOfLines={2}>{item.email}, {item.phone}</Text>
                                    <Text style={styles.addressTxt} numberOfLines={2}>{item.region}, {item.city}</Text>
                                    <Text style={styles.addressTxt} numberOfLines={1}>{item.address}</Text>
                                    {selctedAddress == item.id &&
                                        <Text style={styles.deliveryAddressTxt}>Адрес доставки<Icon name="md-checkmark-circle-sharp" color={Colors.themeColor} size={wp('4%')} style={{ textAlignVertical: 'center' }} /></Text>
                                    }
                                    <TouchableOpacity style={[styles.editView, { bottom: selctedAddress == item.id ? hp('12%') : hp('10%') }]} onPress={() => editAddress(item.id)}>
                                        <Text style={styles.edit}> <MatIcon name="pencil" color={Colors.text_color} size={wp('5%')} /></Text>
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            )
                        }

                    </ScrollView>

                    <TouchableOpacity style={styles.plusView} onPress={() => setState({ ...state, showAdd: true })}>
                        <MatIcon name="plus" color={Colors.text_color} size={wp('5%')} />
                    </TouchableOpacity>
                </View>
            </>
            }


            {
                step == 1 && <OtrixContent>
                    <OtrixDivider size={"lg"} />
                    <Text style={styles.summayTitle}>Краткое описание заказа</Text>
                    <OtrixDivider size={"sm"} />
                    <View style={GlobalStyles.horizontalLine}></View>
                    <>
                        {
                            !noRecord && !loading && <CheckoutView navigation={props.navigation} products={cartProducts} />
                        }
                    </>
                </OtrixContent>
            }


            {/* Add Address Screen */}
            <Modal visible={showAdd}
                transparent={true}>
                <AddAdressComponent closeAdd={closeAddressModel} addAdress={_addAddress} />
            </Modal>

            {/* Edit Address Screen */}
            <Modal visible={showEdit}
                transparent={true}>
                <EditAddressComponent closeEdit={closeAddressEditModel} editAddress={_updateAddress} editData={editAddressData} removeAddress={_removeAddress}/>
            </Modal>


            {/******** PAYMENT SECTION *************/}
            {
                step == 2 && <OtrixContent>
                    <OtrixDivider size={"md"} />
                    {/* <View style={styles.offerView}>
                        <Text style={styles.offerTxt}>Получите 10% скидки с *********</Text>
                    </View> */}
                    <OtrixDivider size={"md"} />
                    <TouchableOpacity
                        onPress={() => setState({ ...state, step: 2 })}
                    >
                    <Text style={styles.paymentMethodTitle}>Методы оплаты</Text>
                    </TouchableOpacity>
                    <OtrixDivider size={"sm"} />
                    {
                        PaymentMethodsDummy.map((item, index) =>
                            <TouchableOpacity key={item.id}
                                onPress={() => setState({ ...state, selectedPaymentMethod: item, pressed: false })}
                                style={[styles.paymentView, { backgroundColor: selectedPaymentMethod == item ? Colors.themeColor : Colors.white }]}>
                                <Text style={[styles.paymentMethodTxt, { color: selectedPaymentMethod == item ? Colors.white : Colors.text_color }]}>{item.name}</Text>
                                {
                                    
                                    selectedPaymentMethod.id == item.id ?
                                        <Icon name="md-shield-checkmark" color={Colors.white} size={wp('6%')} style={{ textAlign: 'right', flex: 0.10 }} />
                                        :
                                        <Icon name="radio-button-off" color={Colors.secondry_text_color} size={wp('5%')} style={{ textAlign: 'right', flex: 0.10 }} />
                                }
                            </TouchableOpacity>
                        )
                    }
                </OtrixContent>
            }

            <View style={styles.checkoutView}>
                <OtrixDivider size={'sm'} />
                <View style={styles.totalView}>
                    <Text style={styles.leftTxt}>Всего :</Text>
                    <Text style={[styles.rightTxt, { color: Colors.link_color, fontSize: wp('5.5%') }]}>{totalAmt}</Text>
                    {
                        step == 1 ?
                            <Button
                                size="md"
                                variant="solid"
                                bg={Colors.themeColor}
                                style={[GlobalStyles.button, { marginHorizontal: wp('5%'), marginBottom: hp('1%'), flex: 0.40, alignSelf: 'flex-end' }]}
                                onPress={() => setState({ ...state, step: 2 })}
                            >
                                <Text style={GlobalStyles.buttonText}>Перейти к оплате</Text>
                            </Button>
                            : <Button
                                size="md"
                                variant="solid"
                                bg={'#0ab97a'}
                                isDisabled={pressed}
                                style={[GlobalStyles.button, { marginHorizontal: wp('5%'), marginBottom: hp('1%'), flex: 0.40, alignSelf: 'flex-end' }]}
                                onPress={() => { 
                                    // confirmed == "success"? setState({ ...state, paymentSuccessModal: true, pressed: true }): setState({ ...state, paymentSuccessModal: false, pressed: true }),
                                    _proceedCheckout(amount(totalAmt), selectedPaymentMethod.name, selctedAddress),
                                    setState({ ...state, pressed: true })
                                }}
                            >
                                <Text style={[GlobalStyles.buttonText, { fontSize: wp('4.8%') }]}>Заказать</Text>
                            </Button>
                    }

                </View>
            </View>

            {/* Payment Modal  */}
            <Modal visible={paymentSuccessModal}
                transparent={true}>
                <PaymentSuccessComponent navigation={props.navigation} />
            </Modal>

        </OtrixContainer >


    )
}

function mapStateToProps(state) {
    return {
        cartData: state.cart.cartData,
        address: state.address.address,
        confirmed: state.cart.confirmed
    }
}


export default connect(mapStateToProps, { orderConfirmation, addAddress, updateAddress, removeAddress })(CheckoutScreen);

const styles = StyleSheet.create({
    checkoutView: {
        backgroundColor: Colors.light_white,
        height: hp('8%'),
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 0.4 },
        shadowOpacity: 0.30,
        shadowRadius: 3,
        elevation: 6,
        borderTopLeftRadius: wp('2%'),
        borderTopRightRadius: wp('2%'),
    },
    totalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: wp('6%'),
    },
    leftTxt: {
        color: Colors.secondry_text_color,
        fontFamily: Fonts.Font_Bold,
        flex: 0.20,
        fontSize: wp('4%'),
        textAlign: 'left'
    },
    rightTxt: {
        color: Colors.text_color,
        fontFamily: Fonts.Font_Bold,
        fontSize: wp('4%'),
        flex: 0.40,
        textAlign: 'left'
    },
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
    indicatorView: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: hp('1.5%')
    },

    indicator1: {
        marginHorizontal: wp('3%')
    },
    ract: {
        borderWidth: 1,
        padding: 4.4,
        width: wp('38%'),
        backgroundColor: Colors.white,

        alignItems: 'center'
    },
    tri: {
        position: 'absolute',
        top: hp('0.6%'),
        right: -wp('2.6%')
    },
    arrow: {
        borderTopWidth: 1,
        borderRightWidth: 1,
        backgroundColor: Colors.white,
        borderColor: '#007299',
        width: 20,
        height: 21,
        transform: [{ rotate: '45deg' }]
    },
    indicatorText: {
        fontFamily: Fonts.Font_Semibold,
        fontSize: wp('3.8%'),
        textTransform: 'uppercase',
        color: Colors.secondry_text_color
    },
    deliveryTitle: {
        fontFamily: Fonts.Font_Semibold,
        fontSize: wp('3.8%'),
        color: Colors.text_color,
        marginLeft: wp('5%')
    },
    summayTitle: {
        fontFamily: Fonts.Font_Semibold,
        fontSize: wp('3.8%'),
        color: Colors.text_color,
        left: wp('5%')
    },
    addressBox: {
        marginLeft: wp('5%'),
        marginRight: wp('2.5%'),
        flex: 0.90,
        height: hp('15.5%'),
        borderRadius: wp('2%'),
    },
    deliveryBox: {
        marginHorizontal: wp('1.5%'),
        width: wp('72%'),
        height: hp('15.5%'),
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
        flexDirection: 'row'
    },
    summryBox: {
        height: hp('6.5%'),
        backgroundColor: Colors.white,
        flexDirection: 'row',
        marginVertical: hp('1%')
    },
    image: {
        flex: 0.25,
        height: hp('10%'),
        resizeMode: 'contain',
        width: wp('20%')
    },
    plusView: {
        flex: 0.10,
        height: hp('15%'),
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },

    //payment styles here
    offerView: {
        padding: hp('1.5%'),
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    offerTxt: {
        fontSize: wp('3.8%'),
        fontFamily: Fonts.Font_Semibold,
        color: Colors.link_color
    },
    paymentMethodTitle: {
        fontFamily: Fonts.Font_Semibold,
        fontSize: wp('4%'),
        color: Colors.text_color,
        marginLeft: wp('1%')
    },
    paymentView: {
        flexDirection: 'row',
        padding: hp('2%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: hp('0.5%'),
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.light_gray
    },
    paymentMethodTxt: {
        fontFamily: Fonts.Font_Semibold,
        fontSize: wp('3.8%'),
        textAlign: 'left',
        marginLeft: wp('2%'),
        flex: 0.90
    }
});