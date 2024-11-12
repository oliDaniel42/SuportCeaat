import { View, Text } from 'react-native';
import React from 'react';
import { FlatList } from 'react-native';
import ChatItem from './ChatItem';
import { useRouter } from 'expo-router';

export default function Chatlist({users, currentUser}) {
  const router = useRouter();
 
  return (
    <View style={{flex:1}}>
    <FlatList
      data={users}
      contentContainerStyle={{paddingVertical:1, flex: 1}}
      keyExtractor={item => Math.random()}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index})=> <ChatItem
          router={router}
          currentUser={currentUser}
          item={item} 
          index={index}/>}
          
      ></FlatList>
    </View>
  )
}