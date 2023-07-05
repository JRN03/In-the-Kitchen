import * as React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";

const Navbar = () => {
    return(
        <View style = {styles.navWrap}>
            <TouchableOpacity style={styles.button} title="home"><Image style={styles.img} source={require("../assets/home-2.png")}/></TouchableOpacity>
            <TouchableOpacity style={styles.button} title="courts"><Image style={styles.img} source={require("../assets/location.png")}/></TouchableOpacity>
            <TouchableOpacity style={styles.button} title="add"><Image style={styles.img} source={require("../assets/add.png")}/></TouchableOpacity>
            <TouchableOpacity style={styles.button} title="friends"><Image style={styles.img} source={require("../assets/user.png")}/></TouchableOpacity>
            <TouchableOpacity style={styles.button} title="messages"><Image style={styles.img} source={require("../assets/messages-2.png")}/></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    navWrap: {
        width: "90%",
        minHeight: 50,
        maxHeight: 80,
        height: "15%",
        borderRadius: 25,
        padding: 10,
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        bottom: 30
    },
    button:{
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10
    },
    img: {
        height: "70%",
        aspectRatio: 1
    }
})
export default Navbar;