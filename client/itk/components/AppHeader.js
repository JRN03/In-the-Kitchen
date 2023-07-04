import * as React from "react";
import { View, StyleSheet, Text, Image, BackHandler } from "react-native";

/*
    TODO:
        decide font
        retrieve profile pic from database or store/cache locally
        retrieve username from database or store/cache locally
        either copy all of this code and add a button to a new component
            or dynamically set weather the button is active or not
*/

const AppHeader = () => {
  return (
    // overall container view and split into 3 seperate views
    <View style={styles.container}>
      <View style={styles.profileDivider}>
        <Image
          style={styles.profileIcon}
          source={require("../assets/TempProfilePic.jpeg")}
        ></Image>
      </View>
      <View style={styles.usernameDivider}>
        <Text style={styles.usernameText}>This is my username</Text>
      </View>
      {/* button would go inside this <View> */}
      <View style={styles.buttonDivider}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "black",
    borderBottomWidth: 2,
    marginTop: 50,
  },
  username: {
    marginTop: 10,
  },
  profileDivider: {
    height: 40,
    marginLeft: 20,
  },
  usernameDivider: {
    height: 40,
  },
  buttonDivider: {
    height: 40,
    // comment out width once we have button component
    width: 40,
    marginRight: 20,
    backgroundColor: "green",
  },
  profileIcon: {
    height: 40,
    width: 40,
  },
  usernameText: {
    marginTop: 9,
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Cochin",
  },
});

export default AppHeader;
