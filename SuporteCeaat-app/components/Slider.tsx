import React, { useRef, useState, useEffect } from 'react'
import { Dimensions, View, ViewToken } from 'react-native';
import SliderItem from './SliderItem'
import { ImageSliderType } from './SliderData';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import Pagination from './Pagination';

type Props = {
  itemList: ImageSliderType[];
}

const { width } = Dimensions.get('window')

const Slider = ({ itemList }: Props) => {
  const scrollX = useSharedValue(0);
  const [paginationIndex, setPaginationIndex] = useState(0);
  const [data, setData] = useState(itemList);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    }
  });

  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    const firstViewableItem = viewableItems[0];
    if (firstViewableItem && firstViewableItem.index !== null) {
      setPaginationIndex(firstViewableItem.index % itemList.length);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  };

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged }
  ]);

  useEffect(() => {
    setData(itemList);
  }, [itemList]);

  return (
    <View>
      <Animated.FlatList
        data={data}
        renderItem={({ item, index }) => (
          <SliderItem item={item} index={index} scrollX={scrollX} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={onScrollHandler}
        onEndReachedThreshold={0.5}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        keyExtractor={(item, index) => index.toString()}
      />
      <Pagination items={itemList} scrollX={scrollX} paginationIndex={paginationIndex} />
    </View>
  );
};

export default Slider;