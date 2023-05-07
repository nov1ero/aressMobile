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
    OtrixContainer, OtrixHeader, OtrixDivider, OtirxBackButton, AddAdressComponent, EditAddressComponent
} from '@component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { GlobalStyles, Colors } from '@helpers';
import { _roundDimensions } from '@helpers/util';
import { proceedCheckout, getAddressRequest, addAddress, updateAddress, removeAddress } from '@actions';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fonts from "@helpers/Fonts";
import DummyAddress from '@component/items/DummyAddress';
import { Button } from 'native-base';

function ManageAddressScreen(props) {
    const [state, setState] = React.useState({ cartArr: [], showAdd: false, sumAmount: 0, addresses: DummyAddress, selctedAddress: DummyAddress[0].id, showEdit: false, editAddressData: [], step: 1, selectedPaymentMethod: 4, paymentSuccessModal: false });

    const { address } = props
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
            const selectedAddress = address[index];
            setState({ ...state, editAddressData: selectedAddress, showEdit: true });
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

    useEffect(() => {

    }, []);

    const { showAdd, addresses, selctedAddress, showEdit, editAddressData, step } = state;

    return (
        <OtrixContainer customStyles={{ backgroundColor: Colors.light_white }}>

            {/* Header */}
            <OtrixHeader customStyles={{ backgroundColor: Colors.light_white }}>
                <TouchableOpacity style={GlobalStyles.headerLeft} onPress={() => props.navigation.goBack()}>
                    <OtirxBackButton />
                </TouchableOpacity>
                <View style={[GlobalStyles.headerCenter, { flex: 1 }]}>
                    <Text style={GlobalStyles.headingTxt}>  Управление адресами</Text>
                </View>
            </OtrixHeader>

            {/* Address Content start from here */}
            {step == 1 && <>
                <OtrixDivider size={"md"} />
                <Text style={styles.deliveryTitle}>Ваши адреса</Text>
                <OtrixDivider size={"sm"} />
                <View style={styles.addressContent}>
                    {/*horizontal address* */}
                    <ScrollView style={styles.addressBox} showsHorizontalScrollIndicator={false} vertical={true}>
                        {
                            address.length > 0 && address.map((item, index) =>
                                <TouchableOpacity key={item.id} style={[styles.deliveryBox, {
                                    borderWidth: 1,
                                    borderColor: Colors.light_gray
                                }]}
                                    onPress={() => setState({ ...state, selctedAddress: item.id })}
                                >
                                    <Text style={styles.addressTxt} numberOfLines={1}>{item.name}</Text>
                                    <Text style={styles.addressTxt} numberOfLines={2}>{item.email}, {item.phone}</Text>
                                    <Text style={styles.addressTxt} numberOfLines={2}>{item.region}, {item.city}</Text>
                                    <Text style={styles.addressTxt} numberOfLines={1}>{item.address}</Text>
                                    <TouchableOpacity style={[styles.editView, { bottom: selctedAddress == item.id ? hp('10%') : hp('10%') }]} onPress={() => editAddress(item.id)}>
                                        <Text style={styles.edit}> <MatIcon name="pencil" color={Colors.text_color} size={wp('5%')} /></Text>
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            )
                        }

                    </ScrollView>

                </View>
                <Button
                    size="md"
                    variant="solid"
                    bg={Colors.themeColor}
                    style={[GlobalStyles.button, { marginHorizontal: wp('5%'), marginBottom: hp('1%') }]}
                    onPress={() => setState({ ...state, showAdd: true })}
                >
                    <Text style={GlobalStyles.buttonText}>  <MatIcon name="plus" color={Colors.white} size={wp('4%')} /> Добавить</Text>
                </Button>

            </>
            }

            {/* Add Address Screen */}
            <Modal visible={showAdd}
                transparent={true}>
                <AddAdressComponent closeAdd={closeAddressModel} addAddress={_addAddress} />
            </Modal>

            {/* Edit Address Screen */}
            <Modal visible={showEdit}
                transparent={true}>
                <EditAddressComponent closeEdit={closeAddressEditModel} editAddress={_updateAddress} editData={editAddressData} removeAddress={_removeAddress} />
            </Modal>

        </OtrixContainer >

    )
}

function mapStateToProps(state) {
    return {
        cartData: state.cart.cartData,
        address: state.address.address
    }
}


export default connect(mapStateToProps, { proceedCheckout, getAddressRequest, addAddress, updateAddress, removeAddress })(ManageAddressScreen);

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
        height: hp('13.5%'),
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
        height: hp('70%')
    },

});