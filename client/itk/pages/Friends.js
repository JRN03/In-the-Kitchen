import * as React from "react";
import { SafeAreaView, StyleSheet,Text, View } from "react-native";
import Navbar from "../components/Navbar";
import light from "../assets/themes/light";
import AppHeader from "../components/AppHeader";
import {PageStyles} from "../assets/Styles";

export default function Friends({route}){
    return (
        <SafeAreaView style={PageStyles.main}>
            <AppHeader/>
            <View style={PageStyles.contentWrap}>
                <Navbar route={route}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    main: {
        height: "100%",
        width: "100%",
        backgroundColor: light.primary,
        alignItems:"center"
    },
    contentWrap: {
        width: "90%",
        flex: 1
    }
});