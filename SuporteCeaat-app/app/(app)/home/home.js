import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useAuth } from '../../../context/authContext';

const Home = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.infocontainer}>
                <Text style={styles.welcomeText}>Bem-vindo ao App!</Text>
                <Text style={styles.placeholderText}>Em breve, mais informações sobre o app aqui.</Text>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    infocontainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    placeholderText: {
        fontSize: 14,
        color: '#888',
        marginBottom: 20,
    },
    Button:{
        marginBottom: 20,
    },
});

export default Home;