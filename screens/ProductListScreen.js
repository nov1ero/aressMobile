import React, { useEffect, useState } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    FlatList,
    Modal,
    Image
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { connect } from 'react-redux';
import {
    OtrixContainer, OtrixHeader, OtrixContent, OtrixDivider, ProductView, OtirxBackButton, OtrixLoader, FilterTags, FilterComponent
} from '@component';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { GlobalStyles, Colors } from '@helpers';
import { _roundDimensions } from '@helpers/util';
import FilterTagsDummy from '@component/items/FilterTagsDummy';
import { addToWishList, removeFromWishlist } from '@actions';
import ProductListDummy from '@component/items/ProductListDummy';
import { filter } from '@common';
import { _addToWishlist, _getWishlist, logfunction } from "@helpers/FunctionHelper";
//import { ProductListSkeleton } from '@skeleton';

function ProductListScreen(props) {
    const [state, setState] = useState({ selectedFilters: [], filterModelVisible: false, loading: true });

    useEffect(() => {
        let wishlistData =  props.wishlistArr;
        let loadPage = setTimeout(() => setState({ ...state, loading: false}), 500);

        return () => {
            clearTimeout(loadPage);
        };
    }, [wishlistData]);
  
  

    //when filter tag clicked
    const filterClick = (value) => {
        const { selectedFilters } = state;
        if (selectedFilters.includes(value)) {
            const index = selectedFilters.indexOf(value);
            if (index > -1) {
                selectedFilters.splice(index, 1);
            }
            setState({
                ...state,
                selectedFilters: selectedFilters
            })

        }
        else {
            setState({
                ...state,
                selectedFilters: [...selectedFilters, value]
            });
        }
    }

    const closeFilterModel = () => {
        setState({
            ...state,
            filterModelVisible: false
        });
    }

    const addToWishlist = async (id) => {
        // let wishlistData = await _addToWishlist(id);
        props.addToWishList(id);
    }
    const removeFromWishlist = async (id) => {
        props.removeFromWishlist(id);
    }

    const { title } = props.route.params;
    const { selectedFilters, loading, filterModelVisible, } = state;
    const { wishlistArr } = props;

    return (
        <OtrixContainer customStyles={{ backgroundColor: Colors.light_white }}>

            {/* Header */}
            <OtrixHeader customStyles={{ backgroundColor: Colors.light_white }}>
                <TouchableOpacity style={GlobalStyles.headerLeft} onPress={() => props.navigation.goBack()}>
                    <OtirxBackButton />
                </TouchableOpacity>
                <View style={[GlobalStyles.headerCenter]}>
                    <Text style={GlobalStyles.headingTxt}>{title}</Text>
                </View>
                <TouchableOpacity style={GlobalStyles.headerRight} onPress={() => setState({ ...state, filterModelVisible: true })}>
                    <Image source={filter} style={styles.filter} />
                </TouchableOpacity>
            </OtrixHeader>

            <OtrixDivider size={'sm'} />

            {/* Horizontal Tag List */}
            <View style={{ height: hp('6%') }}>
                <ScrollView style={{ flexDirection: 'row', marginHorizontal: wp('1%') }} horizontal={true} showsHorizontalScrollIndicator={false} >
                    {
                        FilterTagsDummy.map((item, index) =>
                            <FilterTags tagName={item.name} tagID={item.id} key={item.id} selected={selectedFilters} onFilterPress={filterClick} />
                        )
                    }
                </ScrollView>
            </View>

            {/* Content Start from here */}
            {
                loading ? <View /> : <OtrixContent >
                    <OtrixDivider size={'md'} />
                    {/* Product View */}
                    <FlatList
                        style={{ padding: wp('1%') }}
                        data={ProductListDummy}
                        scrollEnabled={false}
                        contentContainerStyle={{
                            flex: 1,
                        }}
                        horizontal={false}
                        numColumns={2}
                        onEndReachedThreshold={0.7}
                        showsVerticalScrollIndicator={false}
                        listKey = {(contact, index) => index.toString()}
                        keyExtractor={(contact, index) => index.toString()}
                        renderItem={({ item, index }) =>
                            <ProductView data={item} key={item.id} imageViewBg={Colors.white} navToDetail={() => props.navigation.navigate('ProductDetailScreen', { id: item.id })} addToWishlist={addToWishlist} removeFromWishlist={removeFromWishlist} wishlistArray={wishlistArr} />
                        }>
                    </FlatList>
                </OtrixContent>
            }
            {/* Fitler Model Start From Here */}
            <Modal visible={filterModelVisible}>
                <FilterComponent selectedFilter={selectedFilters} onFilterPress={filterClick} closeFilter={closeFilterModel} />
            </Modal>

        </OtrixContainer >
    )
}

function mapStateToProps(state) {
    return {
        wishlistData: state.wishlist.wishlistData,
        wishlistArr: state.wishlist.wishlistArr
    }
}

export default connect(mapStateToProps, { addToWishList, removeFromWishlist })(ProductListScreen);

const styles = StyleSheet.create({

    menuImage: {
        width: wp('5%'),
        height: hp('4%'),
        tintColor: Colors.secondry_text_color,
    },

    filter: {
        height: _roundDimensions()._height * 0.028,
        width: _roundDimensions()._height * 0.028,
    },
    bannerStyle: {
        resizeMode: 'contain',
        width: wp('100%'),
        height: hp('16%'),
        alignSelf: 'center'
    },
    modelView: {
        height: hp('100%'),
        width: wp('100%'),
        backgroundColor: Colors.light_white,
    },
});