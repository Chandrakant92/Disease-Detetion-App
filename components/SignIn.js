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
import Toast from "react-native-toast-message";import * as Localization from "expo-localization";
import i18n from "i18n-js"; 
import { translations } from "../Translation"; 
import { StatusBar } from "expo-status-bar";




import {
  colors,
  link2,
  formgroup,
  input,
  textinput,
  errormessage,
  head1,
} from "./common/formcss";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import firebase from "firebase/compat/app";
import validator from "validator";
import { SafeAreaView } from "react-native-safe-area-context";
import { setSession } from "../utils/asyncStorage";
import Network from "../components/common/Network";



i18n.translations = translations; // Set up translations
i18n.locale = Localization.locale;
i18n.fallbacks = true;

const SignIn = ({ navigation }) => {
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(null);

  const [fData, setFData] = useState({
    email: "",
    password: "",
  });

  const validateFormData = () => {
    if (!validator.isEmail(fData.email)) {
      Toast.show({
        type: "info", //success ,error, info
        text1: "Please enter a valid email address",
      });
      // setErrorMsg("Please enter a valid email address");
      return false;
    }

    if (fData.password.length < 6) {
      Toast.show({
        type: "info", //success ,error, info
        text1: "Invalid Password",
      });
      // setErrorMsg("Password must be at least 6 characters long");
      return false;
    }

    return true;
  };

  //#####################################################################
  //firebase auth

  const handleLogin = () => {
    // console.log(email, password);

    if (!validateFormData()) {
      return;
    }

    setLoading(true);

    firebase
      .auth()
      .signInWithEmailAndPassword(fData.email, fData.password)
      .then((userCredential) => {
        console.log("Signed in");
         var user = userCredential.user;
          
         console.log(user);

  const userRef = firebase.firestore().collection("UserData").where('uid', '==', userCredential.user.uid);
      userRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log("Document ID:", doc.id);
          // Store the document ID in the session
          setSession("documentId", doc.id);
        });
      });
        // ...
        // setSession(userCredential.user.uid,userCredential.user.email);
        setLoading(false);
        Toast.show({
          type: "success", //success ,error, info
          text1: " ✌️ Great..!!",
          text2: "you logged successfully",
        });

        
        // Store login session
       setSession("isLoggedIn", "true");
       setSession("userEmail", userCredential.user.email);
      setSession("userId", userCredential.user.uid);
      

       
        // alert("logged successfully");
        // navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "menu" }] }));
        navigation.navigate("menu");
      })
      .catch((error) => {
        setLoading(false);
        const errorMessage = error.message;
        console.log(errorMessage);
        if (
          errorMessage ===
          "Firebase: The email address is badly formatted. (auth/invalid-email)."
        ) {
          Toast.show({
            type: "error", //success ,error, info
            text1: "Please enter a valid email address",
           
          });
          // setErrorMsg("Please enter a valid email address");
        } else {
          Toast.show({
            type: "error", //success ,error, info
            text1: "network issue..try after some time",
           
          });
          // setErrorMsg("Incorrect email or password");
        }
      });
  };

  return (
    <>
     <StatusBar style="auto" />
    {isConnected ? (
    <View style={styles.container}>
      <Image
            source={require("../assets/bgAI.jpg")}
            style={styles.backgroundImage}
          />
      <SafeAreaView>
        <KeyboardAvoidingView behavior="height">
          <ScrollView
            style={styles.s2}
            contentContainerStyle={styles.ContentContainer}
          >
            {/* <Image style={styles.logo} source={logo} /> */}
            <Text style={head1}>{i18n.t("headingSignIn")}</Text>
           
          
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
                  borderColor: emailFocus ? "#08c47f" : "#9cdbc4",
                }}
              >
                <AntDesign
                  name="user"
                  size={20}
                  color={emailFocus === true ? colors.text1 : colors.text2}
                />
                <TextInput
                  style={textinput}
                  onFocus={() => {
                    setEmailFocus(true);
                    setPasswordFocus(false);
                    setShowPassword(false);
                  }}
                  placeholder={i18n.t("input2")}
                  keyboardType="email-address"
                  onPressIn={() => setErrorMsg(null)}
                  onChangeText={(text) => setFData({ ...fData, email: text })}
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
                  borderColor: passwordFocus ? "#08c47f" : "#9cdbc4",
                }}
              >
                <MaterialCommunityIcons
                  name="lock-outline"
                  size={24}
                  color={passwordFocus == true ? colors.text1 : colors.text2}
                />
                <TextInput
                  style={textinput}
                  placeholder={i18n.t("input4")}
                  onChangeText={(text) =>
                    setFData({ ...fData, password: text })
                  }
                  onPressIn={() => setErrorMsg(null)}
                  onFocus={() => {
                    setEmailFocus(false);
                    setPasswordFocus(true);
                  }}
                  secureTextEntry={showPassword === false ? true : false}
                />
                <Octicons
                  name={showPassword == false ? "eye-closed" : "eye"}
                  size={20}
                  color="grey"
                  onPress={() => setShowPassword(!showPassword)}
                />
              </View>
            </View>
            <TouchableOpacity
              style={button1}
              
              activeOpacity={0.8}
              onPress={() => {
                 handleLogin();

                // navigation.navigate("menu");
              }}
            >
              {!loading ? (
                <Text
                  style={{
                    color: "white",
                    fontSize: 22,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {i18n.t("btnSignin")}
                </Text>
              ) : (
                <ActivityIndicator size="large" color="white" />
              )}
            </TouchableOpacity>

            <Text style={styles.link2}>
            {i18n.t("forgetpass")}&nbsp;
              <Text
                style={{ color: "#08c47f" }}
                onPress={() => navigation.navigate("ResetPass")}
              >
               {i18n.t("reset")}
              </Text>
            </Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View> ):null} 
    <Network isConnected={isConnected} setIsConnected={setIsConnected} />
    </>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  ContentContainer: {
  
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'transparent',
    
  },
  s2: {
    marginTop:'50%',
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 30,
    marginHorizontal: 20,
    padding: 20,  
    backgroundColor: "rgba(8, 196, 127, 0.1)",
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
    marginTop: "1%",
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
