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
import { BIO_KEY } from "../AsyncKeys";
import { PROFILE_PIC_KEY } from "../AsyncKeys";

const EditProfile = ({ route }, props) => {
  const navigation = useNavigation();
  const [bio, setBio] = useState();
  const [profilePic, setProfilePic] = useState();

  useEffect(() => {
    // AsyncStorage.getAllKeys((err, keys) => {
    //   AsyncStorage.multiGet(keys, (err, stores) => {
    //     stores.map((result, i, store) => {
    //       // get at each store's key/value so you can work with it
    //       let key = store[i][0];
    //       let value = store[i][1];
    //       console.log(key);
    //       console.log(value);
    //     });
    //   });
    // });
    readData();
  }, []);

  const textChangeHandler = (text) => {
    setBio(text);
  };

  const readData = async () => {
    try {
      const tempBio = await AsyncStorage.getItem(BIO_KEY);
      const tempPic = await AsyncStorage.getItem(PROFILE_PIC_KEY);

      if (tempPic !== null) {
        console.log("fetched");
        setBio(tempBio);
        setProfilePic(tempPic);
      }
    } catch (e) {
      alert(e);
    }
  };

  const saveButtonHandler = async () => {
    try {
      await AsyncStorage.setItem(BIO_KEY, bio);
      await AsyncStorage.setItem(PROFILE_PIC_KEY, profilePic);
      alert("Data saved");
    } catch (e) {
      alert("failed to save");
    }
    navigation.navigate("Profile");
  };

  const setImagePath = (path) => {
    setProfilePic(path);
  };

  return (
    <SafeAreaView style={PageStyles.main}>
      <AppHeader />
      <View style={PageStyles.contentWrap}>
        <PickImage imagePath={setImagePath}></PickImage>
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
