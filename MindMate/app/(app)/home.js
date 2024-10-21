// App.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack } from "expo-router";


const Home = () => {
  const [role, setRole] = useState(null);

  // Função para salvar a escolha no AsyncStorage
  const saveRole = async (userType) => {
    try {
      await AsyncStorage.setItem('userRole', userType);
      setRole(userType);
    } catch (error) {
      console.error('Erro ao salvar a função:', error);
    }
  };


  // Função para carregar a escolha do AsyncStorage ao abrir o app
  const loadRole = async () => {
    try {
      const savedRole = await AsyncStorage.getItem('userRole');
      if (savedRole !== null) {
        setRole(savedRole);
      }
    } catch (error) {
      console.error('Erro ao carregar a função:', error);
    }
  };

  // Carregar a escolha do usuário quando o app for inicializado
  useEffect(() => {
    loadRole();
  }, []);

  const handleSelection = (userType) => {
    saveRole(userType);
    // Aqui você pode adicionar lógica de navegação ou salvar a escolha do usuário
  };

  return (

    <View style={styles.container}>
      
      <Stack.Screen options={{headerShown: false}}/>
      
      <Text style={styles.title}>MindMate</Text>
      <Text style={styles.subtitle}>Quem é você?</Text>

      <View style={styles.buttonContainer}>
        <View style={styles.button}> 
            <Button 
            title="Sou aluno(a)" 
            onPress={() => handleSelection('Aluno(a)')} 
            color="#2196F3"
            />
        </View>
        
        <View style={styles.button}>
            <Button 
            title="Sou funcionário(a)" 
            onPress={() => handleSelection('Funcionário(a)')} 
            color="#4CAF50"
            />
        </View>
        
        <View style={styles.button}>
            <Button 
            title="Sou psicopedagogo(a)" 
            onPress={() => handleSelection('Psicopedagogo(a)')} 
            color="#FF5722"
            />
        </View>
      </View>

      {role && (
        <Text style={styles.selectionText}>
          Bem vindo: {role}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 25,
    marginBottom: 50,
  },
  buttonContainer: {
    marginVertical: 10,
    width: '50%',
    borderRadius: 8,
    justifyContent: 'space-between',
  },
  button: {
    marginVertical: 5, // Afasta os botões verticalmente
  },
  selectionText: {
    marginTop: 20,
    fontSize: 16,
    fontStyle: 'italic',
  },
});

export default Home;
