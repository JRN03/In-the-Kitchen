import { View, StyleSheet, Text, ScrollView, SafeAreaView, Alert, processColor } from "react-native";
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import Searchbar from "../components/Searchbar";
import {React, useState, useEffect, useRef} from "react";
import ParkTab from "../components/ParkTab";
import light from "../assets/themes/light.js";
import AppHeader from "../components/AppHeader";
import Navbar from "../components/Navbar";
import {PageStyles} from "../assets/Styles";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


export default function Courts() {
  const ref = useRef();

  useEffect(() => {
    ref.current?.setAddressText('Some Text');
  }, []);

  const [courtData,setCourtData] = useState([]);
  const [mapLat,setMapLat] = useState('');
  const [mapLon,setMapLon] = useState('');
  // console.log(process.env.MAPS_API);
  function onSubmitText(text){
    console.log(text)
    Alert.alert(`${text} has been passed through!`)
    //add the actual api calls
    //user types in a city, we want to fetch the city pickleball courts

  }
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
    <SafeAreaView style={PageStyles.main}>
      <AppHeader/>
      <View style={PageStyles.contentWrap}>
        {/* <Searchbar onSubmit={onSubmitText}/> */}
        <GooglePlacesAutocomplete
          placeholder='Search'
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log("data",data);
            console.log("details",details);
            //we get the lat and lon 
            //we use setMapLat and setMapLon
          }}
          // GooglePlacesSearchQuery= {[{ rankby: 'distance', type: 'restaurant' }]}
          GooglePlacesDetailsQuery = {{type: 'restaurant'}}
          query={{
            key: 'AIzaSyBxU1ITfiSI_aOf0aId4B3jcQctMNlzRbk',
            language: 'en',
          }}
          onFail={(error) => console.error(error)}

    />
        {/* set display to be based on state values of Lat and Lon */}
        <MapView style={styles.map} provider={PROVIDER_GOOGLE}/> 
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
  },
  contentWrap:{
    width: "90%",
    flex: 1,
    position: "relative"
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
