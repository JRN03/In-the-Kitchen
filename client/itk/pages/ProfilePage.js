import * as React from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import AppHeader from "../components/AppHeader";
import BioText from "../components/BioText";
import MutualFriends from "../components/MutualFriends";
import Navbar from "../components/Navbar";
import { PageStyles } from "../assets/Styles";

//update top left picture to be photo that is choosen
// seperate page for edit

const ProfilePage = ({ navigation, route }) => {
  let showBio;
  let image;
  let path;
  if (route.params !== undefined && route.params.imagePath != undefined) {
    image = (
      <Image
        source={{ uri: route.params.imagePath }}
        style={{ width: 150, height: 150, borderRadius: 150 / 2 }}
      />
    );
    path = { uri: route.params.imagePath };
  } else {
    image = (
      <Image
        source={require("../assets/TempProfilePic.jpeg")}
        style={{ width: 150, height: 150, borderRadius: 150 / 2 }}
      />
    );
    path = require("../assets/TempProfilePic.jpeg");
  }
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
        onPress={() => navigation.navigate("EditProfile", { imgPath: path })}
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
      <AppHeader profilePic={path} />
      <View style={PageStyles.contentWrap}>
        <View style={styles.container}>{image}</View>
        {showBio}
        <MutualFriends></MutualFriends>
        <Navbar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    maxHeight: 200,
    minHeight: 180,
    alignItems: "center",
  },
});

export default ProfilePage;
