import * as React from "react";
import { View, SafeAreaView, TouchableOpacity, Text } from "react-native";
import AppHeader from "../components/AppHeader";
import BioText from "../components/BioText";
import ImagePickerExample from "../components/ImagePicker";
import MutualFriends from "../components/MutualFriends";
import Navbar from "../components/Navbar";
import { PageStyles } from "../assets/Styles";

//update top left picture to be photo that is choosen
// seperate page for edit

const ProfilePage = ({ navigation, route }) => {
  let showBio;
  if (
    route.params !== undefined &&
    String(route.params.bioText).length > 0 &&
    route.params.bioText != undefined
  ) {
    showBio = <BioText bioText={route.params.bioText} />;
  } else {
    showBio = (
      <TouchableOpacity
        style={{
          marginTop: 10,
          width: "30%",
          alignSelf: "center",
          alignItems: "center",
        }}
        onPress={() => navigation.navigate("EditProfile")}
      >
        <Text
          style={{
            fontSize: 15,
            color: "white",
            backgroundColor: "#1E94D7",
            borderWidth: 1,
            borderColor: "white",
            borderRadius: 6,
          }}
        >
          Edit Profile
        </Text>
      </TouchableOpacity>
    );
  }
  return (
    <SafeAreaView style={PageStyles.main}>
      <AppHeader />
      <View style={PageStyles.contentWrap}>
        <ImagePickerExample></ImagePickerExample>
        {showBio}
        <MutualFriends></MutualFriends>
        <Navbar />
      </View>
    </SafeAreaView>
  );
};

export default ProfilePage;
