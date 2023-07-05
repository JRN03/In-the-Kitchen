import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ProfilePage from "./pages/ProfilePage";
import AppHeader from "./components/AppHeader";
import MapView from "react-native-maps";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import React, { Component } from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          options={{headerShown:false}}
          name='Login'
          component={LoginPage}
        />
        <Stack.Screen
        options={{headerShown:false}}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#176089",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
