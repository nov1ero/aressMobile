import React, { useEffect, useImperativeHandle, useState, memo, useRef } from "react";
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableOpacity
} from "react-native";
import { TextInput, ScrollView } from 'react-native';

import {
    OtrixContainer, OtrixHeader, OtrixContent, OtrixDivider, OtrixSocialContainer
} from '@component';
import { Input, Text, FormControl, Button } from "native-base"
import { connect } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { GlobalStyles, Colors } from '@helpers'
import Icon from 'react-native-vector-icons/Ionicons';
import Fonts from "../helpers/Fonts";
import { loginRequest } from '@actions';
import { debounce } from 'lodash';
// import { Input } from '@chakra-ui/input';

function LoginScreen(props) {


    // const [formEmail, setEmail] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [state, setDatapassword] = useState({ secureEntry: true });
    const isAuthenticated = props.isAuthenticated;
    const [Disabled, setIsDisabled] = useState(false);

  const handlePress = () => {
    setIsDisabled(true);
    props.loginRequest({email:email, password:password});
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    setIsDisabled(false);
  }
  const handlePasswordChange = (value) => {
    setPassword(value);
    setIsDisabled(false);
  }

    useEffect(() => {
        if(isAuthenticated == true){
            props.navigation.navigate('HomeScreen')
        }
    }, [isAuthenticated]);


    return (
        // <ScrollView keyboardShouldPersistTaps="always">
        <OtrixContainer>

            {/* Header */}
            <OtrixHeader customStyles={GlobalStyles.authHeader}>
                <Text style={[GlobalStyles.authtabbarText]}>Войти</Text>
                <Text style={GlobalStyles.authSubText}>Введите вашу почту и пароль чтобы войти</Text>
            </OtrixHeader>
            <OtrixDivider size={'md'} />

            {/* Content Start from here */}
            <OtrixContent >
                {/* Login Form Start from here */}
                <FormControl isRequired>
                    <Input
                        variant="outline" 
                        placeholder="Почта" 
                        onChangeText={handleEmailChange}
                        style={[GlobalStyles.textInputStyle]}
                    />
                    <FormControl.ErrorMessage _text={{ fontSize: 'xs' }}>Неправильная почта</FormControl.ErrorMessage>
                </FormControl>
                <OtrixDivider size={'sm'} />
                <FormControl isRequired style={{ backgroundColor: Colors.white }}>
                    <Input 
                        variant="outline" 
                        placeholder="Пароль" 
                        style={[GlobalStyles.textInputStyle,]}
                        value={password}
                        secureTextEntry={state.secureEntry}
                        onChangeText={handlePasswordChange}
                        InputRightElement={
                            <TouchableOpacity onPress={() => setDatapassword({ ...state, secureEntry: !state.secureEntry })} style={[{ marginRight: wp('3%'), padding: 3 }]}>
                                <Icon name={state.secureEntry == true ? "eye" : "eye-off"} size={18} color={Colors.secondry_text_color} />
                            </TouchableOpacity>
                        }
                    />
                    <FormControl.ErrorMessage _text={{ fontSize: 'xs' }}>Неправильный пароль</FormControl.ErrorMessage>
                </FormControl>
                <TouchableOpacity onPress={() => props.navigation.navigate('ForgotPasswordScreen')}>
                    <Text style={styles.forgotPassword}>Забыли пароль?</Text>
                </TouchableOpacity>
                <OtrixDivider size={'md'} />
                <Button
                    size="md"
                    variant="solid"
                    bg={Colors.themeColor}
                    style={GlobalStyles.button}
                    isDisabled={Disabled}
                    onPress={handlePress}
                >
                    <Text style={GlobalStyles.buttonText}>Войти</Text>
                </Button>
                <OtrixDivider size={'md'} />
                <View style={styles.registerView}>
                    <Text style={styles.registerTxt}>Все еще нет аккаунта?</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('RegisterScreen')}>
                        <Text style={styles.signupTxt}> Регистрация </Text>
                    </TouchableOpacity>
                </View>
                <OtrixDivider size={'md'} />
                {/* Social Container Component */}
                {/* <OtrixSocialContainer /> */}

            </OtrixContent>

        </OtrixContainer >
        // </ScrollView>
    )

}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        
    }
}

export default memo(connect(mapStateToProps, { loginRequest })(LoginScreen));

const styles = StyleSheet.create({
    forgotPassword: {
        fontSize: wp('3%'),
        textAlign: 'right',
        fontFamily: Fonts.Font_Reguler,
        color: Colors.link_color,
        padding: 5
    },
    registerView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    registerTxt: {
        fontSize: wp('3.5%'),
        textAlign: 'center',
        fontFamily: Fonts.Font_Reguler,
        color: Colors.secondry_text_color
    },
    signupTxt: {
        fontSize: wp('3.5%'),
        textAlign: 'right',
        fontFamily: Fonts.Font_Semibold,
        color: Colors.link_color
    },

});