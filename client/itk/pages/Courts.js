import { View, StyleSheet, Text, ScrollView, SafeAreaView } from "react-native";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import React,{ useState, useEffect, useRef} from "react";
import ParkTab from "../components/ParkTab";
import light from "../assets/themes/light.js";
import AppHeader from "../components/AppHeader";
import Navbar from "../components/Navbar";
import {PageStyles} from "../assets/Styles";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import * as Location from 'expo-location';


export default function Courts({navigation,route}) {
  // console.log(React);
  const onRegionChange = (region)=>{
    getCourtsFromSearch(region.latitude,region.longitude)
  }
  //used for loading data from the backend for courts
  const courtObject = useRef({});
  const [courtMarkers,setCourtMarkers] = useState(<Marker></Marker>);
  const [courtData,setCourtData] = useState([]);
  const [courtTabs, setCourtTabs] = useState([])
  // used for starting and current positioning on maps
  const [mapLatDelta,setMapLatDelta] = useState(.1);
  const [mapLonDelta,setMapLonDelta] = useState(0.12050628662110796);
  const [mapLat,setMapLat] = useState(36.9741);
  const [mapLon,setMapLon] = useState(-122.0308);
  const [userCurrentLocation, setUserCurrentLocation] = useState({latitude:mapLat,longitude:mapLon});
  const initialRegion = {latitude:mapLat,longitude:mapLon,longitudeDelta:mapLonDelta, latitudeDelta:mapLatDelta}
  async function getLatLon(data){
    axios({
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/place/details/json?placeid=${data.place_id}&key=${process.env.EXPO_PUBLIC_API_KEY}`,
    }).then((response) => {
      //gotta set the map here
      setMapLat(response.data.result.geometry.location.lat);
      setMapLon(response.data.result.geometry.location.lng);
      getCourtsFromSearch(response.data.result.geometry.location.lat,response.data.result.geometry.location.lng) //next function
      
    });
    
  }
  async function getCourtsFromSearch(lat,lon){

      const closeCourts = []
      for(const key in courtObject.current){
        
        var euclid = distance(courtObject.current[key].lat,lat,courtObject.current[key].lon,lon)

        if(euclid< 20){
          closeCourts.push(courtObject.current[key])
        }
      }
      mapMarkers(closeCourts)
      

  }
  function distance(lat1,lat2, lon1, lon2){
      // function from https://www.geeksforgeeks.org/program-distance-two-points-earth/
    lon1 =  lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2)
    + Math.cos(lat1) * Math.cos(lat2)
    * Math.pow(Math.sin(dlon / 2),2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 6371;

    // calculate the result
    return(c * r);
}

  function mapMarkers(results){
    var currentCourtObject = courtObject.current
    setCourtTabs(results.map((item,index)=>{
        return(
          <ParkTab key={item.placesID} name={item.name} onPress= { ()=>{redirectToPark(item)}}/>
         )
    }))
    //at this point we just need to make the posts and all of the courts encountered by users will auto populate in the DB
  }
  useFocusEffect( React.useCallback(() => {
    // const unsubscribe = API.subscribe(userId, user => setUser(user));
    let isActive = true;
    const getCourts = async () => {
      const res = await fetch(`${process.env.EXPO_PUBLIC_ENDPOINT}/courts/all`);
      const data = await res.json();
      var master = {};
      for(var i = 0; i<data.length; i ++){
        var current = data[i].placesID
        if(current){
          master[current]=  data[i];
        }
        setCourtMarkers(
          data.map((item,index)=>{
            return(
              <Marker
                key = {index*100}
                coordinate = {{latitude:item.lat,longitude:item.lon}}
                title = {item.name}
                description = {item.location}
                />
          )
          })
        )
      }
      setCourtData(data);
      courtObject.current = master;
      getPermissions();
    }
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      // (currentLocation);

      setMapLat(currentLocation.coords.latitude);
      setMapLon(currentLocation.coords.longitude);
      setUserCurrentLocation({lat:currentLocation.coords.latitude,lon:currentLocation.coords.longitude})
      getCourtsFromSearch(currentLocation.coords.latitude,currentLocation.coords.longitude);
    };
    getCourts();

    return () => isActive =false;
  }, [])
);

  
  function redirectToPark(data){
    navigation.navigate('ParkView',{props:data})

  }
  // setCourtTabs( courtData.map(courtInfo =>{
  //    return(
  //   <ParkTab key={courtInfo.name} name={courtInfo.name} onPress= { ()=>{redirectToPark(courtInfo)}}/>
  //  )}
  //  ));

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
            getLatLon(data);
          }}
          // GooglePlacesSearchQuery= {[{ rankby: 'distance', type: 'restaurant' }]}
          query={{
            key: `${process.env.EXPO_PUBLIC_API_KEY}`,
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
          {courtTabs}
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
