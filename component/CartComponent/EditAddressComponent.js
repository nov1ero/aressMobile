import React, { useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { GlobalStyles, Colors } from '@helpers'
// import { OtrixHeader, OtrixDivider } from '@component';
import OtrixHeader from '../OtrixComponent/OtrixHeader';
import OtrixDivider from '../OtrixComponent/OtrixDivider';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Fonts from '@helpers/Fonts';
import { close, checkaround, checkround2 } from '@common';
import { _roundDimensions } from '@helpers/util';
import { Input, FormControl, Button, TextArea, Select, CheckIcon, InfoOutlineIcon } from "native-base"
import CountryArr from '../items/CountryArr';

function EditAddressComponent(props) {
    const [state, setState] = React.useState({ id:props.editData.id, name: props.editData.name, region: props.editData.region, city: props.editData.city, address1: props.editData.address, email: props.editData.email, phone: props.editData.phone, defaddress: props.editData.defaddress, submited: false });

    const { id, name, region, city, address1, email, phone, submited, defaddress } = state;
    const remove = () =>{
        props.removeAddress(props.editData.id)
    }
    const submit = () => {
        setState({ ...state, submited: true });

        let error = false;
        if (name == '' || city == '' || address1 == '' || email == '') {
            error = true;
        }
        if (error == false) {
            props.editAddress({id, name, region, city, address1, email, phone, defaddress })
        }

    }

    return (
        <View>
            {Platform.OS === 'ios' &&
                <View style={{ height: hp('5%') }}></View>
            }
            <View style={styles.modelView}>

                {/* Model header */}
                <OtrixHeader customStyles={{ backgroundColor: Colors.white }}>
                    <TouchableOpacity style={GlobalStyles.headerLeft} onPress={() => props.closeEdit()}>
                        <View style={styles.round} >
                            <Image source={close} style={styles.button} />
                        </View>
                    </TouchableOpacity>
                    <View style={[GlobalStyles.headerCenter]}>
                        <Text style={GlobalStyles.headingTxt}>{'Обновление Адреса'}</Text>
                    </View>
                    <TouchableOpacity style={styles.headerRight}  >
                        {/* <Text style={styles.clearTxt}> Clear All</Text> */}
                    </TouchableOpacity>
                </OtrixHeader>
                <OtrixDivider size={'sm'} />
                <View style={GlobalStyles.horizontalLine}></View>
                <OtrixDivider size={'md'} />


                <View style={styles.contentView}>
                <FormControl isRequired isInvalid={submited && city == '' ? true : false}>
                        <Input variant="outline"
                            value={name}
                            placeholder="Имя" style={GlobalStyles.textInputStyle}
                            onChangeText={(value) => setState({ ...state, name: value })}
                        />
                        <FormControl.ErrorMessage _text={{ fontSize: 'xs' }}>Ошибка</FormControl.ErrorMessage>
                    </FormControl>
                    <OtrixDivider size={'sm'} />
                    <FormControl isRequired isInvalid={submited && email == '' ? true : false}>
                        <Input
                            value={email}
                            variant="outline" placeholder="Электронный адрес" style={GlobalStyles.textInputStyle}
                            onChangeText={(value) => setState({ ...state, email: value, submited: false })}
                        />
                        <FormControl.ErrorMessage
                            leftIcon={<InfoOutlineIcon size="xs" />}
                        >
                            Необходимо указать электронный адрес
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <OtrixDivider size={'sm'} />

                    <FormControl isRequired isInvalid={submited && phone == '' ? true : false}>
                        <Input variant="outline"
                            value={phone.toString()}
                            placeholder="Тел. номер" style={GlobalStyles.textInputStyle}
                            onChangeText={(value) => setState({ ...state, phone: value })}
                        />
                        <FormControl.ErrorMessage
                            leftIcon={<InfoOutlineIcon size="xs" />}
                        >
                            Необходим указать номер телефона
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <OtrixDivider size={'sm'} />
                    <FormControl isRequired isInvalid={submited && region == '' ? true : false}>
                        <Select
                            selectedValue={region}
                            minWidth="200"
                            accessibilityLabel="Select region"
                            placeholder="Выбрать область"
                            _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size="5" />,
                            }}
                            mt={1}
                            onValueChange={(itemValue) => setState({ ...state, region: itemValue })}
                        >
                            {
                                CountryArr.map((item, index) =>
                                    <Select.Item label={item} value={item} key={index} />
                                )
                            }
                        </Select>
                    </FormControl>
                    <OtrixDivider size={'sm'} />
                    <FormControl isRequired isInvalid={submited && city == '' ? true : false}>
                        <Input variant="outline"
                            value={city}
                            placeholder="Город" style={GlobalStyles.textInputStyle}
                            onChangeText={(value) => setState({ ...state, city: value })}
                        />
                        <FormControl.ErrorMessage
                            leftIcon={<InfoOutlineIcon size="xs" />}
                        >
                            Необходимо указать город
                        </FormControl.ErrorMessage>
                    </FormControl>

                    <OtrixDivider size={'sm'} />
                    

                    <FormControl isRequired isInvalid={submited && address1 == '' ? true : false}>
                        <TextArea
                            value={address1}
                            variant="outline" placeholder="Адрес" style={GlobalStyles.textAreaInputStyle}
                            onChangeText={(value) => setState({ ...state, address1: value, submited: false })}
                        />
                        <FormControl.ErrorMessage
                            leftIcon={<InfoOutlineIcon size="xs" />}
                        >
                            Необходимо указать адрес
                        </FormControl.ErrorMessage>
                    </FormControl>

                    <OtrixDivider size={'sm'} />
                    <FormControl isRequired isInvalid={submited && region == '' ? true : false}>
                        <Select
                            selectedValue={defaddress.toString()}
                            minWidth="200"
                            accessibilityLabel="defaddress"
                            placeholder="Сделать основным?"
                            _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size="5" />,
                            }}
                            mt={1}
                            onValueChange={(itemValue) => setState({ ...state, defaddress: itemValue })}
                        >
                            <Select.Item label="Да" value="1" />
                            <Select.Item label="Нет" value="0" /> 
                        </Select>
                    </FormControl>
                </View>

                <Button
                    size="md"
                    variant="solid"
                    bg={Colors.themeColor}
                    style={[GlobalStyles.button, { marginHorizontal: wp('4%'), top: hp('4.5%') }]}
                    onPress={() => submit()}
                >
                    <Text style={GlobalStyles.buttonText}>Обновить</Text>
                </Button>
                <OtrixDivider size={'sm'} />
                <OtrixDivider size={'sm'} />
                <Button
                    size="md"
                    variant="solid"
                    bg={Colors.darkRed}
                    style={[GlobalStyles.button, { marginHorizontal: wp('4%'), top: hp('4.5%') }]}
                    onPress={() => remove()}
                >
                    <Text style={GlobalStyles.buttonText}>Удалить</Text>
                </Button>
            </View>

        </View>
    )
}

