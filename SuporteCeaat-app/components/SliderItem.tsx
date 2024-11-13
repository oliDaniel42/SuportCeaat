import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Button, Modal, GestureResponderEvent } from 'react-native'
import React, { useState } from 'react'
import { ImageSliderType } from './SliderData'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient'
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { Linking } from 'react-native';

const site = 'https://www.paho.org/pt/topicos/transtornos-mentais'

type Props = {
  item: ImageSliderType,
  index: number,
  scrollX: SharedValue<number>
}

const { width } = Dimensions.get('window')

const SliderItem = ({ item, index, scrollX }: Props) => {
  const [modalVisible, setModalVisible] = useState(false); // Controla a visibilidade do modal

  const rnAnimatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      scrollX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [-width * 0.25, 0, width * 0.25],
      Extrapolation.CLAMP
    );

    const scale = interpolate(
      scrollX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0.9, 1, 0.9],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        { translateX },
        { scale }
      ]
    }
  })

  function link(event: GestureResponderEvent): void {
    Linking.openURL(site);
  }

  return (
    <Animated.View style={[styles.container, rnAnimatedStyle]}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => setModalVisible(true)}>
        <Image source={item.image} style={styles.image} resizeMode="cover" />
        <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={[styles.background, { justifyContent: 'center', alignItems: 'center' }]} >
          <View>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      {/* Modal para cada item */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{item.title}</Text>
            <Text style={styles.modalDescription}>{item.description}</Text>
            <View style={{paddingBottom: 20}}>
              <Button title="Fechar" onPress={() => setModalVisible(false)} color='#6E44FF' />
            </View>
          <Button title="Saber mais" color='#6E44FF' onPress={link} />
          </View>
        </View>
      </Modal>


    </Animated.View>
  )
}



export default SliderItem

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: wp('90%'),
    height: hp('75%'),
    borderRadius: 8,
    margin: 22,
  },
  title: {
    fontSize: 30,
    marginTop: 10,
    color: '#fff',
  },
  background: {
    position: 'absolute',
    width: wp('90%'),
    height: hp('75%'),
    borderRadius: 8,
    margin: 22,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: wp('80%'),
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    lineHeight: 20,
    color: '#333', // cor neutra e agradável aos olhos
    paddingHorizontal: 20, // espaço nas laterais para não encostar nas bordas
    paddingVertical: 10, // espaçamento superior e inferior para respiro
    textAlign: 'justify', // alinha o texto de forma uniforme
    backgroundColor: '#f9f9f9', // fundo suave para melhor contraste
    borderRadius: 8, // bordas arredondadas para dar suavidade
    marginVertical: 10, // espaçamento em relação a outros elementos
    shadowColor: '#000', // sombra suave
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // leve elevação para destacar o texto
  },
});