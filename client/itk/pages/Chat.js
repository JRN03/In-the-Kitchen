import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import socket from "../utils/socket";
import { PageStyles } from "../assets/Styles";
import NewMessage from "../components/NewMessage";
import Message from "../components/Message";

const Chat = ({ route }) => {
  const [chatMessages, setChatMessages] = useState([]);

  useLayoutEffect(() => {
    socket.emit("findRoom", route.params.name);
    socket.on("foundRoom", (roomChats) => {
      setChatMessages(roomChats);
    });
  }, []);

  useEffect(() => {
    socket.on("foundRoom", (roomChats) => setChatMessages(roomChats));
  }, [socket]);

  const sentMessageHandler = () => {
    console.log("message sent");
  };

  // console.log("here ", chatMessages);

  return (
    <SafeAreaView style={PageStyles.main}>
      <View style={PageStyles.contentWrap}>
        <FlatList
          data={chatMessages}
          renderItem={({ item, index }) => (
            <Message
              messages={chatMessages[index].body}
              user={chatMessages[index].user}
              time={chatMessages[index].time}
              currentUser={route.params.username}
            />
          )}
          keyExtractor={(item, index) => chatMessages[index].body}
        />
        {/* <Message messages={chatMessage}></Message> */}
        <NewMessage
          username={route.params.username}
          room={route.params.name}
          sent={sentMessageHandler}
        ></NewMessage>
      </View>
    </SafeAreaView>
  );
};

export default Chat;
