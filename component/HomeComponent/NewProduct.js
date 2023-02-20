import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView, LogBox } from 'react-native';
import { GlobalStyles, Colors, } from '@helpers'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import NewProductDummy from '../items/NewProductDummy';
import OtrixDivider from '../OtrixComponent/OtrixDivider';
import ProductView from '../ProductCompnent/ProductView';
import Fonts from '@helpers/Fonts';
import { logfunction } from "@helpers/FunctionHelper";
import { FlatList } from 'react-native-gesture-handler';

function NewProduct(props) {

    const newProductsList = props?.newProducts[0]?.products;
    const path = props?.categories?.path;
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
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    style={{ padding: wp('1%') }}
                    data={newProductsList}
                    contentContainerStyle={{
                        flex: 1,
                    }}
                    numColumns={2}
                    scrollEnabled={false}
                    nestedScrollEnabled={true}
                    initialNumToRender={4}
                    ListHeaderComponent={() =>
                        <>
                            <View style={styles.catHeading}>
                                <Text style={GlobalStyles.boxHeading}>Новые товары</Text>
                                <TouchableOpacity style={{ flex: 0.50 }} onPress={() => props.navigation.navigate('ProductListScreen', { title: 'Новые товары' })}>
                                    <Text style={GlobalStyles.viewAll}>Посмотреть все</Text>
                                </TouchableOpacity>
                            </View>
                            <OtrixDivider size={'sm'} />
                        </>
                    }
                    listKey = {(item, index) => index.toString()}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <ProductView data={item} key={item.id} navToDetail={navigateToDetailPage} addToWishlist={addToWishlist} wishlistArray={wishlistArr} />
                    }>
                </FlatList>
            </SafeAreaView>
        </>
    )
}

export default NewProduct;

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