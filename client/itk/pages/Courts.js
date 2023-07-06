import { View, StyleSheet, Text, ScrollView, SafeAreaView } from "react-native";
import MapView from "react-native-maps";
import Searchbar from "../components/Searchbar";
import {React, useState, useEffect} from "react";
import ParkTab from "../components/ParkTab";
import light from "../assets/themes/light.js";
import AppHeader from "../components/AppHeader";
import Navbar from "../components/Navbar";
export default function Courts() {
  
  const [courtData,setCourtData] = useState([]);

  useEffect(() => {

    const getCourts = async () => {
      const res = await fetch('http://localhost:8080/courts');
      const data = await res.json();
      setCourtData(data);
    }
    
    getCourts();

  },[])
 
  const courtObjects = courtData.map(courtInfo => (
    <ParkTab key={courtInfo.name} name={courtInfo.name}/>
  ));

  return (
    <SafeAreaView style={styles.main}>
      <AppHeader/>
      <View style={styles.contentWrap}>
        <Searchbar/>
        <MapView style={styles.map}/>
        <Text 
            style={
              {
                color:"white",
                fontSize:20,
                textAlign: "left",
                width: "100%",
                position: "relative",
                marginVertical: 10
              }
            }>
            Nearby Courts
          </Text>
        <ScrollView style={styles.nearbyContainer}>
          {courtObjects}
        </ScrollView>
        <Navbar/>
        </View>
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: light.primary,
    position: "relative"
  },
  contentWrap:{
    width: "90%",
    height: "100%"
  },
  map: {
    height: "35%",
    width: "100%",
    borderRadius: 10,
  },
  nearbyContainer:{
    width: "100%",
    flexGrow: 0,
    maxHeight: "32%",
  },

});
