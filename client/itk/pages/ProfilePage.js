import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import AppHeader from "../components/AppHeader";
import BioText from "../components/BioText";
import MutualFriends from "../components/MutualFriends";
import Navbar from "../components/Navbar";
import { PageStyles } from "../assets/Styles";
import { BIO_KEY, PROFILE_PIC_KEY, FNAME, LNAME,UNAME } from "../AsyncKeys";
import { getItemFromCache } from "../ReadCache";
// need to use state to manage if the page is ready
// use conditional isReady state while we fetch data

const ProfilePage = ({navigation,route}) => {
  
  const [bio, setBio] = useState("N/A");
  const [profilePic, setProfilePic] = useState();
  const [name,setName] = useState("");
  const [username,setUsername] = useState("");
  // make sure that page is rerendered
  useEffect(() => {

    navigation.addListener("focus", () => {
      getCache();
    });

    const getCache = async () => {
      const pfp = await getItemFromCache(PROFILE_PIC_KEY);
      const desc = await getItemFromCache(BIO_KEY);
      const fname = await getItemFromCache(FNAME);
      const lname = await getItemFromCache(LNAME);
      const uname = await getItemFromCache(UNAME);

      setProfilePic(pfp);
      setBio(desc);
      setName(fname+" "+lname);
      setUsername(uname);
    };

  },[route.name]);

  return (
    <SafeAreaView style={PageStyles.main}>
      <AppHeader />
      <View style={PageStyles.contentWrap}>
        <View style={styles.container}>
          <Image
            source={profilePic ? { uri: profilePic } : require("../assets/TempProfilePic.jpeg")}
            style={{ width: 150, height: 150, borderRadius: 150 / 2 }}
          />
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.tag}>@{username}</Text>
        </View>
        <BioText bioText={bio} profilePic={profilePic} />
        {/* <MutualFriends/> */}
        <Navbar route={route}/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 30,
  },
  name:{
    color: "white",
    fontSize: 30,
    marginTop: 10,
  },
  tag: {
    color:"#cccccc",
    fontSize: 20
  }
});

export default ProfilePage;
