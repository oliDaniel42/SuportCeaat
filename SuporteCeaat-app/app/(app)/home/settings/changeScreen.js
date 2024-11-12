import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../../../context/authContext';
import { db } from '../../../../firebaseConfig';
import { getDoc, doc } from 'firebase/firestore';
import styles from '../../../../components/Styles';
import { ActivityIndicator } from 'react-native';

export default function ChangeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const studentId = user.uid;

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const docRef = doc(db, 'student', studentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setStudentData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [studentId]);

  const handleRegister = () => {
    router.push('alunoRegister')
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Registro</Text>
      </View>

      <View style={styles.inputContainer}>
        {loading ? (
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <ActivityIndicator size="large" color="#6E44FF" />
          </View>
        ) : (
          studentData ? (
            <>
              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Sua série</Text>
                <Text style={styles.input}> {studentData.grade} </Text>
              </View>

              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Sua turma</Text>
                <Text style={styles.input}> {studentData.classgroup} </Text>
              </View>

              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>Curso</Text>
                <Text style={styles.input}> {studentData.coursetype} </Text>
              </View>

              <Button
                title="Alterar"
                onPress={handleRegister}
                color="#6E44FF"
              />
            </>
          ) : (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <Text>Nenhum dado encontrado.</Text>
            </View>
          )
        )}
      </View>
    </View>
  );
}