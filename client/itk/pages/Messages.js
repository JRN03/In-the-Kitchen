import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  FlatList,
  Alert,
  ScrollView,
} from "react-native";
import Navbar from "../components/Navbar";
import { PageStyles } from "../assets/Styles";
import AppHeader from "../components/AppHeader";
import ChatComponent from "../components/ChatComponent";
import socket from "../utils/socket";
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
  const [rooms, setRooms] = useState([]);
  const [chatComp, setChatComp] = useState();

  useEffect(() => {
    const getToken = async () => {
      const t = await getItemFromCache(TOKEN);
      const u = await getItemFromCache(UNAME);
      setToken(t);
      setUName(u);
      socket.emit("loadRooms", u);
      socket.on("getRooms", (data) => {
        setRooms(data);
      });
    };
    getToken();
    const getFriends = () => {
      fetch(`${process.env.EXPO_PUBLIC_ENDPOINT}/user/friends`, {
        method: "GET",
        headers: { "Content-Type": "appllication/json", token: token },
      })
        .then((res) => (res.status == 200 ? res.json() : { friends: [] }))
        .then((data) => {
          setFriendData(data);
        })
        .catch((e) => console.log("err", e));
    };
    getFriends();
  }, [token]);

  React.useEffect(() => {
    const newChatComp = rooms.map((data) => (
      <ChatComponent
        key={data.room_id}
        roomName={data.room_id}
        username={uname}
        messages={data.messages}
        friends={friendData.friends}
      />
    ));
    setChatComp(newChatComp);
  }, [friendData]);

  const newMessage = () => {
    setVisible(true);
  };

  const createMessage = (friendUserName) => {
    // check if user is friends with person to message
    const currentFriends = friendData.friends.map((a) => a.username);
    const friends = friendUserName.split(",");
    const result = friends.every((val) => currentFriends.includes(val));
    if (result) {
      socket.emit("createRoom", { uname, friends });
      socket.emit("loadRooms", uname);
      socket.on("getRooms", (data) => {
        setRooms(data);
      });
    } else {
      Alert.alert("You don't know this person: send them a request first");
    }
  };

  return (
    <View>
      {visible && (
        <NewChat setVisible={setVisible} user_message={createMessage}></NewChat>
      )}
      <SafeAreaView style={PageStyles.main}>
        <AppHeader route={route} action={newMessage} />
        <View style={PageStyles.contentWrap}>
          {rooms.length > 0 && <ScrollView>{chatComp}</ScrollView>}
          <Navbar route={route} />
        </View>
      </SafeAreaView>
    </View>
  );
};
