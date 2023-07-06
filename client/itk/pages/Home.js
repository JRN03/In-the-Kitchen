import * as React from "react";
import { SafeAreaView, Text,View } from "react-native";
import Navbar from "../components/Navbar";
import {PageStyles} from "../assets/Styles";
import AppHeader from "../components/AppHeader";

export default function Home(){
    return (
        <SafeAreaView style={PageStyles.main}>
            <AppHeader/>
            <View style={PageStyles.contentWrap}>
                <Navbar/>
            </View>
        </SafeAreaView>
    )
}