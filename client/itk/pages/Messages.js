import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView, View, StyleSheet, FlatList, Alert } from "react-native";
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

    const getFriends = () => {
      fetch("http://localhost:8080/user/friends", {
        method: "GET",
        headers: { "Content-Type": "appllication/json", token: token },
      })
        .then((res) => (res.status == 200 ? res.json() : { friends: [] }))
        .then((data) => {
          // let currentFriends = friendData.friends.map((a) => a.username);
          setFriendData(data);
        })
        .catch((e) => console.log("err", e));
    };
    getToken();
    getFriends();
  }, [token]);

  if (
    friendData.friends === undefined ||
    rooms === undefined ||
    friendData.friends < 1
  ) {
    return (
      <SafeAreaView style={PageStyles.main}>
        <View style={PageStyles.contentWrap}>
          <AppHeader route={route} action={newMessage} />
          <Navbar route={route} />
        </View>
      </SafeAreaView>
    );
  }

  const newMessage = () => {
    setVisible(true);
  };

  const createMessage = (friendUserName) => {
    let currentFriends = friendData.friends.map((a) => a.username);
    const friends = friendUserName.split(",");
    let result = friends.every((val) => currentFriends.includes(val));
    if (result) {
      socket.emit("createRoom", { uname, friends });
      socket.emit("loadRooms", uname);
      socket.on("getRooms", (data) => {
        // console.log("data = ", data);
        setRooms(data);
      });
    } else {
      Alert.alert("You don't know this person: send them a request first");
    }
  };

  // console.log("\nfriend data\n", friendData.friends);
  // console.log("\nrooms\n", rooms);

  const friendPFP = (users, uname) => {
    // console.log("friendData=", friendData);
    let f;
    for (const user of users) {
      if (user !== uname) {
        f = user;
        break;
      }
    }
    let result = friendData.friends.filter((friend) => {
      return friend.username === f;
    });
    // console.log("result ===", result);
    return result;
  };

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
                  roomName={rooms[index].room_id}
                  username={uname}
                  messages={rooms[index].messages}
                  pfp={friendPFP(rooms[index].users, uname)}
                />
              )}
              keyExtractor={(rooms) => rooms.room_id}
            />
          )}
          <Navbar route={route} />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({});
