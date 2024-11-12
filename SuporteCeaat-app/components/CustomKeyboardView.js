import { View, Text, KeyboardAvoidingView, ScrollView, Platform} from  'react-native';
import React from 'react';


const android = Platform.OS == "android";

export default function CustomKeyBoardView({children, inChat}){

    let kavConfig = {};
    let scrollViewConfig = {};
    if(inChat){
        kavConfig ={keyboadVerticalOffset: 90};
        scrollViewConfig = {contentContainerStyle: {flex: 1}}
    } 



    return(
        <KeyboardAvoidingView 
            behavior={android? 'padding': 'height'}
            style={{flex: 1}}
            {...kavConfig}

            >
            <ScrollView
                style={{flex: 1}}
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flex:1}}
                {...scrollViewConfig}
            >
                {
                    children
                }
            </ScrollView>
        </KeyboardAvoidingView>
    )
}