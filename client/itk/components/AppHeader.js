import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
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
import light from "../assets/themes/light";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PROFILE_PIC_KEY } from "../AsyncKeys";

const AppHeader = () => {
  const navigation = useNavigation();
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

  const [profilePic, setProfilePic] = useState();

  // make sure that page is rerendered
  useEffect(() => {
    const focusHandler = navigation.addListener("focus", () => {
      readData();
    });
    return focusHandler;
  }, [navigation]);

  // read data
  const readData = async () => {
    try {
      picTemp = await AsyncStorage.getItem(PROFILE_PIC_KEY);
      if (picTemp !== null) {
        setProfilePic(picTemp);
      }
    } catch (e) {
      alert("failed to load data in profile page");
    }
  };

  let image;
  if (
    profilePic === "../assets/TempProfilePic.jpeg" ||
    profilePic === undefined
  ) {
    image = require("../assets/TempProfilePic.jpeg");
  } else {
    image = { uri: profilePic };
  }
  // console.log("in header");
  // console.log(profilePic);
  if (!fontsLoaded) {
    return null;
  }

  return (
    // overall container view and split into 3 seperate views
    <SafeAreaView style={styles.main}>
      <TouchableOpacity
        style={styles.imgWrap}
        onPress={() => navigation.navigate("Profile")}
      >
        <Image style={[styles.img, styles.profile]} source={image} />
      </TouchableOpacity>
      <View style={styles.titleWrap}>
        <Text style={styles.title}>In the Kitchen</Text>
      </View>
      <TouchableOpacity style={styles.imgWrap}>
        <Image style={[styles.img]} source={require("../assets/add2.png")} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    height: 60,
    width: "100%",
    flexDirection: "row",
    backgroundColor: light.primary,
    alignItems: "center",
    shadowColor: light.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: "25%",
    shadowRadius: 4,
  },
  img: {
    height: "100%",
    aspectRatio: 1,
  },
  profile: {
    flex: 1,
    borderRadius: 360,
  },
  imgWrap: {
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  titleWrap: {
    flex: 3,
    paddingHorizontal: 5,
  },
  title: {
    fontFamily: "RobotoSlab_400Regular",
    fontSize: 28,
    color: "white",
  },
});

export default AppHeader;
