import React, { useRef, useState, Component, useEffect } from "react";
import {
  Dimensions,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  useWindowDimensions,
} from "react-native";
// import  Animated  from 'react-native-reanimated';
import Carousel, { ParallaxImage } from "react-native-new-snap-carousel";

const DATA = [
  { image: require("../assets/shaq.jpeg"), title: "SHAQ" },
  { image: require("../assets/shaq.jpeg"), title: "SHAQ" },
  { image: require("../assets/shaq.jpeg"), title: "SHAQ" },
];
const MyCarousel = (props) => {
  const { height, width, scale, fontScale } = useWindowDimensions();

  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    setEntries(DATA);
  }, [props]);

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <Image style={styles.image} source={item.image}></Image>
      </View>
    );
  };

  return (
    <Carousel
      ref={carouselRef}
      data={DATA}
      renderItem={renderItem}
      sliderWidth={width}
      itemWidth={220}
      activeSlideAlignment="center"
      layout={"default"}
      contentContainerCustomStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  //   slide: { maxWidth: "100%", alignContent: "center" },
  title: { fontSize: 16 },
  image: { height: "100%", aspectRatio: 1, borderRadius: 20 },
  container: {
    height: 200,
    borderColor: "blue",
    borderWidth: 2,
    alignContent: "center",
    justifyContent: "center",
  },
});
export default MyCarousel;
