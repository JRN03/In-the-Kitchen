import React, { useState } from "react";
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

const EditProfile = ({ route }, props) => {
  // console.log(route.params);
  const navigation = useNavigation();
  const [newtext, setNewText] = useState();
  const [image, setImage] = useState(route.params.imgPath.uri);

  const textChangeHandler = (text) => {
    setNewText(text);
  };
  let text;
  if (
    route.params !== undefined &&
    String(route.params.oldText).length > 0 &&
    route.params.oldText != undefined
  ) {
    text = route.params.oldText;
  } else {
    text = "";
  }

  function saveButtonHandler() {
    navigation.navigate("Profile", {
      bioText: newtext,
      imagePath: image,
    });
  }

  const setImagePath = (path) => {
    setImage(path);
  };

  return (
    <SafeAreaView style={PageStyles.main}>
      <AppHeader />
      <View style={PageStyles.contentWrap}>
        <PickImage
          imagePath={setImagePath}
          passPath={route.params.imgPath}
        ></PickImage>
        <View style={styles.container}>
          <TextInput
            style={styles.textBox}
            multiline
            maxLength={150}
            onChangeText={textChangeHandler}
            placeholder="Type your bio here..."
          >
            {text}
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