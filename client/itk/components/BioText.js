import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";

const BioText = (props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.textBox}>{props.bioText}</Text>
      <TouchableOpacity
        style={{ marginTop: 10 }}
        onPress={() =>
          navigation.navigate("EditProfile", { oldText: props.bioText })
        }
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
    </View>
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
    textAlignVertical: "center",
  },
});

export default BioText;
