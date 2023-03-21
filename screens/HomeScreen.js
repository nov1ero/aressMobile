import React, { useEffect } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,

} from "react-native";
import { connect } from 'react-redux';
import {
    OtrixContainer, OtrixHeader, OtrixContent, OtrixDivider, HomeSlider,
    HomeCategoryView, SearchBar, NewProduct, FeaturedProduct, BestDeal
} from '@component';
//import { HomeSkeleton } from '@skeleton';

import { addToWishList, getHomeRequest } from '@actions';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors, GlobalStyles } from '@helpers';
import { Avatar, Badge } from "native-base";
import { heart, offerBanner, avatarImg, avatarImg2 } from '@common';
import Fonts from "@helpers/Fonts";
import { _roundDimensions } from '@helpers/util';
import { _addToWishlist, logfunction } from "@helpers/FunctionHelper";

function HomeScreen(props) {
    const [state, setState] = React.useState({ notificationCount: 9, loading: true });

    const addToWish = async (id) => {
        let wishlistData = await _addToWishlist(id);
        props.addToWishList(wishlistData);
    }

    useEffect(() => {
        props.getHomeRequest();
        setState(
            {
                ...state,
                loading: false
            }
        )

    }, [getHomeRequest]);

    const { loading } = state;
    const { authStatus, wishlistData, wishlistCount, homeData } = props;
    return (

        <OtrixContainer customStyles={{ backgroundColor: Colors.white }}>

            {/* Header */}
            <OtrixHeader customStyles={{ backgroundColor: Colors.white }}>
                <TouchableOpacity style={styles.headerLeft} onPress={() => props.navigation.navigate('ProfileScreen')}>
                    {
                        authStatus ?
                            <Avatar
                                ml="3"
                                size="sm"
                                style={styles.avatarImg}
                                source={avatarImg}
                            >
                            </Avatar>
                            : <Avatar
                                ml="3"
                                size="sm"
                                style={styles.avatarImg}
                                source={avatarImg2}
                            >
                            </Avatar>
                    }
                </TouchableOpacity>
                <View style={styles.headerCenter}>
                    <Text style={styles.headingTxt}>Aress</Text>
                </View>

                {
                    !loading &&
                    <TouchableOpacity style={styles.headerRight} onPress={() => props.navigation.navigate('WishlistScreen')}>
                        <Image source={heart} style={styles.heartIcon}></Image>
                        {
                            wishlistCount > 0 &&
                            <Badge style={[GlobalStyles.badge, {
                                height: wishlistCount > 9 ? _roundDimensions()._height * 0.042 : _roundDimensions()._height * 0.038,
                                width: wishlistCount > 9 ? _roundDimensions()._height * 0.042 : _roundDimensions()._height * 0.038,
                                borderRadius: _roundDimensions()._borderRadius,
                                right: wishlistCount > 9 ? -wp('0.6%') : wp('0.2%'),
                                top: wishlistCount > 9 ? -hp('0.5%') : hp('0.1%')
                            }]}>

                                <Text style={[GlobalStyles.badgeText, styles.countText, { fontSize: wishlistCount > 9 ? wp('2.2%') : wp('3%') }]}>{wishlistCount}</Text>
                            </Badge>
                        }

                    </TouchableOpacity>
                }


            </OtrixHeader>

            {
                loading ? <View /> :
                
                    <OtrixContent >

                        {/* SearchBar Component */}
                        <SearchBar navigation={props.navigation} />

                        {/* HomeCategoryView Component */}
                        {/* <HomeCategoryView categories={homeData.categories} navigation={props.navigation} /> */}
                        {/* HomeSlider Component */}
                        <HomeSlider sliders={homeData.sliders} />
                        <OtrixDivider size={'md'} />

                        {/* NewProduct Component */}
                        <NewProduct newProducts={homeData.newProducts} navigation={props.navigation} wishlistArr={wishlistData} addToWishlist={addToWish} />

                        {/* Banner Image */}
                        {/* <Image source={offerBanner} style={styles.bannerStyle} /> */}
                        <OtrixDivider size={'sm'} />

                        {/* BestDeal Component */}
                        {/* <BestDeal navigation={props.navigation} wishlistArr={wishlistData} addToWishlist={addToWish} /> */}
                        <OtrixDivider size={'sm'} />

                        {/* TrendingProduct Component */}
                        <FeaturedProduct featuredProducts={homeData.featuredProducts} navigation={props.navigation} wishlistArr={wishlistData} addToWishlist={addToWish} />
                        <OtrixDivider size={'sm'} />
                        {/* BestDeal Component */}
                        {/* <BestDeal navigation={props.navigation} wishlistArr={wishlistData} addToWishlist={addToWish} /> */}
                        <OtrixDivider size={'sm'} />

                    </OtrixContent>
            }


        </OtrixContainer >
    )
}

function mapStateToProps(state) {
    return {
        authStatus: state.auth.authStatus,
        wishlistData: state.wishlist.wishlistData,
        wishlistCount: state.wishlist.wishlistCount,
        homeData: state.home.homeData

    }
}

export default connect(mapStateToProps, { addToWishList, getHomeRequest })(HomeScreen);

const styles = StyleSheet.create({
    headerRight: {
        flex: 0.15,
        marginRight: wp('2%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    heartIcon: {
        width: wp('6.5%'),
        height: hp('6.5%'),
        resizeMode: 'contain',
        tintColor: Colors.custom_pink,
    },
    headerCenter: {
        flex: 0.75,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headingTxt: {
        fontFamily: Fonts.Font_Bold,
        fontSize: wp('6.5%'),
        color: Colors.themeColor
    },
    headerLeft: {
        flex: 0.15,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    bannerStyle: {
        resizeMode: 'contain',
        width: wp('100%'),
        height: hp('16%'),
        alignSelf: 'center'
    },
    avatarImg: {
        height: 35,
        width: 35,
        resizeMode: 'contain'
    }
});