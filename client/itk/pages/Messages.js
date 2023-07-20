import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet, FlatList } from "react-native";
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

  // useLayroutEffect(() => {
  // function fetchGroups() {
  //   fetch("http://localhost:4000/api", {})
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // console.log("my data", data[0]);
  //       setRooms(data);
  //     })
  //     .catch((err) => console.error(err));
  // }
  // fetchGroups();
  //   socket.emit("loadRooms", uname);
  //   socket.on("getRooms", (data) => {
  //     console.log("data = ", data);
  //     setRooms(data);
  //   });
  // }, []);

  useEffect(() => {
    const getToken = async () => {
      const t = await getItemFromCache(TOKEN);
      const u = await getItemFromCache(UNAME);
      setToken(t);
      setUName(u);
      getFriends(t);
      socket.emit("loadRooms", u);
      socket.on("getRooms", (data) => {
        console.log("data = ", data);
        setRooms(data);
      });
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
  }, [socket]);

  const newMessage = () => {
    // console.log("Create new message");
    // console.log(friendData);
    setVisible(true);
  };

  const createMessage = (friendUserName) => {
    if (friendData.includes(friendUserName)) {
      socket.emit("createRoom", { uname, friendUserName });
      // socket.on("roomsList", (rooms) => {
      //   console.log("rooms=", rooms);
      //   setRooms(rooms);
      // });
      socket.emit("loadRooms", uname);
      socket.on("getRooms", (data) => {
        console.log("data = ", data);
        setRooms(data);
      });
    } else {
      console.log("you don't know this person: send them a request first");
    }
  };

  // console.log("rooms", rooms);
  const result = rooms.map((room) => room.messages);
  // console.log("messages =", result);

  return (
    <View>
      {visible ? (
        <NewChat setVisible={setVisible} user_message={createMessage}></NewChat>
      ) : (
        ""
      )}
      <SafeAreaView style={PageStyles.main}>
        <AppHeader route={route} action={newMessage} />
        <View style={PageStyles.contentWrap}>
          {rooms.length > 0 && (
            <FlatList
              data={rooms}
              renderItem={({ item, index }) => (
                <ChatComponent
                  roomName={rooms[index].room}
                  username={uname}
                  messages={rooms[index].messages}
                />
              )}
              keyExtractor={(rooms) => rooms.room}
            />
          )}
          <Navbar route={route} />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({});
