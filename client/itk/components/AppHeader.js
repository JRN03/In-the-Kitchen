import * as React from "react";
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
/*
    TODO:
        decide font
        retrieve profile pic from database or store/cache locally
        retrieve username from database or store/cache locally
        either copy all of this code and add a button to a new component
            or dynamically set weather the button is active or not
*/

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
        <Image
          style={[styles.img, styles.profile]}
          source={require("../assets/TempProfilePic.jpeg")}
        />
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
