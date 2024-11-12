import { View, Text } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from './Styles';

export default function MessageItem({message, currentUser}) {
    const isCurrentUser = currentUser?.userId==message?.userId
  return (
    <View style={{
        flexDirection: 'row',
        justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
        marginVertical: 4,
      }}
    >
      <View
        style={{
          maxWidth: wp(80),
          padding: 10,
          borderRadius: 10,
          backgroundColor: isCurrentUser ? '#DCF8C6' : '#FFFFFF',
          alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
        }}
      >
        <Text style={{ color: isCurrentUser ? '#000' : '#333' }}>
            {message?.text}
        </Text>
      </View>
    </View>
  )
}