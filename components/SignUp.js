import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";

import React, { useState } from "react";

import {
  colors,
  link2,
  formgroup,
  input,
  textinput,
  head1,
  errormessage,
} from "./common/formcss";
import { button1 } from "./common/button";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import logo from "../assets/logo.png";
import firebase from "firebase/compat/app";
import { firebaseConfig } from "./FirebaseConfig";
import validator from "validator";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
import { translations } from "../Translation";
import Network from "../components/common/Network";
import { StatusBar } from "expo-status-bar";

i18n.translations = translations; // Set up translations
i18n.locale = Localization.locale;
i18n.fallbacks = true;

const SignUp = ({ navigation }) => {
  const [fData, setFData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  //********************************************************** */
  // firebase auth

  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);
  const [isConnected, setIsConnected] = useState(null);

  const validateFormData = (fData) => {
    if (validator.isEmpty(fData.name)) {
      Toast.show({
        type: "info", //success ,error, info
        text1: "Name is required",
      });
      // setErrorMsg("Name is required");
      return false;
    }

    // validate email
    if (!validator.isEmail(fData.email)) {
      Toast.show({
        type: "info", //success ,error, info
        text1: "Invalid Email",
      });
      // setErrorMsg("Invalid Email");
      return false;
    }

    if (fData.phone.length !== 10) {
      Toast.show({
        type: "info", //success ,error, info
        text1: "Phone number should be 10 digit",
      });
      // setErrorMsg("Phone number should be 10 digit");
      return false;
    }
    if (!validator.isMobilePhone(fData.phone, "en-IN")) {
      Toast.show({
        type: "info", //success ,error, info
        text1: "Invalid Phone Number",
      });
      // setErrorMsg("Invalid Phone Number");
      return false;
    }

    // validate password
    if (fData.password.length < 6) {
      Toast.show({
        type: "info", //success ,error, info
        text1: "Password should be at least 6 characters",
      });
      // setErrorMsg("Password should be at least 6 characters");
      return false;
    }
    if (fData.password !== fData.confirmPassword) {
      Toast.show({
        type: "info", //success ,error, info
        text1: "Password doesn't match...",
      });
      // setErrorMsg("Password doesn't match");
      return false;
    }

    return true; // all data is valid
  };

  const handleSignup = () => {
    const { name, email, password, confirmPassword, phone } = fData;

    if (!validateFormData(fData)) {
      return;
    }
    console.log("data is validated");
    setLoading(true);

    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          console.log(userCredentials?.user.uid);
          console.log("user created");
          //  setSuccessmsg('User created successfully')
          if (userCredentials?.user.uid != null) {
            setLoading(false);

            const userRef = firebase.firestore().collection("UserData");
            userRef
              .add({
                email: email,
                password: password,
                phone: phone,
                name: name,
                uid: userCredentials?.user?.uid,
              })
              .then(() => {
                console.log("data added to firestore");
                navigation.navigate("SignIn");
                Toast.show({
                  type: "success", //success ,error, info
                  text1: " ✌️ Great !!",
                  text2: "You SignUp Successfully",
                });
                // alert("You SignUp Successfully");
              })
              .catch((error) => {
                setLoading(false);
                console.log("firestore error ", error);
              });
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log("sign up firebase error ", error.message);
          if (
            error.message ==
            "Firebase: The email address is already in use by another account. (auth/email-already-in-use)."
          ) {
            Toast.show({
              type: "error", //success ,error, info
              text1: "Email already exists",
            });
            // setErrorMsg("Email already exists");
          } else if (
            error.message ==
            "Firebase: The email address is badly formatted. (auth/invalid-email)."
          ) {
            Toast.show({
              type: "error", //success ,error, info
              text1: "Invalid Email",
            });
            // setErrorMsg("Invalid Email");
          } else if (
            error.message ==
            "Firebase: Password should be at least 6 characters (auth/weak-password)."
          ) {
            Toast.show({
              type: "error", //success ,error, info
              text1: "Password should be at least 6 characters",
            });
            // setErrorMsg("Password should be at least 6 characters");
          } else {
            Toast.show({
              type: "error", //success ,error, info
              text1: error.message,
            });
            // setErrorMsg(error.message);
          }
        });
    } catch (error) {
      Toast.show({
        type: "error", //success ,error, info
        text1: "Error",
      });
      // setErrorMsg("error");
      console.log("sign up system error ", error.message);
    }
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
              {/* <Image style={styles.logo} source={logo} /> */}

              <ScrollView
                style={styles.s2}
                contentContainerStyle={styles.ContentContainer}
              >
                <Text style={head1}>{i18n.t("headingSignUp")}</Text>

                {/* {errorMsg ? <Text style={errormessage}>{errorMsg}</Text> : null} */}

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
                      borderColor: nameFocus ? "#08c47f" : "#9cdbc4",
                    }}
                  >
                    <AntDesign
                      name="user"
                      size={20}
                      color={nameFocus === true ? colors.text1 : colors.text2}
                    />

                    <TextInput
                      style={textinput}
                      placeholder={i18n.t("input1")}
                      onPressIn={() => setErrorMsg(null)}
                      onFocus={() => {
                        setEmailFocus(false);
                        setPasswordFocus(false);
                        setConfirmPasswordFocus(false);
                        setNameFocus(true);
                        setPhoneFocus(false);
                      }}
                      onChangeText={(text) =>
                        setFData({ ...fData, name: text })
                      }
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
                      borderColor: emailFocus ? "#08c47f" : "#9cdbc4",
                    }}
                  >
                    <Entypo
                      name="email"
                      size={20}
                      color={emailFocus === true ? colors.text1 : colors.text2}
                    />
                    <TextInput
                      style={textinput}
                      placeholder={i18n.t("input2")}
                      onPressIn={() => setErrorMsg(null)}
                      keyboardType="email-address"
                      onFocus={() => {
                        setEmailFocus(true);
                        setPasswordFocus(false);
                        setConfirmPasswordFocus(false);
                        setNameFocus(false);
                        setPhoneFocus(false);
                      }}
                      onChangeText={(text) =>
                        setFData({ ...fData, email: text })
                      }
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
                      borderColor: phoneFocus ? "#08c47f" : "#9cdbc4",
                    }}
                  >
                    <Feather
                      name="smartphone"
                      size={20}
                      color={phoneFocus === true ? colors.text1 : colors.text2}
                    />
                    <TextInput
                      style={textinput}
                      placeholder={i18n.t("input3")}
                      onPressIn={() => setErrorMsg(null)}
                      keyboardType="phone-pad"
                      onFocus={() => {
                        setEmailFocus(false);
                        setPasswordFocus(false);
                        setConfirmPasswordFocus(false);
                        setNameFocus(false);
                        setPhoneFocus(true);
                      }}
                      onChangeText={(text) =>
                        setFData({ ...fData, phone: text })
                      }
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
                      size={20}
                      color={
                        passwordFocus == true ? colors.text1 : colors.text2
                      }
                    />
                    <TextInput
                      style={textinput}
                      placeholder={i18n.t("input4")}
                      onPressIn={() => setErrorMsg(null)}
                      onFocus={() => {
                        setEmailFocus(false);
                        setPasswordFocus(true);
                        setConfirmPasswordFocus(false);
                        setNameFocus(false);
                        setPhoneFocus(false);
                      }}
                      secureTextEntry={showPassword === false ? true : false}
                      onChangeText={(text) =>
                        setFData({ ...fData, password: text })
                      }
                    />
                    <Octicons
                      name={showPassword == false ? "eye-closed" : "eye"}
                      size={24}
                      color="grey"
                      onPress={() => setShowPassword(!showPassword)}
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
                      borderColor: confirmPasswordFocus ? "#08c47f" : "#9cdbc4",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="lock-outline"
                      size={20}
                      color={
                        confirmPasswordFocus == true
                          ? colors.text1
                          : colors.text2
                      }
                    />
                    <TextInput
                      style={textinput}
                      placeholder={i18n.t("input5")}
                      onPressIn={() => setErrorMsg(null)}
                      onFocus={() => {
                        setEmailFocus(false);
                        setPasswordFocus(false);
                        setConfirmPasswordFocus(true);
                        setNameFocus(false);
                        setPhoneFocus(false);
                      }}
                      secureTextEntry={
                        showConfirmPassword === false ? true : false
                      }
                      onChangeText={(text) =>
                        setFData({ ...fData, confirmPassword: text })
                      }
                    />
                    <Octicons
                      name={showConfirmPassword == false ? "eye-closed" : "eye"}
                      size={24}
                      color="grey"
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={button1}
                  activeOpacity={0.8}
                  onPress={() => {
                    //   setloading(true);
                    handleSignup();
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
                      {" "}
                      {i18n.t("btnSignUp")}{" "}
                    </Text>
                  ) : (
                    <ActivityIndicator size="large" color="white" />
                  )}
                </TouchableOpacity>

                <Text style={styles.link2}>
                  {i18n.t("link")}&nbsp;
                  <Text
                    style={{ color: "#08c47f" }}
                    onPress={() => navigation.navigate("SignIn")}
                  >
                    {i18n.t("link1")}
                  </Text>
                </Text>
              </ScrollView>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </View>
      ) : null}
      <Network isConnected={isConnected} setIsConnected={setIsConnected} />
    </>
  );
};

export default SignUp;

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
    paddingBottom: 20,
  },
  s2: {
    marginTop: "25%",
    flex: 1,
    backgroundColor: "transparent",
    borderRadius: 30,
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: "rgba(8, 196, 127, 0.1)",
  },
  link2: {
    justifyContent: "flex-end",
    flexDirection: "row",
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 2,
  },
  logo: {
    height: 150,
    width: 150,
    marginLeft: "30%",
    margin: "10%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
