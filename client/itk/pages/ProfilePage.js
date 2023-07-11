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
import { BIO_KEY } from "../AsyncKeys";
import { PROFILE_PIC_KEY } from "../AsyncKeys";

const ProfilePage = ({ navigation, route }) => {
  const [bio, setBio] = useState();
  const [profilePic, setProfilePic] = useState();
  const readData = async () => {
    try {
      bioTemp = await AsyncStorage.getItem(BIO_KEY);
      picTemp = await AsyncStorage.getItem(PROFILE_PIC_KEY);

      if (picTemp !== null) {
        console.log("fetched");
        setBio(bioTemp);
        setProfilePic(picTemp);
      }
    } catch (e) {
      alert("error");
    }
  };
  useEffect(() => {
    const focusHandler = navigation.addListener("focus", () => {
      console.log("refreshed");
      readData();
    });
    return focusHandler;
    //   AsyncStorage.getAllKeys((err, keys) => {
    //     AsyncStorage.multiGet(keys, (err, stores) => {
    //       stores.map((result, i, store) => {
    //         // get at each store's key/value so you can work with it
    //         let key = store[i][0];
    //         let value = store[i][1];
    //         console.log(key);
    //         console.log(value);
    //       });
    //     });
    //   });
    // readData();
  }, [navigation]);
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
  console.log(bio);
  if (bio) {
    showBio = <BioText bioText={bio} />;
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
