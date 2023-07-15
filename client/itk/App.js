import { StyleSheet } from "react-native";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Courts from "./pages/Courts";
import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import Messages from "./pages/Messages";
import Friends from "./pages/Friends";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfilePage from "./pages/ProfilePage";
import EditProfile from "./pages/EditProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BIO_KEY, TOKEN, PROFILE_PIC_KEY } from "./AsyncKeys";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const readData = async () => {
      try {
        const value = await AsyncStorage.getItem(TOKEN);
        if (value !== null) {
          setIsReady(true);
        }
      } catch (error) {
        // Handle AsyncStorage errors
        console.log("AsyncStorage error:", error);
      }
    };
    readData(); // Call the async function to fetch the value
  }, []);

  if (!isReady) {
    return (
      <NavigationContainer style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginPage}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Sign Up"
            component={SignUpPage}
          />
          <Stack.Screen
            options={{ headerShown: false, animation: "none" }}
            name="Courts"
            component={Courts}
          />
          <Stack.Screen
            options={{ headerShown: false, animation: "none" }}
            name="Home"
            component={Home}
          />
          <Stack.Screen
            options={{ headerShown: false, animation: "none" }}
            name="Friends"
            component={Friends}
          />
          <Stack.Screen
            options={{ headerShown: false, animation: "none" }}
            name="Messages"
            component={Messages}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Profile"
            component={ProfilePage}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="EditProfile"
            component={EditProfile}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false, animation: "none" }}
            name="Home"
            component={Home}
          />
          <Stack.Screen
            options={{ headerShown: false, animation: "none" }}
            name="Courts"
            component={Courts}
          />
          <Stack.Screen
            options={{ headerShown: false, animation: "none" }}
            name="Friends"
            component={Friends}
          />
          <Stack.Screen
            options={{ headerShown: false, animation: "none" }}
            name="Messages"
            component={Messages}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Profile"
            component={ProfilePage}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="EditProfile"
            component={EditProfile}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginPage}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Sign Up"
            component={SignUpPage}
          />
        </Stack.Navigator>
      </NavigationContainer>
      // <View style={styles.container}>
      //   {/* I made AppHead as a component in the components folder to use it for
      //   whatever page you are working on first import. tThen you will then need to
      //   address the flex relationship between the bar and your page. For instance,
      //   for the temp profile page I have a 17/1 flex ratio that will hold no matter
      //   what device we run the app on.*/}
      //   {/* <SignUpPage></SignUpPage> */}
      //   {/* <AppHeader></AppHeader> */}
      //   {/* <LoginPage></LoginPage> */}
      //   {/* <ProfilePage></ProfilePage>
      //   <MapView style={styles.map}></MapView>
      //   <StatusBar style="auto" /> */}
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});
