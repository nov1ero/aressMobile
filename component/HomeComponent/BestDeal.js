import React, { useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { GlobalStyles, Colors } from '@helpers'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DealProductDummy from '../items/DealProductDummy';
import OtrixDivider from '../OtrixComponent/OtrixDivider';
import DealsProductView from './DealsProductView';
import Fonts from '@helpers/Fonts';
import { logfunction } from "@helpers/FunctionHelper";

function BestDeal(props) {

    const navigateToDetailPage = (data) => {
        props.navigation.navigate('ProductDetailScreen', { id: data.productid })
    }

    const addToWishlist = async (id) => {
        props.addToWishlist(id);
        // logfunction(" wishlist Data ", wishlistData)
    }

    const { wishlistArr } = props;
    return (
        <>

            <FlatList
                style={{ padding: wp('1%') }}
                scrollEnabled={false}

                data={DealProductDummy}
                contentContainerStyle={{
                    flex: 1,
                }}
                horizontal={false}
                ListHeaderComponent={() =>
                    <>
                        <View style={styles.catHeading}>
                            <Text style={GlobalStyles.boxHeading}>Deals of the day</Text>
                            <TouchableOpacity style={{ flex: 0.50 }} onPress={() => props.navigation.navigate('ProductListScreen', { title: 'Deals of the day' })}>
                                <Text style={GlobalStyles.viewAll}>View All</Text>
                            </TouchableOpacity>
                        </View>
                        <OtrixDivider size={'sm'} />
                    </>
                }
                numColumns={2}
                onEndReachedThreshold={0.7}
                showsVerticalScrollIndicator={false}
                keyExtractor={(contact, index) => String(index)}
                renderItem={({ item, index }) =>
                    <DealsProductView data={item} key={item.id} navToDetail={navigateToDetailPage} addToWishlist={addToWishlist} wishlistArray={wishlistArr} />
                }>
            </FlatList>
        </>


    )
}

export default BestDeal;

const styles = StyleSheet.create({
    catHeading: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: hp('1%')
    },
    catBox: {
        height: hp('12.5%'),
        width: wp('15%'),
        marginHorizontal: wp('1%'),
        borderRadius: 5,
    },
    imageView: {
        resizeMode: 'contain',
        alignSelf: 'center',
        height: hp('7.5%'),
        borderRadius: 5
    },
    catName: {
        fontSize: wp('3.3%'),
        fontFamily: Fonts.Font_Reguler,
        textAlign: 'center',
        color: Colors.text_color
    }

});