import React, { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const NewMessage = () => {
  const [message, setMessage] = useState("");

  const sendButtonHandler = () => {
    console.log("sent: ", message);
  };

  return (
    <View style={{ flex: 1, flexDirection: "column-reverse" }}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          maxHeight: "10%",
          justifyContent: "center",
        }}
      >
        <TextInput
          style={styles.input}
          placeholder="Direct Message..."
          multiline={true}
          onChangeText={setMessage}
        ></TextInput>
        <TouchableOpacity
          style={{ justifyContent: "center" }}
          onPress={sendButtonHandler}
        >
          <Text style={{ color: "white" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    maxHeight: 200,
    borderRadius: 10,
    width: "80%",
    marginRight: 10,
  },
  container: {},
});

export default NewMessage;
