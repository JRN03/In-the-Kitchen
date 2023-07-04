import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ProfilePage from "./pages/ProfilePage";
import AppHeader from "./components/AppHeader";

export default function App() {
  return (
    <View style={styles.container}>
      {/* I made AppHead as a component in the components folder to use it for 
      whatever page you are working on first import. tThen you will then need to 
      address the flex relationship between the bar and your page. For instance,
      for the temp profile page I have a 17/1 flex ratio that will hold no matter
      what device we run the app on.*/}
      <AppHeader></AppHeader>
      <ProfilePage></ProfilePage>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#176089",
  },
});
