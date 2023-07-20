import React from "react";
import { Text } from "react-native";
import light from "../assets/themes/light";

const Message = ({ messages, user, time }) => {
  return (
    <Text style={{ color: "white" }}>
      User: {user} Time: {time} Message: {messages}
    </Text>
  );
};

export default Message;
