import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Pressable, Alert, Linking } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { moderateScale } from 'react-native-core-responsive-screen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'react-native';
import tw from 'twrnc';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';
import CustomKeyBoardView from '../components/CustomKeyboardView';
import { useAuth } from '../context/authContext';


export default function login() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const {login} = useAuth();

    const emailRef = useRef("");
    const passwordRef = useRef("");

    const handletLogin = async () => {
        if(!emailRef.current || !passwordRef.current){
            Alert.alert("Please fill in all fields");
            return;
        }
        setLoading(true);
        const response = await login(emailRef.current, passwordRef.current);
        setLoading(false);
        router.replace('inicial')
        if(!response){
            Alert.alert("Login incorreto")
        }
    }
    
    return (
        <CustomKeyBoardView>
            <View style={{ flex: 1, padding: moderateScale(20) }}>
                <StatusBar style="dark" />
                <View style={{ height: moderateScale(150) }} />
                <View style={{ paddingTop: moderateScale(50), alignItems: 'center', flex: 1 }}>

                    {/* SignIn Image */}
                    <Image 
                        style={{ height: moderateScale(100), width: moderateScale(100), marginBottom: moderateScale(30) }}
                        resizeMode='contain' 
                        source={require('../assets/images/login.png')}
                    />

                    <Text style={styles.title}>Conecte-se conosco</Text>
                    
                    <View style={{ padding: 10 }}>
                        {/* Email and password Input  */}
                        <View style={styles.inputContainer}>
                            <Ionicons 
                                name="mail-outline" 
                                size={moderateScale(20)} 
                                color="black" 
                                style={styles.icon}
                            />
                            <TextInput
                                onChangeText={value=> emailRef.current=value}
                                placeholder="Email"
                                autoComplete='email'
                                autoCorrect={false}
                                style={styles.input}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />


                        </View>
                        <View style={styles.inputContainer}>
                            <Ionicons 
                                name="key-outline" 
                                size={moderateScale(20)} 
                                color="black" 
                                style={styles.icon}
                            />
                            <TextInput
                                onChangeText={value=> passwordRef.current=value}
                                placeholder="Senha"
                                secureTextEntry
                                style={styles.input}
                                keyboardType="Password"
                                autoCapitalize="none"
                            />
                        </View>

                        <View>
                            {loading?(
                                <View style={[tw`flex-row justify-center`, {padding: 20} ]}>
                                    <Loading size={70}/>
                                </View>

                                ):(
                            <View style={{paddingTop: 30}}>
                                <TouchableOpacity onPress={handletLogin} style={tw`items-center bg-purple-700 p-4 rounded-lg justify-center`}>
                                    <Text style={[styles.enter, tw`text-white font-bold`]}>Entrar</Text>
                                </TouchableOpacity>
                            </View>
                            )}
                        </View>
                    </View>
                </View>
            </View>
        </CustomKeyBoardView>
    );
    
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: moderateScale(10),
        paddingVertical: moderateScale(5),
        width: '100%',
        maxWidth: 300,
        marginVertical: moderateScale(10),
    },
    icon: {
        marginRight: moderateScale(10),
    },
    input: {
        flex: 1,
        fontSize: moderateScale(16),
    },
    title:{
        fontSize: moderateScale(25), 
        fontWeight: 'bold', 
        letterSpacing: 1.5, 
        textAlign: 'center',
        marginBottom: moderateScale(20),
    },
    password:{
        fontSize: moderateScale(12),  
        textAlign: 'right',  
        opacity: 0.3,
    },
    enter:{
        fontSize: moderateScale(18),
    },
});
