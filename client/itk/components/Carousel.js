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
import Carousel, { Pagination } from "react-native-new-snap-carousel";

const MyCarousel = (props) => {
  
  const { height, width, scale, fontScale } = useWindowDimensions();
  const [imageData,setImageData] = useState([]);
  const [active,setActive] = useState(0);
  const carouselRef = useRef(null);
  useEffect(() => {
    if (props.isNew) return;
    // for each in props.images fetch to '/images' and push that data to imageData array
    const fetchPromises = props.images.map(image => {
      return fetch(`${process.env.EXPO_PUBLIC_ENDPOINT}/images/${image}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      })
      .then(res => res.json())
      .then(data => data.imageData)
      .catch(error => {
        return null;
      });
    });
  
    Promise.all(fetchPromises)
      .then(fetchedImageData => {
        // Filter out any null values if needed (failed fetches)
        const filteredImageData = fetchedImageData.filter(data => data !== null);
        setImageData(filteredImageData);
      })
      .catch(error => {
        setImageData([]);
      });
  }, []);

  // console.log("Image data",imageData);
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <Image style={styles.image} source={{uri: "data:image/jpeg;base64,"+item}}></Image>
      </View>
    );
  };

  if (!imageData && !props.images) return;
  return (
    <View style={{flex: 1}}>
    <Carousel
      ref={carouselRef}
      data={props.isNew ? props.images : imageData}
      renderItem={renderItem}
      sliderWidth={width}
      itemWidth={300}
      activeSlideAlignment="center"
      layout={"default"}
      contentContainerCustomStyle={styles.container}
      onSnapToItem={(index) => setActive(index) }
    />
    <Pagination
      dotsLength={props.images ? props.images.length:imageData.length}
      activeDotIndex={active}
      containerStyle={{bottom: 0, position:'absolute', alignSelf:'center'}}
      dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 10,
          backgroundColor: '#ffffff',
      }}
      inactiveDotStyle={{
          backgroundColor: 'white'
      }}
      inactiveDotOpacity={0.4}
      inactiveDotScale={0.6}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  //   slide: { maxWidth: "100%", alignContent: "center" },
  title: { fontSize: 16 },
  image: { height: "100%", aspectRatio: 1, borderRadius: 20 },
  container: {
    height: 300,
    // borderColor: "blue",
    // borderWidth: 2,
    alignContent: "center",
    justifyContent: "center",
  },
});
export default MyCarousel;
