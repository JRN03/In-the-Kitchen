import { View, StyleSheet, Text, ScrollView, SafeAreaView, Alert, processColor } from "react-native";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import {React, useState, useEffect, useRef} from "react";
import AppHeader from "../components/AppHeader";
import Navbar from "../components/Navbar";
import {PageStyles} from "../assets/Styles";
import light from "../assets/themes/light.js";
import {
    useFonts,
    RobotoSlab_100Thin,
    RobotoSlab_200ExtraLight,
    RobotoSlab_300Light,
    RobotoSlab_400Regular,
    RobotoSlab_500Medium,
    RobotoSlab_600SemiBold,
    RobotoSlab_700Bold,
    RobotoSlab_800ExtraBold,
    RobotoSlab_900Black,
} from '@expo-google-fonts/roboto-slab';

const reviewData = [
    {   
        rating:5,
    
    }

]
// export default function ParkView({navigation,route}) {
export default function ParkView({navigation,route}) {

    var {props} = route.params;
    const [lat,setLat] =  useState(props.lat);
    const [lon,setLon] =  useState(props.lon);
    const [mapLatDelta,setMapLatDelta] = useState(.1);
    const [mapLonDelta,setMapLonDelta] = useState(0.12050628662110796);
    let [fontsLoaded] = useFonts({
        RobotoSlab_100Thin,
        RobotoSlab_200ExtraLight,
        RobotoSlab_300Light,
        RobotoSlab_400Regular,
        RobotoSlab_500Medium,
        RobotoSlab_600SemiBold,
        RobotoSlab_700Bold,
        RobotoSlab_800ExtraBold,
        RobotoSlab_900Black,
    });

    if (!fontsLoaded) {
      return null;
    }

    // we need some type of review parser.

    return(
        <SafeAreaView style={PageStyles.main}>
            <AppHeader/>
            <View style={PageStyles.contentWrap}>
                <Text onPress = {()=>{navigation.navigate('Courts')}} style = {{fontSize: 15, marginTop:10,textAlign:'right',color:'white'}}>Back to Courts</Text>
                <View style = {styles.textContainer}>
                    <Text style = {styles.introText}>{props.name}</Text>
                    <Text style = {styles.introText}>{props.location}</Text>
                </View>
                <MapView
                    style={styles.map} 
                    provider={PROVIDER_GOOGLE}
                    initialRegion = {{latitude:lat,longitude:lon,latitudeDelta:mapLatDelta, longitudeDelta:mapLonDelta}}
                    > 
                    <Marker
                key = {100}
                coordinate = {{latitude:lat,longitude:lon}}
                title = {props.name}
                description = {props.location}
                />
                </MapView>


                <Navbar/>
            </View>
        </SafeAreaView>

    )
}



const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: light.primary,
    position: "absolute"
  },
  introText:{
    color:"white",
    fontFamily:"RobotoSlab_400Regular",
    fontSize: 20,
    fontWeight:'bold',
    textAlign: 'center',
  },
  textContainer:{
    marginTop: 10
  },
  contentWrap:{
    width: "90%",
    flex: 1,
    position: "absolute"
  },
  map: {
    height: "35%",
    width: "100%",
    borderRadius: 10,
    position: "relative",
    marginTop:20,
    zIndex: 0
  },
  nearbyContainer:{
    width: "100%",
    flexGrow: 0,
    maxHeight: "32%",
  }
});
//,
// searchWrap: {
//     container: {
//       flex: 0,
//       marginVertical: 10,
//       maxHeight: "45%",
//       zIndex: 1
//     },
//     textInput: {
//       height: 40,
//       borderRadius: 5,
//       zIndex: 2
//     },
//     listView: {
//       borderRadius:5,
//       position: "absolute",
//       top: 42,
//       zIndex: 1
//     },
// }