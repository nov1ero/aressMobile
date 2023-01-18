import React, { useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { GlobalStyles, Colors } from '@helpers'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TrendingProductDummy from '../items/TrendingProductDummy';
import OtrixDivider from '../OtrixComponent/OtrixDivider';
import ProductView from '../ProductCompnent/ProductView';
import Fonts from '@helpers/Fonts';
import { logfunction } from "@helpers/FunctionHelper";

function FreaturedProduct(props) {

    const featuredProducts = props?.featuredProducts;
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
                data={featuredProducts}
                contentContainerStyle={{
                    flex: 1,
                }}
                horizontal={false}
                numColumns={2}
                scrollEnabled={false}
                ListHeaderComponent={() =>
                    <>
                        <View style={styles.catHeading}>
                            <Text style={GlobalStyles.boxHeading}>Рекомендованные</Text>
                            <TouchableOpacity style={{ flex: 0.50 }} onPress={() => props.navigation.navigate('ProductListScreen', { title: 'Trending Products' })}>
                                <Text style={GlobalStyles.viewAll}>Посмотреть все</Text>
                            </TouchableOpacity>
                        </View>
                        <OtrixDivider size={'sm'} />
                    </>
                }
                onEndReachedThreshold={0.7}
                showsVerticalScrollIndicator={false}
                keyExtractor={(contact, index) => String(index)}
                renderItem={({ item, index }) =>
                    <ProductView data={item} key={item.id} navToDetail={navigateToDetailPage} addToWishlist={addToWishlist} wishlistArray={wishlistArr} />
                }>
            </FlatList>

        </>


    )
}

export default FreaturedProduct;

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