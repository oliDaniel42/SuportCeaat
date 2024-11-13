import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import styles from './Styles';

export default function Notifications() {
  const [emergencies, setEmergencies] = useState([]);

  // Buscar emergências do Firestore
  useEffect(() => {
    const emergenciesRef = collection(db, 'emergencies');
    const q = query(emergenciesRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const emergencyList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setEmergencies(emergencyList);
    });

    return unsubscribe;
  }, []);

  const renderEmergencyItem = ({ item }) => (
    <View style={styles.emergencyItem}>
      <Text style={styles.emergencyText}>{item.text}</Text>
      <Text style={styles.emergencySender}>Enviado por: {item.senderName} {item.grade} ª ano {item.classGroup} {item.courseType}</Text> 
      <Text style={styles.emergencyTimestamp}>
        {item.createdAt.toDate().toLocaleString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { marginLeft: 120 }]}>Emergências</Text>
      </View>
      <FlatList
        data={emergencies}
        keyExtractor={(item) => item.id}
        renderItem={renderEmergencyItem}
        contentContainerStyle={styles.emergencyList}
      />
    </View>
  );
}
