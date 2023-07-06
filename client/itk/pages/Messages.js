import * as React from "react";
import { SafeAreaView,View } from "react-native";
import Navbar from "../components/Navbar";
import { PageStyles } from "../assets/Styles";
import AppHeader from "../components/AppHeader";

export default function Messages(){
    return (
        <SafeAreaView style={PageStyles.main}>
            <AppHeader/>
            <View style={PageStyles.contentWrap}>
                <Navbar/>
            </View>
        </SafeAreaView>
    )
}