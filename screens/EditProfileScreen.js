import React, { useEffect } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { requestInit } from '@actions';
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
    const [state, setState] = React.useState({ first_name: 'Aress', last_name: "User", email: "Aress@mail.com", phone: "9898989898", submited: false });
    const { first_name, last_name, email, phone, submited } = state;
    return (
        <OtrixContainer>

            {/* Header */}
            <OtrixHeader customStyles={{ backgroundColor: Colors.light_white }}>
                <TouchableOpacity style={GlobalStyles.headerLeft} onPress={() => props.navigation.goBack()}>
                    <OtirxBackButton />
                </TouchableOpacity>
                <View style={[GlobalStyles.headerCenter, { flex: 1 }]}>
                    <Text style={GlobalStyles.headingTxt}>  Edit Profile</Text>
                </View>
            </OtrixHeader>
            <OtrixDivider size={'md'} />
            {/* Content Start from here */}
            <OtrixContent>

                {/* Profile  Start from here */}
                <FormControl isRequired isInvalid={submited && first_name == '' ? true : false}>
                    <Input variant="outline"
                        type="text"
                        value={first_name}
                        placeholder="First Name" style={GlobalStyles.textInputStyle}
                        onChangeText={(value) => setState({ ...state, first_name: value })}
                             
                        
                    />
                    <FormControl.ErrorMessage
                        leftIcon={<InfoOutlineIcon size="xs" />}
                    >
                        First Name is required
                    </FormControl.ErrorMessage>
                </FormControl>

                <OtrixDivider size={'md'} />
                <FormControl >
                    <Input variant="outline"
                        type="text"
                        value={last_name}
                        placeholder="Last Name" style={GlobalStyles.textInputStyle}
                        onChangeText={(value) => setState({ ...state, last_name: value })}
                    />
                </FormControl>
                <OtrixDivider size={'md'} />

                <FormControl isRequired isInvalid={submited && email == '' ? true : false}>
                    <Input variant="outline"
                        type="text"
                        value={email}
                        keyboardType="email-address"
                        placeholder="Email Address" style={GlobalStyles.textInputStyle}
                        onChangeText={(value) => setState({ ...state, email: value })}
                    />
                    <FormControl.ErrorMessage
                        leftIcon={<InfoOutlineIcon size="xs" />}
                    >
                        Email is required
                    </FormControl.ErrorMessage>
                </FormControl>
                <OtrixDivider size={'md'} />

                <FormControl isRequired isInvalid={submited && phone == '' ? true : false}>
                    <Input variant="outline"
                        type="text"
                        value={phone}
                        keyboardType="number-pad"
                        placeholder="Mobile Number" style={GlobalStyles.textInputStyle}
                        onChangeText={(value) => setState({ ...state, phone: value })}
                    />
                    <FormControl.ErrorMessage
                        leftIcon={<InfoOutlineIcon size="xs" />}
                    >
                        Mobile Number is required
                    </FormControl.ErrorMessage>
                </FormControl>
                <OtrixDivider size={'md'} />
                <Button
                    size="md"
                    variant="solid"
                    bg={Colors.themeColor}
                    style={GlobalStyles.button}
                    onPress={() => props.navigation.navigate('MainScreen')}
                >
                    <Text style={GlobalStyles.buttonText}>Update</Text>
                </Button>
                <OtrixDivider size={'md'} />



            </OtrixContent>

        </OtrixContainer >
    )

}

function mapStateToProps({ params }) {
    return {}
}

export default connect(mapStateToProps, { requestInit })(EditProfileScreen);

const styles = StyleSheet.create({


});