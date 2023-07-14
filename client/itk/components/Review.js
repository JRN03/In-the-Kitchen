import { Rating, AirbnbRating } from 'react-native-ratings';
import {React, useState, useEffect, useRef} from "react";
import { View, StyleSheet, Text, Alert, processColor, TouchableOpacity,Modal,Pressable } from "react-native";
import axios from 'axios';


export default function Review(props){
    const [modalVisible, setModalVisible] = useState(false);
    const [userRating , setUserRating] = useState(3);
    const [parkRatings, setParkRating]= useState(props.ratings)
    const [parkScore, setParkScore] = useState(0);
    function getRating(){
        var parkRating = 0;
        for(var i = 0; i<parkRatings.length; i++){
            parkRating+=props.ratings[i];
        }
        setParkScore((parkRating/props.ratings[i]))
    }
    

    function ratingCompleted(rating) {
        console.log("Rating is: " + rating)
        setUserRating(rating)
    } 
    function submitReview(){
        //make post method from here
        axios({
            method: 'put',
            url: `http://localhost:8080/courts/${props.placesID}`,
            body:{rating:userRating}
          }).then((response) => {
            // console.log(response.status)
            if(response.status == 201){
                Alert.alert("Your review has been added!");
            }else{
                Alert.alert("There was an issue adding your review...")
            }
            // console.log("location",response.data.result.geometry.location);  //just to see what the location was
            //gotta set the map here
            
          });    
        
    }
    return(
        <View >
        <View 
            style = {{width: "100%",
                        height: 60,
                        borderRadius: 20,
                        // backgroundColor: "white",
                        marginVertical: 10,
                        paddingHorizontal: 20,
                        flexDirection: "row",
                        alignItems: "left",
        }}>
            <AirbnbRating
                ratingColor='yellow'
                ratingBackgroundColor='#176089'
                ratingCount={5}
                size={20}
                defaultValue = {3}
                reviewSize = {20}
                // review = {reviews}
                showRating = {false}
                isDisabled = {true}
                ratingContainerStyle = {{flex:3,alignItems:"left",left:-25}}
            />
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.textStyle}>Review</Text>
            </Pressable>
        </View>
        
       
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
            }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Leave a reivew</Text>
                        <AirbnbRating
                            ratingColor='yellow'
                            ratingBackgroundColor='white'
                            reviewColor= 'white'
                            ratingCount={5}
                            size={25}
                            defaultValue = {3}
                            // reviewSize = {15}
                            // reviews = {reviews}
                            showRating = {false}
                            onFinishRating = {ratingCompleted}
                            ratingContainerStyle = {{paddingTop: 10, paddingBottom: 15, fontFamily:"RobotoSlab_400Regular"}}
                        />
                        {/* <TouchableOpacity onPress = {submitReview} style={styles.button} title="submit"><Text style={styles.introText}>Submit Review</Text></TouchableOpacity> */}
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                setModalVisible(!modalVisible)
                                submitReview()
                                }}>
                        <Text style={{fontSize:18,color:'black',textAlign:'center'}}>Submit</Text>
                        </Pressable>
                    </View>
             </View>
        </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      width:100
    },
    buttonOpen: {
      backgroundColor: "#1E94D7",
      right:-20
    },
    buttonClose: {
        paddingTop: 10,
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 5,
      textAlign: 'center',
    },
  });
  
  