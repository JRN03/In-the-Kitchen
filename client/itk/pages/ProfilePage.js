import React, { useState, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BIO_KEY, PROFILE_PIC_KEY } from "../AsyncKeys";

// need to use state to manage if the page is ready
// use conditional isReady state while we fetch data

const ProfilePage = ({ navigation, route }) => {
  const [bio, setBio] = useState();
  const [profilePic, setProfilePic] = useState();

  // read profile pic + bio from cache
  const readData = async () => {
    try {
      bioTemp = await AsyncStorage.getItem(BIO_KEY);
      picTemp = await AsyncStorage.getItem(PROFILE_PIC_KEY);

      if (picTemp !== null) {
        if (bioTemp === null) {
          setBio("");
        } else {
          setBio(bioTemp);
        }
        setProfilePic(picTemp);
      }
    } catch (e) {
      alert("failed to load data in profile page");
    }
  };

  // make sure that page is rerendered
  useEffect(() => {
    const focusHandler = navigation.addListener("focus", () => {
      readData();
    });
    return focusHandler;
  }, [route.name]);

  //set up image
  let image;
  if (
    profilePic !== undefined &&
    profilePic !== "../assets/TempProfilePic.jpeg"
  ) {
    image = (
      <Image
        source={{ uri: profilePic }}
        style={{ width: 150, height: 150, borderRadius: 150 / 2 }}
      />
    );
  } else {
    image = (
      <Image
        source={require("../assets/TempProfilePic.jpeg")}
        style={{ width: 150, height: 150, borderRadius: 150 / 2 }}
      />
    );
  }

  const editButtonHandler = () => {
    navigation.navigate("EditProfile", {
      profilePic: profilePic,
      bio: bio,
    });
  };

  //set up bio
  if (bio) {
    showBio = <BioText bioText={bio} profilePic={profilePic} />;
  } else {
    showBio = (
      <TouchableOpacity
        style={{
          marginTop: 10,
          width: "30%",
          alignSelf: "center",
          alignItems: "center",
        }}
        onPress={editButtonHandler}
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
      <AppHeader pfp={profilePic} />
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
