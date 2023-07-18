import * as React from "react";
import { Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import light from "../assets/themes/light";
import { ListItem, Avatar } from "@rneui/themed";

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

const toMessenger = () => {
  console.log("To the messenger");
};

export default ChatComponent = ({ route }) => {
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
    <TouchableOpacity onPress={toMessenger} style={styles.chatContainer}>
      <Image
        source={require("../assets/TempProfilePic.jpeg")}
        style={styles.image}
      ></Image>
      <Text style={styles.chat}>Name Here</Text>
      <ListItem.Chevron color="white" size={40} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    borderColor: "white",
    borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    minHeight: 60,
    maxHeight: 70,
    backgroundColor: light.secondary,
    marginTop: 10,
    shadowColor: light.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: "25%",
    shadowRadius: 4,
    borderRadius: 10,
    alignItems: "center",
  },
  chat: {
    fontFamily: "RobotoSlab_400Regular",
    color: "white",
    // borderColor: "red",
    // borderWidth: 1,
    width: "60%",
  },
  image: {
    maxHeight: 50,
    maxWidth: 50,
    marginRight: 25,
    marginLeft: 10,
    borderRadius: 25,
  },
});
