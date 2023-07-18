import * as React from "react";
import { Pressable, SafeAreaView, View, Text, StyleSheet } from "react-native";
import Navbar from "../components/Navbar";
import { PageStyles } from "../assets/Styles";
import AppHeader from "../components/AppHeader";
import light from "../assets/themes/light";
import { useNavigation } from "@react-navigation/native";
import ChatComponent from "../components/ChatComponent";

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

const newMessage = () => {
  console.log("Create new message");
};

const toMessenger = () => {
  console.log("To the messenger");
};

export default Messages = ({ route }) => {
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
  return (
    <SafeAreaView style={PageStyles.main}>
      <AppHeader route={route} action={newMessage} />
      <View style={PageStyles.contentWrap}>
        <ChatComponent></ChatComponent>
        <Navbar route={route} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
