import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';


export default function StartPage() {
    return (
        <View style={styles.container}>
            <ActivityIndicator style={styles.circle} />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle:{
        transform:[{scale: 2}],
        color: "gray",
    },
});
