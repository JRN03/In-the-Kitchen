import * as React from "react";
import { View, StyleSheet, Image, SafeAreaView } from "react-native";
import AppHeader from "../components/AppHeader";
import light from "../assets/themes/light.js";
import AddFriendButton from "../components/AddFriendButton";
import SendMessageButton from "../components/SendMessageButton";
import BioText from "../components/BioText";
import ImagePickerExample from "../components/ImagePicker";
import MutualFriends from "../components/MutualFriends";
import Navbar from "../components/Navbar";

//update top left picture to be photo that is choosen
// seperate page for edit

const ProfilePage = () => {
  return (
    <SafeAreaView style={styles.main}>
      <AppHeader />
      <View style={styles.contentWrap}>
        <ImagePickerExample></ImagePickerExample>
        <BioText></BioText>
        <MutualFriends></MutualFriends>
        <Navbar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: light.primary,
  },
  contentWrap: {
    width: "90%",
    flex: 1,
    position: "relative",
  },
  map: {
    height: "35%",
    width: "100%",
    borderRadius: 10,
  },
  nearbyContainer: {
    width: "100%",
    flexGrow: 0,
    maxHeight: "32%",
  },
});

export default ProfilePage;
