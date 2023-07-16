import * as React from "react";
import { SafeAreaView, ScrollView, StyleSheet,Text, View } from "react-native";
import Navbar from "../components/Navbar";
import AppHeader from "../components/AppHeader";
import {PageStyles} from "../assets/Styles";
import Searchbar from "../components/Searchbar";
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
} from '@expo-google-fonts/roboto-slab';
import FriendTab from "../components/FriendTab";
import AddFriendDialogue from "../components/AddFriendDialogue";

export default function Friends({route,navigation}){

    const [showDialogue, setShowDialogue] = React.useState(false);

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

    if (!fontsLoaded) {
      return null;
    }

    const toggleAdd = () => {
        //open box for adding friend
        setShowDialogue(!showDialogue);
        console.log(showDialogue);
    }
    const friendData = [
        {
            bio: "I do stuff with maps",
            fName: "Royce",
            lName: "Williams",
            username: "royceMaps"
        },
        {
            bio: "I don't touch grass",
            fName: "Matthew",
            lName: "Anderson",
            username: "maande"
        },
        {
            bio: "Simp",
            fName: "Caleb",
            lName: "Intal",
            username: "fintal1?"
        },
        {
            bio: "Bad at pickleball, send help",
            fName: "Nick",
            lName: "?????",
            username: "nicknicknicknick"
        }
    ]
    const friendComponents = friendData.map(data => 
        <FriendTab key={data.fName} name={data.fName+" "+data.lName} data={data}/>
    );
    return (
        <SafeAreaView style={PageStyles.main}>
            <AppHeader route={route} action={toggleAdd}/>
            <View style={PageStyles.contentWrap}>
                {showDialogue && <AddFriendDialogue/>}
                <Text style={styles.header}>Friends</Text>
                <Searchbar/>
                <ScrollView style={styles.scroll}>
                    {friendComponents}
                </ScrollView>
                <Navbar route={route}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        color: "white",
        fontSize: 32,
        marginVertical: 10,
        fontFamily:"RobotoSlab_700Bold",
        letterSpacing: 2,
    },
    scroll:{
        flexGrow: 0
    }
});