export default EditAddressComponent;

const styles = StyleSheet.create({
    modelView: {
        height: hp('100%'),
        width: wp('80%'),
        alignSelf: 'flex-end',
        backgroundColor: Colors.white,
    },
    filter: {
        height: _roundDimensions()._height * 0.028,
        width: _roundDimensions()._height * 0.028,
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
    headerRight: {
        flex: 0.25,
        marginRight: wp('2%'),
    },
    clearTxt: {
        color: Colors.link_color,
        textTransform: 'uppercase',
        fontSize: wp('3%'),
        fontFamily: Fonts.Font_Reguler
    },
    horiLine: {
        width: wp('90%'),
        alignSelf: 'center',
        height: 0.5,
        backgroundColor: Colors.line_color
    },
    contentView: {
        marginHorizontal: wp('4%'),

    },
    titleTxt: {
        color: Colors.text_color,
        textTransform: 'capitalize',
        fontSize: wp('4%'),
        fontFamily: Fonts.Font_Semibold
    },

    colorBox: {
        height: hp('4%'),
        width: wp('18%'),
        flexDirection: 'row',
        marginHorizontal: wp('2%'),
        backgroundColor: Colors.white,
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: Colors.light_gray,
        borderWidth: 1,
        alignItems: 'center'
    },
    borderBox: {
        borderColor: Colors.themeColor,
        borderWidth: 1,
    },

    imageView: {
        height: hp('2%'),
        width: wp('4%'),
        borderRadius: 50,
        marginHorizontal: wp('1%'),

    },
    rangeView:
        { flex: 1, flexDirection: 'row', marginTop: hp('2%'), marginBottom: hp('8%') }
});