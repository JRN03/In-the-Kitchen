import React, { useState } from "react";
import { View, StyleSheet, Text, Button, TextInput } from "react-native";

const BioText = () => {
  const [bioText, setBioText] = useState("Write your bio here...");
  const [editButton, setEditButton] = useState(true);

  let text = <Text style={styles.textBox}>{bioText}</Text>;

  const bioEditHandler = () => {
    setEditButton(!editButton);
  };

  return (
    <View style={styles.container}>
      {editButton ? (
        <Text style={styles.textBox}>{bioText}</Text>
      ) : (
        <TextInput
          style={styles.writeableTextBox}
          placeholder="Please type your bio here..."
          maxLength={90}
          numberOfLines={4}
          multiline
          onChangeText={(text) => setBioText(text)}
        ></TextInput>
      )}
      {editButton ? (
        <Button
          title="Edit"
          onPress={bioEditHandler}
          style={{ margin: 10 }}
        ></Button>
      ) : (
        <Button
          title="Done"
          onPress={bioEditHandler}
          style={{ margin: 10 }}
        ></Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#176089",
    alignItems: "center",
    maxHeight: 135,
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
    textAlign: "center",
    textAlignVertical: "center",
  },
  writeableTextBox: {
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
