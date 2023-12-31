import * as React from "react"
import {View,Text,StyleSheet, TouchableOpacity, Image} from "react-native"
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
import light from "../assets/themes/light";
import { useNavigation } from "@react-navigation/native";
import {getItemFromCache} from "../ReadCache"
import {TOKEN} from "../AsyncKeys";

export default function FriendTab(props) {

    const navigation = useNavigation();
    const [image,setImg] = React.useState();
    const token = React.useRef();

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
    React.useEffect(() => {

        const getImage = async () => {
          token.current = await getItemFromCache(TOKEN);
          fetch(`${process.env.EXPO_PUBLIC_ENDPOINT}/images/users/${props.data.username}`,{
              method: "GET",
              headers: {"Content-Type":"appllication/json",token:token.current}
          })
          .then(res => res.json())
          .then(data => {
              setImg("data:image/jpeg;base64,"+data.imageData);
          })
          .catch(e => console.log('err',e));
    
        }
    
        getImage();
    
    },[image]);

    if (!fontsLoaded) {
      return null;
    }

    if (!image) return;

    return (
        <View style={styles.main}>
            <View style={styles.imgWrap}>
                <Image style={styles.img} source={{uri: image}} />
            </View>
            <View style={styles.nameWrap}>
                <Text style={styles.name}>{props.name}</Text>
            </View>
            <TouchableOpacity style={styles.view} onPress={() => navigation.navigate("ViewFriend",{data: props.data, image: image})}><Text style={styles.go}>View</Text></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        width: "100%",
        borderBottomColor: "black",
        borderBottomWidth: 1,
        paddingVertical: 15,
        height: 70,
        flexDirection: "row",
        alignItems: "center"
    },
    imgWrap:{
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
    },
    img: {
        flex: 1,
        aspectRatio: 1,
        borderRadius: 360,
    },
    nameWrap:{
        flex: 3,
        paddingHorizontal: 5
    },
    name: {
        color:"white",
        fontSize: 22
    },
    view: {
        flex: 1,
        alignItems: "center",
        height: "80%",
        justifyContent: "center",
        backgroundColor:light.secondary,
        borderRadius: 10,
    },
    go: {
        color: "white"
    }
});