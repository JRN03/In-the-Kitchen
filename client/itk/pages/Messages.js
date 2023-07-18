import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import Navbar from "../components/Navbar";
import { PageStyles } from "../assets/Styles";
import AppHeader from "../components/AppHeader";
import ChatComponent from "../components/ChatComponent";
import io from "socket.io-client";
import { UNAME, TOKEN } from "../AsyncKeys";
import { getItemFromCache } from "../ReadCache";

import {
  useFonts,
  RobotoSlab_100Thin,
  RobotoSlab_200ExtraLight,
  RobotoSlab_300Light,
  RobotoSlab_400Regular,
  RobotoSlab_500Medium,
  RobotoSlab_600SemiBold,
  RobotoSlab_700Bold,
  RobotoSlab_800ExtraBold,
  RobotoSlab_900Black,
} from "@expo-google-fonts/roboto-slab";
import NewChat from "../components/NewChat";

const socket = io.connect("http://localhost:4000");

export default Messages = ({ route }) => {
  let [fontsLoaded] = useFonts({
    RobotoSlab_100Thin,
    RobotoSlab_200ExtraLight,
    RobotoSlab_300Light,
    RobotoSlab_400Regular,
    RobotoSlab_500Medium,
    RobotoSlab_600SemiBold,
    RobotoSlab_700Bold,
    RobotoSlab_800ExtraBold,
    RobotoSlab_900Black,
  });

  const [visible, setVisible] = useState(false);
  const [token, setToken] = useState("");
  const [friendData, setFriendData] = useState([]);
  const [uname, setUName] = useState("");

  /*
        TODO:
            get back user input from NewChat.js
            use sock.emit(join_room) to join room
                room should be

  */

  useEffect(() => {
    const getToken = async () => {
      const t = await getItemFromCache(TOKEN);
      const u = await getItemFromCache(UNAME);
      setToken(t);
      setUName(u);
      getFriends(t);
    };

    const getFriends = (t) => {
      fetch("http://localhost:8080/user/friends", {
        method: "GET",
        headers: { "Content-Type": "appllication/json", token: t },
      })
        .then((res) => (res.status == 200 ? res.json() : { friends: [] }))
        .then((data) => {
          let friendUserName = data.friends.map((a) => a.username);
          setFriendData(friendUserName);
        })
        .catch((e) => console.log("err", e));
    };
    getToken();
    getFriends();
    // console.log(friendData);

    // let friendUserName = friendData.map((a) => a.username);

    // console.log(friendUserName);

    // console.log("refreshed");
    // const uname = "temp";
    // const room = "temp_room";
    // socket.emit("join_room", { uname, room });

    // socket.on("receive_message", (data) => {
    //   console.log(data);
    // });
    // socket.on("chatroom_users", (data) => {
    //   console.log(data);
    // });

    // // Remove event listener on component unmount
    // return () => socket.off("receive_message");
  }, [socket]);

  const newMessage = () => {
    console.log("Create new message");
    console.log(friendData);
    setVisible(true);
  };

  return (
    <View>
      {visible ? <NewChat setVisible={setVisible}></NewChat> : ""}
      <SafeAreaView style={PageStyles.main}>
        <AppHeader route={route} action={newMessage} />
        <View style={PageStyles.contentWrap}>
          <ChatComponent></ChatComponent>
          <Navbar route={route} />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({});
