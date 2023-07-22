import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, FlatList, SafeAreaView } from "react-native";
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

  const randKey = (length) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  return (
    <SafeAreaView style={PageStyles.main}>
      <View style={PageStyles.contentWrap}>
        <FlatList
          style={{ maxHeight: "90%" }}
          data={chatMessages}
          renderItem={({ index }) => (
            <Message
              messages={chatMessages[index].body}
              user={chatMessages[index].user}
              time={chatMessages[index].time}
              currentUser={route.params.username}
              key={randKey(30)}
            />
          )}
        />
        <NewMessage
          username={route.params.username}
          room={route.params.name}
        ></NewMessage>
      </View>
    </SafeAreaView>
  );
};

export default Chat;
