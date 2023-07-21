import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { UNAME } from "../AsyncKeys";
import { getItemFromCache } from "../ReadCache";
import light from "../assets/themes/light";

const Message = ({ messages, user, time, currentUser }) => {
  console.log("current", currentUser);

  let chat;

  if (currentUser == user) {
    chat = (
      <View>
        <View style={styles.senderContainer}>
          <Text style={styles.sender}>{messages}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingRight: 10,
          }}
        >
          <Text style={{ paddingLeft: 10, color: "white", fontSize: 12 }}>
            {time}
          </Text>
        </View>
      </View>
    );
  } else {
    chat = (
      <View>
        <Text style={{ paddingLeft: 10, color: "white", fontSize: 12 }}>
          {user}
        </Text>
        <View style={styles.recieverContainer}>
          <Text style={styles.reciever}>{messages}</Text>
        </View>
        <Text style={{ paddingLeft: 10, color: "white", fontSize: 12 }}>
          {time}
        </Text>
      </View>
    );
  }

  return chat;
};

const styles = StyleSheet.create({
  senderContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 5,
  },
  sender: {
    color: "white",
    overflow: "hidden",
    borderRadius: 10,
    backgroundColor: light.secondary,
    padding: 8,
    maxWidth: "80%",
    fontSize: 18,
  },
  recieverContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 5,
  },
  reciever: {
    color: "white",
    overflow: "hidden",
    borderRadius: 10,
    backgroundColor: "#5f6d7d",
    padding: 8,
    maxWidth: "80%",
    fontSize: 18,
  },
});

export default Message;
