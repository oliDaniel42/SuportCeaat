import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import styles from '../components/Styles';
import { Image } from 'expo-image';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MessageList from '../components/MessageList';
import { Ionicons } from '@expo/vector-icons';
import CustomKeyBoardView from '../components/CustomKeyboardView';
import { useAuth } from '../context/authContext';
import { getRoomId } from '../utils/common';
import { setDoc, Timestamp, doc, query, collection, orderBy, onSnapshot, getDoc, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function ChatRoom() {
  const item = useLocalSearchParams(); // outro usuário
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const router = useRouter();
  const textRef = useRef('');
  const inputRef = useRef(null);

  // Buscar dados do usuário
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        const docRef = doc(db, 'user', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("Documento não encontrado!");
        }
      }
    };

    fetchUserData();
  }, [user?.uid]);

  // Lógica para criar a sala e assinar mensagens quando userData estiver pronto
  useEffect(() => {
    if (!userData) return;

    const roomId = getRoomId(userData.userId, item?.userId);
    const docRef = doc(db, 'rooms', roomId);
    const messagesRef = collection(docRef, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    const createRoomIfNotExists = async () => {
      await setDoc(doc(db, 'rooms', roomId), {
        roomId,
        createdAt: Timestamp.fromDate(new Date())
      });
    };

    createRoomIfNotExists();

    const unsub = onSnapshot(q, (snapShot) => {
      const allMessages = snapShot.docs.map((doc) => doc.data());
      setMessages(allMessages);
    });

    return unsub;
  }, [userData, item?.userId]);

  // Enviar mensagem
  const handleSendMessage = async () => {
    const message = textRef.current.trim();
    if (!message) return;

    try {
      const roomId = getRoomId(userData.userId, item?.userId);
      const messagesRef = collection(doc(db, 'rooms', roomId), 'messages');
      textRef.current = '';
      inputRef.current?.clear();

      const newDoc = await addDoc(messagesRef, {
        userId: userData.userId,
        text: message,
        profileImage: userData.profileImage || '',
        senderName: userData.username || 'Usuário',
        createdAt: Timestamp.fromDate(new Date()),
      });

      console.log('new message id:', newDoc.id);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <CustomKeyBoardView inChat={true}>
      <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16, marginTop: 30 }}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Image
            source={item?.profileImage}
            style={{ height: hp(6), width: hp(6), borderRadius: hp(3), marginRight: 12, marginTop: 35 }}
          />
          <Text style={[styles.nameTitle, { fontWeight: 'bold' }]}>{item?.username}</Text>
        </View>

        {/* Message List */}
        <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 10 }}>
          <MessageList messages={messages} currentUser={userData} />
        </View>

        {/* Input Section */}
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}>
          <View style={styles.messageContainer}>
            <TextInput
              ref={inputRef}
              onChangeText={(value) => (textRef.current = value)}
              placeholder="Digite sua mensagem..."
              placeholderTextColor="#888"
              style={{ paddingHorizontal: 15, paddingVertical: 6, flex: 1 }}
            />
            <TouchableOpacity onPress={handleSendMessage} style={{ padding: 2, marginLeft: 55 }}>
              <Ionicons name="send" size={hp(2.7)} color="#737373" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </CustomKeyBoardView>
  );
}
