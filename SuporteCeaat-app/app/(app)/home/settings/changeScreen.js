import React, { useState,  useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, BackHandler } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useRouter, useLocalSearchParams } from 'expo-router';

const Stack = createStackNavigator();


export default function ChangeScreen() {
  const router = useRouter();

  const { studantId } = useLocalSearchParams(); 

  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
      const fetchStudentData = async () => {
          if (studantId) {
              try {
                  const docRef = doc(db, 'students', studantId);
                  const docSnap = await getDoc(docRef);
                  if (docSnap.exists()) {
                      setStudentData(docSnap.data());
                  } else {
                      console.log('Documento não encontrado.');
                  }
              } catch (error) {
                  console.error('Erro ao buscar dados:', error);
              }
          }
      };

      fetchStudentData();
  }, [studantId]);

  if (!studentData) {
      return <Text style={{justifyContent: "center", textAlign:"center"}}>Carregando...</Text>;
  }

  const handleRegister = () => {
    router.push('registerScreen')
  };

  return (
   
      <View style={styles.container}>

        <Text style={styles.title}>Seu registro</Text>

        <View style={styles.inputContainer}>

            <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Nome completo</Text>
                <TextInput style={styles.input} value={studantId?.name} editable={false}/>
            </View>

            <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Sua série</Text>
                <TextInput style={styles.input} value={''} editable={false}/>
            </View>
          
            <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Sua turma</Text>
                <TextInput style={styles.input} value={''} editable={false}/>
            </View>
        
            <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Curso</Text>
                <TextInput style={styles.input} value={''} editable={false}/>
            </View>
          
          <Button 
          title="Alterar" 
          onPress={handleRegister}
          color="#6E44FF" 
          />
        </View>

        </View>

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
    height:100,
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
    marginBottom: 80,
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
