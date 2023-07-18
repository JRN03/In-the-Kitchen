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
import socket from "../utils/socket";
// import { styles } from ".rr./utils/styles";

const NewChat = ({ setVisible }) => {
  const closeModal = () => setVisible(false);
  const [groupName, setGroupName] = useState("");

  const handleCreateRoom = () => {
    socket.emit("createRoom", groupName);
    closeModal();
  };
  return (
    <Modal transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.popupContainer}>
          <Text style={styles.text}>Create Chat</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Message to Friend"
            onChangeText={(value) => setGroupName(value)}
          />
          <View>
            <TouchableOpacity onPress={handleCreateRoom}>
              <Text style={styles.text}>CREATE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: "#E14D2A" }}
              onPress={closeModal}
            >
              <Text style={styles.text}>CANCEL</Text>
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
  text: {
    color: "white",
  },
  textInput: {
    backgroundColor: "white",
    color: "black",
  },
});

export default NewChat;
