import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import styles from '../../../components/Styles'
import { SafeAreaView } from 'react-native'
import SliderItem from '../../../components/SliderItem'
import Slider from '../../../components/Slider'
import { ImageSlider } from '../../../components/SliderData'

export default function InfoScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { fontSize: 25, marginLeft: 120 }]}>Informações</Text>
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Slider itemList={ImageSlider}/>
      </View>
    </SafeAreaView>
  )
}