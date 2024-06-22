import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { button1 } from "./common/button";
import React, { useState } from "react";
import logo from "../assets/logo.png";
import { colors, link2, formgroup, input, textinput } from "./common/formcss";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Toast  from "react-native-toast-message";

const ResetPass = ({ navigation }) => {
  const [newpassfocus, setnewpassfocus] = useState(false);
  const [passwordfocus, setPasswordfocus] = useState(false);
  const [showpassword, setShowpassword] = useState(false);
  const [shownpassword, setShownpassword] = useState(false);
  const [errormsg, setErrormsg] = useState(null);
  const [loading, setloading] = useState(false);

  const [fdata, setFdata] = useState({
    email: "",
    password: "",
  });

  return (
    <KeyboardAvoidingView>
      <View style={styles.container}>
      <Image
            source={require("../assets/bgAI.jpg")}
            style={styles.backgroundImage}
          />
        <ScrollView
          style={styles.s2}
          contentContainerStyle={styles.ContentContainer}
        >
          <Image style={styles.logo} source={logo} />
          <View style={formgroup}>
            <View
              style={{
                borderWidth: 2,
                flexDirection: "row",
                marginVertical: 5,
                backgroundColor: "white",
                borderRadius: 10,
                paddingHorizontal: 5,
                paddingVertical: 8,
                fontSize: 10,
                paddingLeft: 10,
                marginBottom: 10,
                alignItems: "center",
                borderColor: newpassfocus ? "#08c47f" : "#9cdbc4",
              }}
            >
              <MaterialCommunityIcons
                name="lock-outline"
                size={24}
                color={newpassfocus == true ? colors.text1 : colors.text2}
              />
              <TextInput
                style={textinput}
                onFocus={() => {
                  setnewpassfocus(true);
                  setPasswordfocus(false);
                }}
                placeholder="New Password"
                onPressIn={() => setErrormsg(null)}
                secureTextEntry={shownpassword === false ? true : false}
                onChangeText={(text) => setFdata({ ...fdata, email: text })}
              />
              <Octicons
                name={shownpassword == false ? "eye-closed" : "eye"}
                size={20}
                color="grey"
                onPress={() => setShownpassword(!shownpassword)}
              />
            </View>
          </View>
          <View style={formgroup}>
            <View
              style={{
                borderWidth: 2,
                flexDirection: "row",
                marginVertical: 5,
                backgroundColor: "white",
                borderRadius: 10,
                paddingHorizontal: 5,
                paddingVertical: 8,
                fontSize: 10,
                paddingLeft: 10,
                marginBottom: 10,
                alignItems: "center",
                borderColor: passwordfocus ? "#08c47f" : "#9cdbc4",
              }}
            >
              <MaterialCommunityIcons
                name="lock-outline"
                size={24}
                color={passwordfocus == true ? colors.text1 : colors.text2}
              />
              <TextInput
                style={textinput}
                placeholder="Confirm Password"
                onChangeText={(text) => setFdata({ ...fdata, password: text })}
                onPressIn={() => setErrormsg(null)}
                onFocus={() => {
                  setnewpassfocus(false);
                  setPasswordfocus(true);
                }}
                secureTextEntry={showpassword === false ? true : false}
              />
              <Octicons
                name={showpassword == false ? "eye-closed" : "eye"}
                size={20}
                color="grey"
                onPress={() => setShowpassword(!showpassword)}
              />
            </View>
          </View>
          <TouchableOpacity
            style={button1}
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate("");
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                padding: 5,
              }}
            >
              Reset
            </Text>
          </TouchableOpacity>

          <Text style={styles.link2}>
            Go to SignIn?&nbsp;
            <Text
              style={{ color: "#08c47f" }}
              onPress={() => navigation.navigate("SignIn")}
            >
              click here
            </Text>
          </Text>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ResetPass;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  ContentContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingBottom: 30,
  },
  s2: {
    marginTop: "20%",
    display: "flex",
    backgroundColor: "transparent",
    width: "90%",
    height: "30%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  link2: {
    marginTop: "10%",
    flexDirection: "row",
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  logo: {
    height: 200,
    width: 250,
    marginBottom: "10%",
    marginTop: "10%",
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
