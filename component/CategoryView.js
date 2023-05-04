import React, { useEffect, } from "react";
import { View, StyleSheet, Text, FlatList, Image } from 'react-native';
import { Colors } from '@helpers'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CategoryDummy from './items/CategoryDummy';
import OtrixDivider from './OtrixComponent/OtrixDivider';
import Fonts from '@helpers/Fonts';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { fetchCategories, catProductListRequest } from '@actions';
import { connect, useDispatch } from 'react-redux';

function CategoryView(props) {
    const { categories } = props;
    const category = categories
    

    const catProductList = async (id) => {
        props.catProductListRequest(id);

    }
    
    const dispatch = useDispatch();

    useEffect(() => {
        //props.fetchCategoriesRequest();
        dispatch(fetchCategories());
      }, [dispatch]);

    return (
        <>
            <OtrixDivider size={'sm'} />
            <FlatList
                style={{ padding: wp('0.4%') }}
                data={category}
                scrollEnabled={false}
                contentContainerStyle={{flex: 1,}}
                horizontal={false}
                numColumns={2}
                onEndReachedThreshold={0.7}
                showsVerticalScrollIndicator={false}
                listKey = {(index) => index.toString()}
                keyExtractor={(item, index) => item.id ? String(item.id) : String(index)}
                renderItem={({ item }) =>
                    <TouchableOpacity key={item.id} style={styles.categoryBox} onPress={() => {
                        catProductList(item.id)
                        props.navigation.navigate('ProductListScreen', { 
                            title: item.title.ru,
                            data: "category"
                             })}}>
                        <View style={styles.imageView}>
                            <Image source={{uri: "https://aress.kz/images/category/"+item.image} } style={styles.image}></Image>
                        </View>
                        <View style={styles.infromationView}>
                            <Text style={styles.categoryName}>{item.title.ru}</Text>
                        </View>
                    </TouchableOpacity>
                }>
            </FlatList>
        </>
    )
}


const mapStateToProps = (state) => ({
    categories: state.categories.categories
  });
  

  
export default connect(mapStateToProps, { fetchCategories, catProductListRequest })(CategoryView);

const styles = StyleSheet.create({
    categoryBox: {
        justifyContent: 'center',
        alignItems: 'center',
        height: hp('25%'),
        width: wp('43%'),
        maxWidth: wp('44%'),
        marginHorizontal: wp('1.8%'),
        flex: 0.5,
        backgroundColor: Colors.white,
        marginBottom: wp('3%'),
        borderRadius: wp('2%'),
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 0.4 },
        shadowOpacity: 0.30,
        shadowRadius: 3,
        elevation: 6,
        flexDirection: 'column',

    },
    imageView: {
        flex: 0.90,
        backgroundColor: Colors.ligth_white,
        // backgroundColor: Colors.themeYellow,
        width: wp('36.5%'),
        borderTopStartRadius: wp('2%'),
        borderTopEndRadius: wp('2%'),
        marginTop: hp('1.4%'),
        marginBottom: hp('1%')
    },
    image: {
        resizeMode: 'contain',
        alignSelf: 'center',
        height: hp('18%'),
        width: wp('40%')
    },
    infromationView: {
        flex: 0.15,
        width: wp('36%'),
        marginBottom: hp('1.4%')
    },
    categoryName: {
        textAlign: 'center',
        fontSize: wp('4.5%'),
        fontFamily: Fonts.Font_Bold,
    }
});