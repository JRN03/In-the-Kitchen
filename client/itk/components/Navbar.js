import * as React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import light from "../assets/themes/light";

const Navbar = ({route,token}) => {
    const navigation = useNavigation();
    return(
        <View style = {styles.navWrap}>
            <TouchableOpacity onPress={() => navigation.navigate('Home',{token:token})} style={route.name == "Home" ? styles.buttonSelected : styles.button} title="home"><Image style={styles.img} source={route.name == "Home" ? require("../assets/home-1.png") : require("../assets/home-2.png")}/></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Courts',{token:token})} style={route.name == "Courts" ? styles.buttonSelected : styles.button} title="courts"><Image style={styles.img} source={route.name == "Courts" ? require("../assets/courts-1.png") : require("../assets/courts-2.png")}/></TouchableOpacity>
            <TouchableOpacity style={styles.button} title="add"><Image style={styles.img} source={require("../assets/add.png")}/></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Friends',{token:token})} style={route.name == "Friends" ? styles.buttonSelected : styles.button} title="friends"><Image style={styles.img} source={route.name == "Friends" ? require("../assets/user-1.png") : require("../assets/user-2.png")}/></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Messages',{token:token})} style={route.name == "Messages" ? styles.buttonSelected : styles.button} title="messages"><Image style={styles.img} source={route.name == "Messages" ? require("../assets/messages-1.png") : require("../assets/messages-2.png")}/></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    navWrap: {
        width: "100%",
        minHeight: 50,
        maxHeight: 70,
        height: "15%",
        borderRadius: 25,
        padding: 10,
        marginVertical: 10,
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        bottom: 0,
    },
    button:{
        borderRadius: 10,
        padding: 10
    },
    buttonSelected: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: light.primary
    },
    img: {
        height: "80%",
        aspectRatio: 1
    }
})
export default Navbar;