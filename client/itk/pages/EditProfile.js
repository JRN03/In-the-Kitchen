import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import AppHeader from "../components/AppHeader";
import PickImage from "../components/ImagePicker";
import { useNavigation } from "@react-navigation/native";
import { PageStyles } from "../assets/Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BIO_KEY, TOKEN, PROFILE_PIC_KEY } from "../AsyncKeys";

const EditProfile = ({ route }, props) => {
  const navigation = useNavigation();
  const [bio, setBio] = useState(route.params.bio);
  const [profilePic, setProfilePic] = useState(route.params.profilePic);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const focusHandler = navigation.addListener("focus", () => {
      setBio(route.params.bio);
      setProfilePic(route.params.profilePic);
    });
    return focusHandler;
  }, [navigation]);

  const textChangeHandler = (text) => {
    setBio(text);
  };

  useEffect(() => {
    const readData = async () => {
      try {
        const value = await AsyncStorage.getItem(TOKEN);
        if (value !== null) {
          // Value found in async storage, set it as the initial state
          setToken(value);
        }
      } catch (error) {
        // Handle AsyncStorage errors
        console.log("AsyncStorage error:", error);
      }
    };
    readData(); // Call the async function to fetch the value
  }, []);

  const saveButtonHandler = () => {
    if (bio === undefined) {
      setBio("");
    }
    const saveData = async () => {
      try {
        await AsyncStorage.setItem(BIO_KEY, bio);
        await AsyncStorage.setItem(PROFILE_PIC_KEY, profilePic.uri);
      } catch (e) {
        console.log("failed to save in edit profile");
      }
    };
    saveData();

    fetch("http://localhost:8080/user/pfp", {
      method: "PUT",
      body: JSON.stringify({
        uri: "data:image/jpeg;base64," + profilePic.base64,
      }),
      headers: { "Content-Type": "application/json", token: token },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    navigation.navigate("Profile");
  };

  const setImagePath = (path) => {
    setProfilePic(path);
  };
  return (
    <SafeAreaView style={PageStyles.main}>
      <AppHeader pfp={profilePic.uri} />
      <View style={PageStyles.contentWrap}>
        <PickImage
          imagePath={setImagePath}
          currentImage={route.params.profilePic}
        ></PickImage>
        <View style={styles.container}>
          <TextInput
            style={styles.textBox}
            multiline
            maxLength={150}
            onChangeText={textChangeHandler}
            placeholder="Type your bio here..."
          >
            {bio}
          </TextInput>
          <TouchableOpacity
            style={{ marginTop: 10 }}
            onPress={saveButtonHandler}
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
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#176089",
    alignItems: "center",
    maxHeight: 140,
  },
  textBox: {
    color: "black",
    backgroundColor: "white",
    borderColor: "white",
    fontSize: 16,
    overflow: "hidden",
    height: 100,
    width: 250,
    borderRadius: 15,
    marginTop: 15,
    padding: 10,
  },
});

export default EditProfile;
