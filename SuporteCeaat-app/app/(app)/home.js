import React from 'react';
import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import { router, Stack } from 'expo-router';
import { useAuth } from '../../context/authContext';

const Home = () => {

    const{logout} = useAuth()
    const handleLogout = async () =>{
        await logout()

    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <Text style={styles.welcomeText}>Bem-vindo ao App!</Text>
            <Text style={styles.placeholderText}>Em breve, mais informações sobre o app aqui.</Text>

            <Button 
                title='Deslogar'
                onPress={handleLogout}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
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
});

export default Home;
