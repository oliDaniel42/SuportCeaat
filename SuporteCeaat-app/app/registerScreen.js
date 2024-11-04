import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import CustomKeyBoardView from '../components/CustomKeyboardView';
import { db } from '../firebaseConfig'; // Importando o Firestore
import { collection, addDoc } from 'firebase/firestore'; // Importando as funções necessárias

export default function StudentRegistrationScreen() {
    const router = useRouter();
    const [grade, setGrade] = useState('');
    const [classGroup, setClassGroup] = useState('');
    const [courseType, setCourseType] = useState('');
    const userName = useRef('');

    const handleRegister = async () => {
        if (!userName.current || !grade || !classGroup || !courseType) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        try {
            // Adicionando um novo registro na coleção "students"
          const studantData = await addDoc(collection(db, 'students'), {
              name: userName.current.trim(),
              grade: grade,
              classGroup: classGroup,
              courseType: courseType,
            });

            const studantId = studantData.id

            // Passa os dados para a tela de registro
            router.replace({
              pathname: 'changeScreen', 
              params: {
                studantData: { studantId }
              }
            }); 
            // Redirecionando para a tela inicial após o registro
            router.push('home');
        } catch (error) {
            console.error("Erro ao registrar o aluno: ", error);
            alert('Ocorreu um erro ao registrar. Tente novamente.');
        }
    };

    return (
        <CustomKeyBoardView>
            <View style={styles.container}>
                <Text style={styles.title}>Registro do Aluno</Text>
                <View style={styles.inputContainer}>
                    <View style={styles.inputRow}>
                        <Text style={styles.inputLabel}>Digite seu nome completo</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={value => userName.current = value}
                            placeholder='seu nome'
                            editable={true}
                        />
                    </View>

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
