import { View, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { ImageSliderType } from './SliderData';
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';

type Props = {
  items: ImageSliderType[];
  paginationIndex: number;
  scrollX: SharedValue<number>;
};

const { width } = Dimensions.get('window');

const Pagination = ({ items, paginationIndex, scrollX }: Props) => {
  return (
    <View style={styles.container}>
      {items.map((_, index) => {
        const animatedDotStyle = useAnimatedStyle(() => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
          const outputRange = [8, 20, 8];
          const dotWidth = interpolate(scrollX.value, inputRange, outputRange, Extrapolation.CLAMP);
          return {
            width: dotWidth,
          };
        }, [index, scrollX, width]);

        return (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              animatedDotStyle,
              {
                backgroundColor: paginationIndex === index ? '#222' : '#888',
                opacity: paginationIndex === index ? 1 : 0.5,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 8,
    marginHorizontal: 2,
    borderRadius: 10,
    backgroundColor: '#aaa',
  },
});

export default Pagination;