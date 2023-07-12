import React, { useState, useEffect } from "react";
import { Button, Image, View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default PickImage = (props) => {
  const [image, setImage] = useState();
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    props.imagePath(result.assets[0].uri);
  };

  return (
    <View style={styles.container}>
      <Image
        source={!image ? props.passPath : { uri: image }}
        style={{ width: 150, height: 150, borderRadius: 150 / 2 }}
      />
      <Button title="Edit" onPress={pickImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    maxHeight: 200,
    minHeight: 180,
    alignItems: "center",
  },
});
