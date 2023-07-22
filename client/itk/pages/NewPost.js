import { SafeAreaView,View,Text, TouchableOpacity,StyleSheet, ScrollView, Alert } from "react-native";
import AppHeader from "../components/AppHeader";
import { PageStyles } from "../assets/Styles";
import light from "../assets/themes/light";
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
  } from "@expo-google-fonts/roboto-slab";
import Post from "../components/Post";
import { getItemFromCache } from "../ReadCache";
import { PROFILE_PIC_KEY, TOKEN, UNAME } from "../AsyncKeys";
import { useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker'

export default function NewPost({route,navigation}){

    const [token,setToken] = useState();
    const [username,setUsername] = useState();
    const [pfp, setPfp] = useState();
    const [images,setImages] = useState([]);
    const [body,setBody] = useState("");

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

    const currentDate = new Date();
    const month = currentDate.getMonth() + 1; // Months are 0-indexed, so add 1
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    const formattedDate = `${month}/${day}/${year}`;

    useEffect(() => {

        const loadCache = async () => {
            try {
                const t = await getItemFromCache(TOKEN);
                const img = await getItemFromCache(PROFILE_PIC_KEY);
                const uname = await getItemFromCache(UNAME);
                setToken(t);
                setPfp(img);
                setUsername(uname);
            } catch(e){
                console.log("err in NewPost.js line 46", e,"err");
            }
        }
        
        loadCache();

    },[])

    if (!fontsLoaded || !token || !pfp || !username) {
        return null;
    }

    const addImage = async () => {
        if (images.length > 4) return;
        let image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });
        if (!image.canceled) {
            const newImages = [...images,image.assets[0].base64]
            setImages(newImages);
        }
    }

    const submitPost = async () => {
        const fetchBody = {
            body: body,
            images: images, // array of base64 data
            date: formattedDate,
            u_id: username
        }
        if (!body.length && !images.length) return Alert.alert("","Please write a body or upload images");
        const res = await fetch("http://localhost:8080/posts",{
            method: "POST",
            headers: {"Content-Type":"application/json",token:token},
            body: JSON.stringify(fetchBody)
        });
        const data = await res.json();
        Alert.alert("",data.message);
    }

    return (
        <SafeAreaView style={PageStyles.main}>
            <AppHeader noAction/>
            <View style={PageStyles.contentWrap}>
                <View style={styles.headerWrap}>
                    <Text style = {styles.title}>New Post</Text>
                    <TouchableOpacity style={styles.back} onPress={() => navigation.pop()}>
                        <Text style={{color:"white",fontFamily:"RobotoSlab_400Regular"}}>Go Back</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView scrollEnabled={false} style={styles.scroll}>
                    <Post setBody={setBody} submitPost={submitPost} addImage={addImage} pfp={pfp} id={username} images={images} date={formattedDate} isNew/>
                </ScrollView>
            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    headerWrap:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center",
        marginVertical: 15
    },
    back:{
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: light.secondary,
        borderRadius: 10,
    },
    title: {
        color: "white",
        fontSize: 35,
        fontFamily:"RobotoSlab_600SemiBold"
    },
    scroll: {
        flexGrow:1,
        paddingVertical: 30,
    },
});