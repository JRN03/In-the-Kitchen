import React, { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import socket from "../utils/socket";
import { Icon } from "react-native-elements";
import { Send } from "react-native-feather";

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
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flexDirection: "column-reverse" }}
      keyboardVerticalOffset={150}
    >
      <View
        style={{
          // flex: 1,
          flexDirection: "row",
          maxHeight: 100,
          minHeight: 30,
          justifyContent: "center",
          borderTopColor: "grey",
          borderTopWidth: 2,
          // position: "absolute",
        }}
      >
        <TextInput
          autoFocus={true}
          style={styles.input}
          placeholder="Direct Message..."
          value={message}
          multiline={true}
          onChangeText={setMessage}
        ></TextInput>
        <TouchableOpacity
          style={{ justifyContent: "center" }}
          onPress={sendButtonHandler}
        >
          <Send color="white" style={{ marginTop: 10 }}></Send>
          {/* <Text style={{ color: "white" }}>Send</Text> */}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    maxHeight: 200,
    borderRadius: 10,
    width: "80%",
    marginRight: 10,
    padding: 5,
    marginTop: 10,
  },
  container: {},
});

export default NewMessage;
