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
        position: "relative",
        bottom: 0,
    },
    button:{
        borderRadius: 10,
        padding: 10
    },
    img: {
        height: "80%",
        aspectRatio: 1
    }
})
export default Navbar;