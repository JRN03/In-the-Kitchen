import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  FlatList,
  Pressable,
  SafeAreaView,
} from "react-native";
import socket from "../utils/socket";
import { PageStyles } from "../assets/Styles";
import NewMessage from "../components/NewMessage";

const Chat = ({ route }) => {
  const [chatMessages, setChatMessages] = useState([]);

  useLayoutEffect(() => {
    console.log(route.params);
    socket.emit("findRoom", route.params.name);
    socket.on("foundRoom", (roomChats) => setChatMessages(roomChats));
  }, []);

  // useEffect(() => {
  //   socket.on("foundRoom", (roomChats) => setChatMessages(roomChats));
  // }, [socket]);

  return (
    <SafeAreaView style={PageStyles.main}>
      <View style={PageStyles.contentWrap}>
        <NewMessage></NewMessage>
      </View>
    </SafeAreaView>
  );
};

export default Chat;
