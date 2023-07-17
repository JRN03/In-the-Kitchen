import { View, StyleSheet, Text, ScrollView, SafeAreaView } from "react-native";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import {React, useState, useEffect} from "react";
import ParkTab from "../components/ParkTab";
import light from "../assets/themes/light.js";
import AppHeader from "../components/AppHeader";
import Navbar from "../components/Navbar";
import {PageStyles} from "../assets/Styles";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import axios from 'axios';


export default function Courts({route,navigation}) {
  // const ref = useRef();
  // useEffect(() => {
  //   ref.current?.setAddressText('Some Text');
  // }, []);
  const onRegionChange = (region)=>{
    // console.log(region)
  }
  const [courtMarkers,setCourtMarkers] = useState(<Marker></Marker>);
  const [courtData,setCourtData] = useState([]);
  const [mapLatDelta,setMapLatDelta] = useState(.1);
  const [mapLonDelta,setMapLonDelta] = useState(0.12050628662110796);
  const [mapLat,setMapLat] = useState(36.9741);
  const [mapLon,setMapLon] = useState(-122.0308);
  const initialRegion = {latitude:mapLat,longitude:mapLon,longitudeDelta:mapLonDelta, latitudeDelta:mapLatDelta}
  async function getLatLon(data){
    // console.log("PASSED THROUGH DATA ",data);
    axios({
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/place/details/json?placeid=${data.place_id}&key=AIzaSyBxU1ITfiSI_aOf0aId4B3jcQctMNlzRbk`,
    }).then((response) => {
      // console.log("location",response.data.result.geometry.location);  //just to see what the location was
      //gotta set the map here
      setMapLat(response.data.result.geometry.location.lat);
      setMapLon(response.data.result.geometry.location.lng);
      getCourtsFromSearch(response.data.result.geometry.location.lat,response.data.result.geometry.location.lng) //next function
      
    });
    
  }
  async function getCourtsFromSearch(lat,lon){
    // console.log("QUERY", `https://maps.googleapis.com/maps/api/place/textsearch/json?location=${lat}%2C${lon}&radius=1500&query=pickleball%court&key=AIzaSyBxU1ITfiSI_aOf0aId4B3jcQctMNlzRbk`);
    var secondRes = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?location=${lat}%2C${lon}&radius=1500&query=pickleball+courts&key=AIzaSyBxU1ITfiSI_aOf0aId4B3jcQctMNlzRbk`);
    var courtsNearby = await secondRes.json();
      // console.log("COURT length", courtsNearby.results[0]);
      mapMarkers(courtsNearby.results)
  }
  function mapMarkers(results){
    // console.log(results)
     setCourtMarkers(
        results.map((item,index)=>{
          return(
              <Marker
                key = {index*100}
                coordinate = {{latitude:item.geometry.location.lat,longitude:item.geometry.location.lng}}
                title = {item.name}
                description = {item.formatted_address}
                />
          )
    }))
  }

  // console.log(process.env.MAPS_API);
  useEffect(() => {
    const getCourts = async () => {
      const res = await fetch('http://localhost:8080/courts/all');
      const data = await res.json();
      setCourtData(data);
      //once all the placesIds are found, we make markers and display them
    }
    
    getCourts();

  },[])
 
  const courtObjects = courtData.map(courtInfo => (
    <ParkTab key={courtInfo.placesID} name={courtInfo.name}/>
  ));

  return (
    <SafeAreaView style={PageStyles.main}>
      <AppHeader route={route} action={()=>navigation.navigate("AddCourt")}/>
      <View style={PageStyles.contentWrap}>
        {/* <Searchbar onSubmit={onSubmitText}/> */}
        <GooglePlacesAutocomplete
          placeholder='Search'
          styles={styles.searchWrap}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            // console.log("data",data);
            // console.log("details",details);
            getLatLon(data);
          }}
          // GooglePlacesSearchQuery= {[{ rankby: 'distance', type: 'restaurant' }]}
          query={{
            key: 'AIzaSyBxU1ITfiSI_aOf0aId4B3jcQctMNlzRbk',
            language: 'en',
          }}
          onFail={(error) => console.error(error)}
          enablePoweredByContainer={false}

    />
        {/* set display to be based on state values of Lat and Lon */}
        <MapView
        style={styles.map} 
        provider={PROVIDER_GOOGLE}
        onRegionChange = {onRegionChange}
        initialRegion = {{latitude:mapLat,longitude:mapLon,latitudeDelta:mapLatDelta, longitudeDelta:mapLonDelta}}
        region= {{latitude:mapLat,longitude:mapLon,latitudeDelta:mapLatDelta, longitudeDelta:mapLonDelta}}
        > 
        {courtMarkers}
        </MapView>
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
        <Navbar route={route}/>
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
    position: "absolute"
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
    zIndex: 0
  },
  nearbyContainer:{
    width: "100%",
    flexGrow: 0,
    maxHeight: "32%",
  },
  searchWrap: {
    container: {
      flex: 0,
      marginVertical: 10,
      maxHeight: "45%",
      zIndex: 1
    },
    textInput: {
      height: 40,
      borderRadius: 5,
      zIndex: 2
    },
    listView: {
      borderRadius:5,
      position: "absolute",
      top: 42,
      zIndex: 1
    },
}
});
