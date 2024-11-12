import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'expo-image';
import { doc, query, collection, orderBy, onSnapshot, getDoc, limit } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useAuth } from '../context/authContext';
import { getRoomId } from '../utils/common';

export default function ChatItem({ item, router }) {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [lastMessage, setLastMessage] = useState(undefined);

  const openChatRoom = () => {
    router.push({
      pathname: '/chatRoom',
      params: item
    });
  };

  

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

  useEffect(() => {
    const roomId = getRoomId(userData?.userId, item?.userId);
    const docRef = doc(db, 'rooms', roomId);
    const messagesRef = collection(docRef, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'desc'), limit(1));

    const unsub = onSnapshot(q, (snapShot) => {
      if (!snapShot.empty) {
        const latestMessage = snapShot.docs[0].data();
        setLastMessage(latestMessage);
      } else {
        setLastMessage(null);
      }
    });

    return unsub;
  }, [userData?.userId, item?.userId]);

  const renderLastMessage = () => {
    if (typeof lastMessage === 'undefined') return 'Carregando...';
    if (lastMessage) {
      if (userData?.userId === lastMessage?.userId) return 'Você: ' + lastMessage?.text;
      return lastMessage?.text;
    } else {
      return 'Diga olá👋';
    }
  };

  return (
    <TouchableOpacity onPress={openChatRoom} style={{ flexDirection: 'row', justifyContent: 'space-between', borderRadius: 8, marginLeft: 10 }}>
      <Image
        source={{ uri: item?.profileImage }}
        style={{
          height: hp(6),
          aspectRatio: 1,
          borderRadius: 60,
          width: hp(6),
          marginBottom: wp(4),
        }}
      />

      {/* Nome e última mensagem */}
      <View style={{ flex: 1, gap: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: hp(1.8), marginLeft: hp(1) }}>{item?.username}</Text>
          <Text style={{ fontSize: hp(1.6), marginRight: hp(1) }}>{item?.role}</Text>
        </View>
        <Text style={{ fontSize: hp(1.6), marginLeft: hp(1), color:"rgba(0, 0, 0, 0.4)" }}>{renderLastMessage()}</Text>
      </View>

    </TouchableOpacity>
  );
}
