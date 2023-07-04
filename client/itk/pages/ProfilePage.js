import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import AppHeader from "../components/AppHeader";
import AddFriendButton from "../components/AddFriendButton";
import SendMessageButton from "../components/SendMessageButton";

/*
    temp profile page still need to finish everything
    profile page should have header at top and not in App.js
*/

const ProfilePage = () => {
  return (
    <View style={styles.container}>
      <AppHeader></AppHeader>
      <AddFriendButton></AddFriendButton>
      <SendMessageButton></SendMessageButton>
    </View>
  );
};

const styles = StyleSheet.create({
  // adjust flex of page to format border line of the header
  container: {
    flex: 1,
    backgroundColor: "#176089",
  },
});

export default ProfilePage;
