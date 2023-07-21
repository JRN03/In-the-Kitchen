import React, { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import socket from "../utils/socket";

const NewMessage = ({ username, room }) => {
  // console.log("new message=", username);
  const [message, setMessage] = useState("");

  const sendButtonHandler = () => {
    const hour =
      new Date().getHours() < 10
        ? `0${new Date().getHours()}`
        : `${new Date().getHours()}`;

    const mins =
      new Date().getMinutes() < 10
        ? `0${new Date().getMinutes()}`
        : `${new Date().getMinutes()}`;

    if (message.length > 0) {
      socket.emit("newMessage", {
        message,
        room_id: room,
        username,
        timestamp: { hour, mins },
      });
    }
    setMessage("");
  };

  return (
    <View style={{ flex: 1, flexDirection: "column-reverse" }}>
      <View
        style={{
          // flex: 1,
          flexDirection: "row",
          height: 50,
          justifyContent: "center",
          position: "absolute",
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
