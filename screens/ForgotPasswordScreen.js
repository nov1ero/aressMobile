import React from "react";
import { requestInit } from '@actions';
import {
    OtrixContainer, OtrixHeader, OtrixContent, OtrixDivider
} from '@component';
import { Input, Text, FormControl, Button } from "native-base"
import { connect } from 'react-redux';
import { GlobalStyles, Colors } from '@helpers'

function ForgotPasswordScreen(props) {
    const [formData, setData] = React.useState({});

    return (
        <OtrixContainer>

            {/* Header */}
            <OtrixHeader customStyles={GlobalStyles.authHeader}>
                <Text style={[GlobalStyles.authtabbarText]}>Забыли Пароль</Text>
                <Text style={GlobalStyles.authSubText}>Отправьте свою электронную почту с которой вы проходили регистрацию чтобы сбросить пароль</Text>
            </OtrixHeader>
            <OtrixDivider size={'md'} />

            {/* Content Start from here */}
            <OtrixContent>

                {/* Forgot password form Start from here */}
                <FormControl isRequired>
                    <Input variant="outline" placeholder="Электронная почта" style={GlobalStyles.textInputStyle}
                        onChangeText={(value) => setData({ ...formData, email: value })}
                    />
                    <FormControl.ErrorMessage _text={{ fontSize: 'xs' }}>Ошибка!</FormControl.ErrorMessage>
                </FormControl>
                <OtrixDivider size={'md'} />
                <Button
                    size="md"
                    variant="solid"
                    bg={Colors.themeColor}
                    style={GlobalStyles.button}
                    onPress={() => props.navigation.navigate('LoginScreen')}
                >
                    <Text style={GlobalStyles.buttonText}>Отправить</Text>
                </Button>
                <OtrixDivider size={'md'} />
                <Button
                    size="md"
                    variant="outline"
                    onPress={() => props.navigation.navigate('LoginScreen')}
                >
                    <Text style={[GlobalStyles.buttonText, { color: Colors.black }]}>Назад к Логину</Text>
                </Button>

            </OtrixContent>

        </OtrixContainer >
    )

}

function mapStateToProps({ params }) {
    return {}
}

export default connect(mapStateToProps, { requestInit })(ForgotPasswordScreen);
