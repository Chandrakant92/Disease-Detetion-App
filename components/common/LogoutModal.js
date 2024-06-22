import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Modal from "react-native-modal";

const LogoutModal = ({ isVisible, handleLogout, toggleLogoutModal }) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContainer}>
        <Text>Are you sure you want to log out?</Text>
        <Pressable onPress={handleLogout}>
          <Text style={styles.logoutButton}>Log Out</Text>
        </Pressable>
        <Pressable onPress={toggleLogoutModal}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  logoutButton: {
    color: "red",
    marginTop: 10,
  },
  cancelButton: {
    color: "blue",
    marginTop: 10,
  },
});

export default LogoutModal;
