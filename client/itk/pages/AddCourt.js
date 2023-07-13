import { View, Text, StyleSheet, SafeAreaView, Image, ImageBackground, TextInput, Button, TouchableOpacity, Alert} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import light from "../assets/themes/light.js";
import {PageStyles} from "../assets/Styles";
import {React, useState, useEffect, useRef} from "react";
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';



const AddCourt = ({route}) => {
	const navigation = useNavigation();
    const [Lat,setMapLat] = useState(36.9741);
    const [Lon,setMapLon] = useState(-122.0308);
    const [PID, setPID] = useState('useless text');
    const [Location, setLoc] = useState('useless text');
    const [Name, setName] = useState('useless text');
    const [Times, setTimes] = useState(null);
    const [image, setImage] = useState(null);
    const addImage=()=>{};
    // parse everything, images, times
	
  async function getInfo(data){
    axios({
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/place/details/json?placeid=${data.place_id}&key=AIzaSyBxU1ITfiSI_aOf0aId4B3jcQctMNlzRbk`,
    }).then((response) => {
      setMapLat(response.data.result.geometry.location.lat);
      setMapLon(response.data.result.geometry.location.lng);
      setPID(data.place_id)
      setName(response.data.result.name)
      setLoc(response.data.result.formatted_address)
    //   console.log(response.data.result.formatted_address)
    });
    
  }

	const submitForm = () => {
		console.log(PID, Location, Lat, Lon, Name, Times)
		fetch('http://localhost:8080/auth/register', {
		method: 'POST',
		body: JSON.stringify({
			location: Location,
			name: Name,
			times: Times,
			placesID: PID,
            lat: Lat,
            lon: Lon
		}),
		headers: {'Content-Type': 'application/json'}
	})
	.then(res => res.json())
	.then(data => {
		console.log(data);
		if (data.user) {
			navigation.navigate('Courts');
            Alert.alert('Court Added!');
		} else {
			Alert.alert('Error');
		}
	})
	.catch(error => {
		console.error('Error:', error);
	});
}

	return (
		<SafeAreaView style = {PageStyles.main}>
			<View style = {{}}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Courts')}>
                    <Text style={{color: 'white', fontSize: 17, textDecorationLine: 'underline'}}>{"<- Don't add court, it won't hurt our feelings"}</Text>
                </TouchableOpacity>
                <Text style = {{color: 'white', fontSize: 15, textAlign: 'center', top: 10}}>{"Type address of Court/Park below!"}</Text>
                
                {/* When the user clicks once it doesnt autofill all the way */}
                <GooglePlacesAutocomplete
                    placeholder='Search'
                    styles={styles.searchWrap}
                    onPress={(data, details = null) => {
                        getInfo(data);
                    }}
                    query={{
                        key: 'AIzaSyBxU1ITfiSI_aOf0aId4B3jcQctMNlzRbk',
                        language: 'en',
                    }}
                    onFail={(error) => console.error(error)}
                    enablePoweredByContainer={false}

                />
                <Text style = {{color: 'white', fontSize: 15, textAlign: 'center', top: 20}}>{"Optional: Add up to three images of the park!"}</Text>
                
                <View style = {{top: 30}}>
                    <View style={imageUploaderStyles.container}>
                    {
                        image  && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                    }
                        <View style={imageUploaderStyles.uploadBtnContainer}>
                            <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
                                <Text>{image ? 'Edit' : 'Upload'} Image</Text>
                                <AntDesign name="camera" size={20} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style = {{top: -130, left: 175}}>
                    <View style={imageUploaderStyles.container}>
                    {
                        image  && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                    }
                        <View style={imageUploaderStyles.uploadBtnContainer}>
                            <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
                                <Text>{image ? 'Edit' : 'Upload'} Image</Text>
                                <AntDesign name="camera" size={20} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style = {{top: -115, left: 87}}>
                    <View style={imageUploaderStyles.container}>
                    {
                        image  && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                    }
                        <View style={imageUploaderStyles.uploadBtnContainer}>
                            <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
                                <Text>{image ? 'Edit' : 'Upload'} Image</Text>
                                <AntDesign name="camera" size={20} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <Text style = {{color: 'white', fontSize: 15, textAlign: 'center', top: -100}}>{"Optional: Common court meet times below!"}</Text>
                <Text style = {{color: 'white', fontSize: 15, textAlign: 'center', top: -100}}>{"Notice formatting:"}</Text>
                <Text style = {{color: 'white', fontSize: 15, textAlign: 'center', top: -100}}>{"Day: #AM/PM-#AM/PM"}</Text>
                <Text style = {{color: 'white', fontSize: 15, textAlign: 'center', top: -100}}>{"Ex: Friday: 9AM-12PM"}</Text>

                <TextInput style = {styles.timeBox}
					placeholder = 'Meeting Times'
					placeholderTextColor={'#D3D3D3'}
					autoCapitalize='words'
                    multiline
                    maxLength={150}
					onChangeText={text => setTimes(text)}
					value={Times}
				></TextInput>


			</View>

			<TouchableOpacity style={buttonStyle.picklebut}
				onPress={null}>
				<Text style = {{textAlign: 'center'}}>{"Submit Court :D"}</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

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
    timeBox:{
        fontSize: 15, 
        alignSelf: 'center',
		backgroundColor: 'white',
		height: 110,
		margin: 12,
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
		width: 250,
        top: -105
      },
    searchWrap: {
      container: {
        flex: 0,
        marginVertical: 10,
        maxHeight: "45%",
        zIndex: 1,
        width: 300,
        top: 10,
        left: 15
      },
      textInput: {
        width: '100%',
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

const buttonStyle = StyleSheet.create({
	picklebut: {
		borderRadius: 10,
		height: 38,
		width: 78,
		backgroundColor: 'white',
		alignSelf: 'center',
        top: -100,
	},
})

const imageUploaderStyles=StyleSheet.create({
    container:{
        elevation:2,
        height:160,
        width:160,
        backgroundColor:'#efefef',
        position:'relative',
        borderRadius:10,
        overflow:'hidden',
    },
    uploadBtnContainer:{
        opacity:0.7,
        position:'absolute',
        right:0,
        bottom:0,
        backgroundColor:'lightgrey',
        width:'100%',
        height:'25%',
    },
    uploadBtn:{
        display:'flex',
        alignItems:"center",
        justifyContent:'center'
    }
})

export default AddCourt;