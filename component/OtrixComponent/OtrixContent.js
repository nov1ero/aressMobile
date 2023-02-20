import React from 'react';
import { View, SafeAreaView} from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { GlobalStyles, Colors } from '@helpers'

function OtrixContent(props) {
    return (

        <ScrollView
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={10}
            bounces={false}
            scrollEnabled={true}
            nestedScrollEnabled={true}
            style={[GlobalStyles.contentView, props.customStyles]} >
            {
                props.children
            }
        </ScrollView>

    )
}

export default OtrixContent;
