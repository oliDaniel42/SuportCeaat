import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Modal, Linking } from 'react-native';
import { useAuth } from '../../../../context/authContext';
import { Stack } from 'expo-router';
import styles from '../../../../components/Styles';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../firebaseConfig';
import { Image } from 'expo-image';

const ProfileScreen = () => {
  const [profileImage, setProfileImage] = useState(null);
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const userId = user?.uid;

  const siteUrl = 'https://www.aconvert.com/pt/image/'

  const handleProfileImageUrlChange = async () => {
    if (imageUrl) {
      setProfileImage(imageUrl);
      const userDocRef = doc(db, 'user', userId);
      await updateDoc(userDocRef, { profileImage: imageUrl });
      setModalVisible(false);
      setImageUrl('');
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        const docRef = doc(db, 'user', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
          setProfileImage(docSnap.data().profileImage);
        } else {
          console.log("Documento não encontrado!");
        }
      }
    };

    fetchUserData();
  }, [userId]);

  const handleLogout = async () => {
    await logout();
  };

  const handleLink = () => {
    Linking.openURL(siteUrl);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      {userData ? (
        <>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{userData.username}</Text>
          </View>

          <View style={styles.profileIconContainer}>
            <Image
              source={profileImage ? { uri: profileImage } : require('../../../../assets/images/avatar.png')}
              style={styles.profileIcon}
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputRow}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput style={styles.input} value={user?.email} keyboardType="email-address" editable={false} />
            </View>

            <View style={styles.inputRow}>
              <Text style={styles.inputLabel}>Senha</Text>
              <TextInput style={styles.input} value="********" secureTextEntry={true} editable={false} />
            </View>
          </View>

          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.editButton}>
            <Text style={styles.editButtonText}>Alterar Foto</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogout} style={styles.editButton}>
            <Text style={styles.editButtonText}>Desconectar</Text>
          </TouchableOpacity>

          {/* Modal para inserir URL da imagem */}
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Insira o URL da Imagem</Text>
                <TextInput
                  placeholder="https://exemplo.com/imagem.jpg"
                  value={imageUrl}
                  onChangeText={setImageUrl}
                  style={styles.modalInput}
                />
                <View style={styles.modalButtonContainer}>
                  <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleProfileImageUrlChange} style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Salvar</Text>
                  </TouchableOpacity>

                </View>
                <View style={{marginTop: 10, alignItems: 'center'}}>
                  <TouchableOpacity onPress={handleLink}>
                    <Text>Converta a sua imagem aqui</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </>
      ) : (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <ActivityIndicator size="large" color="#6E44FF" />
        </View>
      )}
    </View>
  );
};

export default ProfileScreen;
