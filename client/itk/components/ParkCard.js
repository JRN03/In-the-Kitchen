import { View, StyleSheet, Text, ScrollView, SafeAreaView, Alert, processColor, TouchableOpacity } from "react-native";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import {React, useState, useEffect, useRef} from "react";
import {PageStyles} from "../assets/Styles";
import light from "../assets/themes/light.js";
import { Rating, AirbnbRating } from 'react-native-ratings';
const PICKLEBALL_IMG = require('../assets/pickleball.png');
import axios from 'axios';
import * as Location from 'expo-location';



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

export default function ParkCard(props){
    const [meetings, setMeetings] = useState();
    //props: meeting times, address, placeId, 
    const [userCurrentLocation, setUserCurrentLocation] = useState({latitude:0,longitude:0});

    useEffect(()=>{
        function mapMeetTimes(){
            setMeetings(props.meetTimes.map((item,index)=>{
                // console.log(item)
                return(
                    <Text
                      key = {index*100}
                      style = {{fontFamily:"RobotoSlab_700Bold", fontSize: 18, textAlign : "left", color:"grey",paddingTop:5}}
                      >{item}</Text>
                )
                
            }))
        }
        const getPermissions = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              console.log("Please grant location permissions");
              return;
            }
      
            let currentLocation = await Location.getCurrentPositionAsync({});
            // (currentLocation);
            console.log("Location:");
            console.log(currentLocation);
      
            // setMapLat(currentLocation.coords.latitude);
            // setMapLon(currentLocation.coords.longitude);
            setUserCurrentLocation({lat:currentLocation.coords.latitude,lon:currentLocation.coords.longitude})
        };
          
        getPermissions();
        mapMeetTimes()
    },[])
    
   
    return (
        <View style = {styles.main}>
            <Text style={{fontFamily:"RobotoSlab_700Bold", fontSize: 18, textAlign : "left", color:"grey",paddingTop:5}}>{props.location}</Text>
            <Text style={{fontFamily:"RobotoSlab_700Bold", fontSize: 24, textAlign : "left", color:"black", paddingTop:5}}>Meet Times:</Text>
            {/* <Text style = {{}>{props.meetTimes}</Text> */}
            {meetings}
            {/* <Text style = {{fontFamily:"RobotoSlab_700Bold", fontSize: 18, textAlign : "left", color:"grey",paddingTop:5}}>{props.meetTimes[0]}</Text> */}
        </View>

    )
}


const styles = StyleSheet.create({
    main:{
        width: "100%",
        height: 250,
        borderRadius: 20,
        backgroundColor: "white",
        marginVertical: 10,
        paddingHorizontal: 20,
        flexDirection: "column",
        alignItems: "left",
    },
});