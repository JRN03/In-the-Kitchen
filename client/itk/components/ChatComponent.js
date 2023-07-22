import * as React from "react";
import { Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import light from "../assets/themes/light";
import { ListItem, Avatar } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

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

export default ChatComponent = ({ roomName, username, messages, pfp }) => {
  const navigation = useNavigation();
  const [image, setImage] = React.useState();
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

  const toMessenger = () => {
    navigation.navigate("Chat", {
      name: roomName,
      username: username,
      messages: messages,
    });
  };

  // console.log("pfp", pfp);

  React.useEffect(() => {
    // console.log("pfp", pfp[0].image);
    const getImage = () => {
      fetch(`http://localhost:8080/images/${pfp[0].image}`, {
        method: "GET",
        headers: { "Content-Type": "appllication/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data.imageData);
          setImage("data:image/jpeg;base64," + data.imageData);
        })
        .catch((e) => console.log("err", e));
    };

    getImage();
  }, []);

  if (!image) return;

  // console.log(image);

  // console.log("Roomname", roomName);
  return (
    <TouchableOpacity onPress={toMessenger} style={styles.chatContainer}>
      <Image source={{ uri: image }} style={styles.image}></Image>
      <Text style={styles.chat}>{roomName}</Text>
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
    width: "60%",
  },
  image: {
    height: "80%",
    aspectRatio: 1,
    marginRight: 25,
    marginLeft: 10,
    borderRadius: 360,
  },
});
