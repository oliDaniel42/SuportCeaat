import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { moderateScale } from 'react-native-core-responsive-screen';
import Loading from '../components/Loading';
import CustomKeyBoardView from '../components/CustomKeyboardView';
import { useAuth } from '../context/authContext';
import { useRole } from './inicial';

export default function RegisterScreen() {
    const router = useRouter();
    const { register } = useAuth();
    const { role } = useRole();
    
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const usernameRef = useRef('');

    const handleRegister = async () => {
        if (!emailRef.current || !passwordRef.current || !usernameRef.current) {
            Alert.alert('Informações incompletas', 'Preencha todos os campos');
            return;
        }
   
        Loading(true);
        let response = await register(usernameRef.current, emailRef.current, passwordRef.current, role);
        Loading(false);

        if (!response) {
            Alert.alert('Erro no cadastro');
            return;
        }

       if (role === 'Aluno(a)') {
            router.replace('alunoRegister');
        } else if (role) {
            router.replace('home');
        } else {
            Alert.alert('Erro', 'Role não definido');
        }
    }
    return (
        <CustomKeyBoardView inChat={true}>
            <View style={styles.container}>
                {/* Logo */}
                <Image 
                    style={styles.logo}
                    resizeMode='contain' 
                    source={require('../assets/images/register.png')}
                />
                
                <Text style={styles.title}>Criar Conta</Text>
                
                <View style={styles.formContainer}>
                    <TextInput
                        placeholder="Seu nome"
                        style={styles.inputContainer}
                        onChangeText={value => (usernameRef.current = value)}
                    />
                    <TextInput
                        placeholder="Email"
                        style={styles.inputContainer}
                        onChangeText={value => (emailRef.current = value)}
                        keyboardType="email-address"
                    />
                    <TextInput
                        placeholder="Senha"
                        style={styles.inputContainer}
                        onChangeText={value => (passwordRef.current = value)}
                        secureTextEntry
                    />

                    <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
                        <Text style={styles.registerButtonText}>Cadastrar</Text>
                    </TouchableOpacity>
                    
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Já possui conta?</Text>
                        <TouchableOpacity onPress={() => router.replace('loginScreen')}>
                            <Text style={styles.loginText}>Entrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </CustomKeyBoardView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: moderateScale(20),
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: moderateScale(100),
        height: moderateScale(100),
        marginBottom: moderateScale(30),
        marginTop: moderateScale(90)
    },
    title: {
        fontSize: moderateScale(24),
        fontWeight: 'bold',
        color: '#4A4A4A',
        marginBottom: moderateScale(20),
    },
    formContainer: {
        width: '100%',
        maxWidth: 300,
        alignItems: 'center',
    },
    input: {
        width: '100%',
        backgroundColor: '#F1F1F1',
        borderRadius: 8,
        padding: moderateScale(12),
        fontSize: moderateScale(16),
        marginBottom: moderateScale(15),
    },
    registerButton: {
        backgroundColor: '#6F48DF',
        borderRadius: 8,
        paddingVertical: moderateScale(12),
        paddingHorizontal: moderateScale(50),
        alignItems: 'center',
        marginVertical: moderateScale(15),
    },
    registerButtonText: {
        color: '#FFF',
        fontSize: moderateScale(16),
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        marginTop: moderateScale(10),
        alignItems: 'center',
    },
    footerText: {
        color: '#4A4A4A',
        fontSize: moderateScale(14),
    },
    loginText: {
        color: '#6F48DF',
        fontSize: moderateScale(14),
        marginLeft: moderateScale(5),
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: moderateScale(16),
        paddingVertical: moderateScale(5),
        width: '100%',
        maxWidth: 300,
        marginVertical: moderateScale(10),
        fontSize: moderateScale(16),
    }
});

