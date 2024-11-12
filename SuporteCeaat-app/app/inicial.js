import React, { useState, useEffect, useContext, createContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [role, setRole] = useState(null);
  
 
  useEffect(() => {
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
    loadRole();
  }, []);

  const saveRole = async (userType) => {
    try {
      await AsyncStorage.setItem('userRole', userType);
      setRole(userType);
    } catch (error) {
      console.error('Erro ao salvar a função:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ role, saveRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useRole() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;

}

const Home = () => {
  const { role, saveRole } = useRole();
  const router = useRouter();

  const roles = [
    { title: 'Aluno(a)', color: '#2196F3' },
    { title: 'Funcionário(a)', color: '#4CAF50' },
    { title: 'Psicopedagogo(a)', color: '#FF5722' },
  ];

  const handleSelection = (userType) => {
    saveRole(userType);
    router.replace('registerScreen')
    console.log(userType)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SUPORTECEAAT</Text>
      <Text style={styles.subtitle}>Quem é você?</Text>

      <View style={styles.buttonContainer}>
        {roles.map((role, index) => (
          <View key={index} style={styles.button}>
            <Button
              title={role.title}
              onPress={() => handleSelection(role.title)}
              color={role.color}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  subtitle: { fontSize: 18, marginBottom: 30 },
  buttonContainer: { width: '80%', alignItems: 'center' },
  button: { marginBottom: 20, width: '100%' },
});