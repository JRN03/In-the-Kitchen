import React from "react";
import { View, SafeAreaView } from "react-native";
import AppHeader from "../components/AppHeader";
import BioText from "../components/BioText";
import ImagePickerExample from "../components/ImagePicker";
import MutualFriends from "../components/MutualFriends";
import Navbar from "../components/Navbar";
import { PageStyles } from "../assets/Styles";

//update top left picture to be photo that is choosen
// seperate page for edit

const EditProfile = () => {
  return (
    <SafeAreaView style={PageStyles.main}>
      <AppHeader />
      <View style={PageStyles.contentWrap}>
        <ImagePickerExample></ImagePickerExample>
        <BioText></BioText>
        <MutualFriends></MutualFriends>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;
