import React from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { GlobalStyles, Colors } from '@helpers'
import { homeSlider1, homeSlider2, homeSlider3, homeSlider4 } from '@common';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Input, InputGroup, InputLeftAddon } from "native-base"
import Icon from 'react-native-vector-icons/FontAwesome';
import Fonts from '@helpers/Fonts';

function SearchBar(props) {
    const images = [
        homeSlider1,
        homeSlider2,
        homeSlider3,
        homeSlider4,
    ];
    return (
        <TouchableOpacity style={styles.searchView} onPress={() => {
            props.navigation.navigate('SearchScreen')}}>
            <View style={styles.searchContainer}>
                <Input w={{
                    base: "100%",
                    md: "25%"
                }} InputLeftElement={<Icon name="search" style={styles.searchIcon} />} style={{ display: 'flex', width: "100%" } [styles.textInputSearchStyle]} placeholder="Поиск" isDisabled="true" />
                
            </View>

        </TouchableOpacity>


    )
}

export default SearchBar;
const styles = StyleSheet.create({
    searchView: {
        height: hp('9%'),
        backgroundColor: Colors.white,
        borderRadius: 8
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        // alignItems: 'center',
        marginTop: 10,
        marginLeft: 3,
        marginRight: 3,
        borderRadius: 8,
        backgroundColor: Colors.light_white,
        height: hp('6%'),
    },
    searchIcon: {
        flex: 0.10,
        color: Colors.secondry_text_color,
        fontSize: wp('3.5%'),
        alignSelf: 'center',
        textAlign: 'center'
    },
    verticalLine: {
        width: 0.07,
        height: hp('2.5%'),
        backgroundColor: Colors.secondry_text_color,
    },
    textInputSearchStyle: {
        flex: 0.90,
        fontFamily: Fonts.Font_Reguler,
        backgroundColor: Colors.light_white,
        fontSize: wp('3.2%'),
        borderRadius: 5,
        color: Colors.secondry_text_color,
        borderWidth: 0
    },
});