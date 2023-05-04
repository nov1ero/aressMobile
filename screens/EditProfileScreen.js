import React, { useEffect } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { requestInit, updateProfile } from '@actions';
import {
    OtrixContainer, OtrixHeader, OtrixContent, OtirxBackButton, OtrixDivider
} from '@component';
import { Input, Text, FormControl, Button, InfoOutlineIcon } from "native-base"
import { connect } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { GlobalStyles, Colors } from '@helpers'
import Icon from 'react-native-vector-icons/Ionicons';
import Fonts from "../helpers/Fonts";

function EditProfileScreen(props) {
    const [state, setState] = React.useState({ first_name: '', last_name: "", email: "", phone: ""});
    const { first_name, last_name, email, phone } = state;
    const{ data } = props;
    console.log("UPDATEPROF", data)
    return (
        <OtrixContainer>

            {/* Header */}
            <OtrixHeader customStyles={{ backgroundColor: Colors.light_white }}>
                <TouchableOpacity style={GlobalStyles.headerLeft} onPress={() => props.navigation.goBack()}>
                    <OtirxBackButton />
                </TouchableOpacity>
                <View style={[GlobalStyles.headerCenter, { flex: 1 }]}>
                    <Text style={GlobalStyles.headingTxt}>  Изменение профиля</Text>
                </View>
            </OtrixHeader>
            <OtrixDivider size={'md'} />
            {/* Content Start from here */}
            <OtrixContent>

                {/* Profile  Start from here */}
                <FormControl>
                    <Input variant="outline"
                        type="text"
                        value={first_name}
                        placeholder="Имя" style={GlobalStyles.textInputStyle}
                        onChangeText={(value) => setState({ ...state, first_name: value })}
                             
                        
                    />
                </FormControl>

                <OtrixDivider size={'md'} />
                <FormControl >
                    <Input variant="outline"
                        type="text"
                        value={last_name}
                        placeholder="Фамилия" style={GlobalStyles.textInputStyle}
                        onChangeText={(value) => setState({ ...state, last_name: value })}
                    />
                </FormControl>
                <OtrixDivider size={'md'} />

                <FormControl>
                    <Input variant="outline"
                        type="text"
                        value={email}
                        keyboardType="email-address"
                        placeholder="Эл. почта" style={GlobalStyles.textInputStyle}
                        onChangeText={(value) => setState({ ...state, email: value })}
                    />
                </FormControl>
                <OtrixDivider size={'md'} />

                <FormControl>
                    <Input variant="outline"
                        type="text"
                        value={phone}
                        keyboardType="number-pad"
                        placeholder="Номер телефона" style={GlobalStyles.textInputStyle}
                        onChangeText={(value) => setState({ ...state, phone: value })}
                    />
                </FormControl>
                <OtrixDivider size={'md'} />
                <Button
                    size="md"
                    variant="solid"
                    bg={Colors.themeColor}
                    style={GlobalStyles.button}
                    onPress={() => {
                        props.navigation.navigate('ProfileScreen')
                        props.updateProfile({
                            "name": first_name == ''? data.name: first_name+" "+ last_name,
                            "email": email == ''? data.email: email,
                            "mobile": phone == ''? data.mobile: phone
                        })
                    }}
                >
                    <Text style={GlobalStyles.buttonText}>Изменить</Text>
                </Button>
                <OtrixDivider size={'md'} />



            </OtrixContent>

        </OtrixContainer >
    )

}

function mapStateToProps(state) {
    return {
        data: state.profile
    }
}

export default connect(mapStateToProps, { requestInit, updateProfile })(EditProfileScreen);

const styles = StyleSheet.create({


});