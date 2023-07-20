import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import light from "../assets/themes/light";
import Searchbar from "./Searchbar";

const NewChat = ({ setVisible, user_message }) => {
  const closeModal = () => setVisible(false);
  const [groupName, setGroupName] = useState("");

  const handleCreateRoom = () => {
    user_message(groupName);
    closeModal();
  };
  return (
    <Modal
      // visible={setVisible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.modalContainer}>
        <View style={styles.popupContainer}>
          <Searchbar
            test={groupName}
            placeholder={"Enter Friend Username to Chat"}
            onChange={setGroupName}
          />
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={closeModal}>
              <Text style={styles.close}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleCreateRoom}>
              <Text style={styles.add}>Chat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  popupContainer: {
    backgroundColor: light.primary,
    width: "80%",
    padding: 20,
    borderRadius: 8,
    borderColor: "grey",
    borderWidth: 1,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    borderRadius: 15,
    backgroundColor: light.secondary,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  add: {
    color: "white",
  },
  close: {
    color: "white",
  },
  text: {
    color: "white",
  },
  textInput: {
    backgroundColor: "white",
    color: "black",
  },
});

export default NewChat;
