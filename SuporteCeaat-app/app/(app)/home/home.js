import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { where, getDocs, query, getDoc, doc, collection, addDoc, Timestamp } from 'firebase/firestore';
import { usersRef, db } from '../../../firebaseConfig';
import { useAuth } from '../../../context/authContext';
import styles from '../../../components/Styles';
import Chatlist from '../../../components/Chatlist';
import { useRole } from '../../inicial';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Home = () => {
    const { user } = useAuth();
    const { role } = useRole();

    const [users, setUsers] = useState([]); 
    const [userData, setUserData] = useState(null);
    const [studentData, setStudentData] = useState(null);
    const userId = user?.uid;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDocRef = doc(db, 'user', userId);
                const studentDocRef = doc(db, 'student', userId);
                
                const userDocSnap = await getDoc(userDocRef);
                const studentDocSnap = await getDoc(studentDocRef);

                if (userDocSnap.exists() && studentDocSnap.exists()) {
                    setUserData(userDocSnap.data());
                    setStudentData(studentDocSnap.data());
                }
            } catch (error) {
                console.error("Erro ao buscar dados do usuário:", error);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    const handleSendEmergency = async () => {
        try {
            const emergenciesRef = collection(db, 'emergencies');
            await addDoc(emergenciesRef, {
                senderName: userData.username,
                classGroup: studentData.classgroup,
                grade: studentData.grade,
                courseType: studentData.coursetype,
                text: " Emergência! Preciso de ajuda urgente!",
                createdAt: Timestamp.fromDate(new Date()),
            });

            console.log('Mensagem de emergência enviada!');
        } catch (error) {
            console.log('Erro ao enviar a mensagem de emergência:', error);
        }
    };

    const getUsers = async () => {
        try {
            let q;
            if (role === 'Aluno(a)' || role === 'Funcionário(a)') {
                q = query(usersRef, where('role', '==', 'Psicopedagogo(a)'));
            } else if (role === 'Psicopedagogo(a)') {
                q = query(usersRef, where('role', 'in', ['Aluno(a)', 'Funcionário(a)']));
            }

            if (q) { 
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map(doc => ({ ...doc.data() }));
                setUsers(data);
            }
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        }
    };

    useEffect(() => {
        if (userId) {
            getUsers();
        }
    }, [userId]);

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{ textAlign: 'center', paddingTop: 30, fontSize: 25, color: "white", paddingLeft: 155 }}>Chats</Text>
                </View>
            </View>

            <View style={{ flex: 5, backgroundColor: '#fff' }}>
                {users.length > 0?(
                    <Chatlist users={users}/>
                ):( 
                    <View style={{alignItems:'center', flex: 1, justifyContent: 'center'}}>
                        <ActivityIndicator size ='large' color='#6E44FF'></ActivityIndicator>
                    </View>
                )}
            </View>

            {role === 'Aluno(a)' && (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: hp('10%'), backgroundColor: 'white' }}>
                    <TouchableOpacity 
                        style={{
                            backgroundColor: '#fff',
                            height: hp('40%'),
                            width: wp('40%')
                        }}
                        onPress={handleSendEmergency}
                    >
                        <Ionicons name="alert-circle" size={wp('40%')} color="red" />
                    </TouchableOpacity>
                </View>
            )}
        </>
    );
};

export default Home;