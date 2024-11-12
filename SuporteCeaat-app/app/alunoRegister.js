import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import CustomKeyBoardView from '../components/CustomKeyboardView';
import { useAuth } from '../context/authContext';
import { auth } from '../firebaseConfig';

export default function StudentRegistrationScreen() {
    const router = useRouter();


    const { studentRegister } = useAuth();

    const [grade, setGrade] = useState('');
    const [classGroup, setClassGroup] = useState('');
    const [courseType, setCourseType] = useState('');

    const handleRegister = async () => {
        if (!grade || !classGroup || !courseType) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        //const userId = await register(usernameRef.current, emailRef.current, passwordRef.current, profileRef.current);
        const userId = auth.currentUser.uid;
        let response = await studentRegister(userId, grade, classGroup, courseType).catch((error) => {
            console.error('Error registering user:', error);
            alert('Erro ao registrar usuário. Tente novamente.');
            });
        
        
        router.replace('home');

    }
       
    return (
        <CustomKeyBoardView>
            <View style={styles.container}>
                <Text style={styles.title}>Registro do Aluno</Text>
                <View style={styles.inputContainer}>

                    <Text style={styles.inputLabel}>Qual a sua série?</Text>
                    <Picker
                        selectedValue={grade}
                        onValueChange={(itemValue) => setGrade(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Anos" value="" />
                        <Picker.Item label="1ª Ano" value="1" />
                        <Picker.Item label="2ª Ano" value="2" />
                        <Picker.Item label="3ª Ano" value="3" />
                    </Picker>

                    <Text style={styles.inputLabel}>Qual sua Turma?</Text>
                    <Picker
                        selectedValue={classGroup}
                        onValueChange={(itemValue) => setClassGroup(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Turmas" value="" />
                        <Picker.Item label="A" value="A" />
                        <Picker.Item label="B" value="B" />
                        <Picker.Item label="C" value="C" />
                    </Picker>

                    <Text style={styles.inputLabel}>Tipo de Curso:</Text>
                    <Picker
                        selectedValue={courseType}
                        onValueChange={(itemValue) => setCourseType(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Selecione o tipo de curso" value="" />
                        <Picker.Item label="Regular" value="regular" />
                        <Picker.Item label="Técnico" value="technical" />
                    </Picker>
                    <Button title="Registrar" onPress={handleRegister} />
                </View>
            </View>
        </CustomKeyBoardView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 90,
        textAlign: 'center',
        height: 100,
    },
    picker: {
        height: 20,
        borderColor: 'gray',
        borderWidth: 2,
        marginBottom: 20,
    },
    inputContainer: {
        paddingHorizontal: 22,
        paddingVertical: 30,
        marginBottom: 250,
    },
    inputRow: {
        marginBottom: 25,
    },
    inputLabel: {
        marginBottom: 8,
        fontSize: 16,
        color: '#6E44FF',
    },
    input: {
        backgroundColor: '#F3F3F3',
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
    },
});
