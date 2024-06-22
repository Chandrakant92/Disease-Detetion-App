import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  Image,
  BackHandler,
} from "react-native";
import { useNavigation, useIsFocused, CommonActions } from "@react-navigation/native";
import { setSession, setItem, getSession } from "../utils/asyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HandleLogout = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const handleLogout = async () => {
    // Implement your logout logic here

    try {
      // Clear all data from AsyncStorage
      await AsyncStorage.clear();
      setSession("isLoggedIn", "false");
      setItem("onboarded", "0");

      // Implement any additional logout logic here
      console.log("Logging out...");
      navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "Onboarding" }] }));
      
    } catch (error) {
      // Handle errors, if any
      navigation.navigate("Home");
      console.error("Error while logging out:", error);
    }
  };

  const handleCancel = () => {
    // Close the alert dialog 
    navigation.navigate("Home");
  };

  const showAlert = () => {
    // Display the alert dialog
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          onPress: handleCancel,
          style: "cancel",
        },
        { text: "Logout", onPress: handleLogout },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    // Automatically show the alert when the component is mounted
    if (isFocused) {
      showAlert();
    }
  }, [isFocused]);

  return (
    <View style={styles.containerBG}>
      <Image
        source={require("../assets/bgAI.jpg")}
        style={styles.backgroundImage}
      />
    </View>
  );
};

export default HandleLogout;
const styles = StyleSheet.create({
  containerBG: {
    flex: 1,
    backgroundColor: "transparent",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0.2,
    backgroundColor: "#08c47f",
    resizeMode: "cover", // Adjust this as needed
  },
});
