
import React,{ useState,useEffect, useRef} from 'react';
import { View, Image, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Carousel from "./Carousel";
import light from '../assets/themes/light';
import { getItemFromCache } from '../ReadCache';
import { TOKEN } from '../AsyncKeys';
// need to fetch user id
//{name, date,description,imageSource}

// anything after isNew is only for new posts
const Card = (props) => {

    const token = useRef();
    const [image,setImage] = useState();
    const imageRef = useRef();

    useEffect(() => {

      if (props.isNew) return setImage(props.pfp);

      const getImage = async () => {
        token.current = await getItemFromCache(TOKEN);
        const res = await fetch(`http://localhost:8080/images/users/${props.id}`,{
            method: "GET",
            headers: {"Content-Type":"appllication/json", token:token.current}
        })
        const data = await res.json();
        if (data.imageData) setImage("data:image/jpeg;base64,"+data.imageData);
      }

      getImage();
    
    },[]);  
    if (!image) return;
    return (
        <View style={styles.card}>
          <View style={styles.contentContainer}>
            <Image ref={imageRef} source={image ? {uri: image} : require("../assets/TempProfilePic.jpeg")} style={styles.profileImage} />
            <View style={styles.textContainer}>
              <Text style={styles.nameText}>{props.id}</Text>
              <Text style={styles.dateText}>{props.date}</Text>
            </View>
          </View>
          {props.isNew && <TextInput multiline onChangeText={(txt) => props.setBody(txt)} style={[styles.input]}/>}
          {props.body && <Text style={styles.descriptionText}>{props.body}</Text>}
          {(props.images && props.images.length > 0) && <Carousel isNew={props.isNew} images={props.images}/>}
          {props.isNew && 
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={props.addImage} style={styles.newImg}><Image style={styles.img} source={require("../assets/upload-image.png")}/></TouchableOpacity>
              <TouchableOpacity style={styles.post} onPress={props.submitPost}><Text style={{color:"white"}}>Post</Text></TouchableOpacity>
            </View>
          }
        </View>
      );
};

const styles = StyleSheet.create({
    card: {
      width:"100%",
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      padding: 16,
      marginBottom: 16,
      alignItems: "center"
    },
    contentContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 8,
      width: "100%"
    },
    profileImage: {
      width: 70,
      height: 73,
      borderRadius: 100,
      marginRight: 16,
    },
    textContainer: {
      flexDirection: 'column',
    },
    nameText: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    dateText: {
      fontSize: 16,
      color: '#888888',
    },
    descriptionText: {
      fontSize: 18,
      textAlign:"left",
      width: "100%",
      marginBottom: 20
    },
    input: {
      borderWidth: 1,
      borderColor:"#cccccc",
      borderRadius: 8,
      padding: 10,
      width: "100%",
      fontSize: 18,
      textAlign:"left",
      width: "100%",
      justifyContent: "center",
      marginBottom: 20
    },
    newImg: {
      alignSelf: "center",
      height: 20,
    },
    img: {
      height: "100%",
      aspectRatio: 1,
    },
    buttonContainer: {
      width: "100%",
      justifyContent: "space-between",
      flexDirection: "row",
      marginTop: 20,
      alignItems: "center",
    },
    post: {
      backgroundColor: light.secondary,
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 5
    }
});
 export default Card;