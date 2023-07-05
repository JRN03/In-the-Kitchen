import React from "react";
import { View, StyleSheet, Text } from "react-native";

const text = "Bio is my text";
const BioText = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textBox}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // adjust flex of page to format border line of the header
  container: {
    flex: 1,
    backgroundColor: "#176089",
    alignItems: "center",
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

export default BioText;
