import { Linking } from 'react-native'
import Toast from 'react-native-root-toast';
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function chatSupport() {
    const link = 'whatsapp://send?text=Hello Aress&phone=9898'
    Linking.canOpenURL(link)
        .then(supported => {
            if (!supported) {
                Toast.show('Whatsapp not installed', {
                    duration: 2000,
                    position: Toast.positions.CENTER,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    delay: 0,
                })
                // alert('Please Install Whatsapp To Send Direct Message');
            } else {
                Linking.openURL(link);
            }
        })
}

const logprint = false

export function  logfunction(tag, message) {
    if (logprint) {
        //console.log(tag, message)
    }
}

export async function _getWishlist() {
    let getWishlistData = await AsyncStorage.getItem('GET_LOCAL_WISHLIST');
    getWishlistData = JSON.parse(getWishlistData);
    return getWishlistData;
}

export async function _addToWishlist(id, name, price, image) {

    
    let getWishlistData = await AsyncStorage.getItem('GET_LOCAL_WISHLIST');
    getWishlistData = JSON.parse(getWishlistData);
    let storeToarr;
    if (getWishlistData != null && getWishlistData.length > 0) {
        const existingIndex = getWishlistData.findIndex((item) => item.id === id);
        if (existingIndex === -1) {
            // Product not in wishlist yet, add it to the list
            const product = { id, name, price, image };
            getWishlistData.push(product);
            storeToarr = getWishlistData;
        } else {
            // Product already in wishlist, remove it from the list
            getWishlistData.splice(existingIndex, 1);
            storeToarr = getWishlistData;
        }
    } else {
        // Wishlist is empty, add the product to the list
        const product = { id, name, price, image };
        storeToarr = [product];
    }
    await AsyncStorage.setItem('GET_LOCAL_WISHLIST', JSON.stringify(storeToarr));
    return storeToarr;
}



export async function _getLocalCart() {
    let data = await AsyncStorage.getItem('CART_DATA');
    data = JSON.parse(data);
    return data;
}