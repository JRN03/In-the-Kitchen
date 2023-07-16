import React, {useRef, useState, Component,useEffect} from 'react';
import { Dimensions, SafeAreaView, Text, View,StyleSheet, ScrollView,Image,useWindowDimensions, } from 'react-native';
// import  Animated  from 'react-native-reanimated';
import Carousel, {ParallaxImage} from 'react-native-new-snap-carousel';

const DATA = [
    {image:require("../assets/shaq.jpeg"),title:"SHAQ"},
    {image:require("../assets/shaq.jpeg"),title:"SHAQ"},
    {image:require("../assets/shaq.jpeg"),title:"SHAQ"},
]
const MyCarousel = props => {
    const {height, width, scale, fontScale} = useWindowDimensions();

    const [entries, setEntries] = useState([]);
    const carouselRef = useRef(null);

    useEffect(() => {
        setEntries(DATA);
    }, [props]);

    const renderItem = ({item, index}) => {
        return (
            <View style={styles.slide}>
                <Image style = {styles.image} source={item.image}></Image>
            </View>
        );
    }

        return (
            <View style = {[styles.container,{width:width}]}>
                <Carousel
                    ref={carouselRef}
                    data={DATA}
                    renderItem={renderItem}
                    sliderWidth={300}
                    itemWidth={300}
                    activeSlideAlignment = "center"
                    layout ={'default'}
                    contentContainerCustomStyle = {styles.container}
                />
            </View>

        );


}

const styles = StyleSheet.create({
    slide:{maxWidth:"70%", alignContent:"center"},
    title:{fontSize:16},
    image:{height:"90%",aspectRatio:1, borderRadius:20},
    container:{justifyContent: "center",height:200, }
})
export default MyCarousel