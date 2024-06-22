import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { button1 } from "./common/button";
import React from "react";
import logo from "../assets/logo.png";
import { colors, link2 } from "./common/formcss";
import * as Localization from "expo-localization";
import i18n from "i18n-js"; 
import { translations } from "../Translation"; 
import { getSession } from "../utils/asyncStorage";
const { width, height } = Dimensions.get("window");


i18n.translations = translations;  // Set up translations
i18n.locale = Localization.locale;
i18n.fallbacks = true;


const Register = ({ navigation }) => {
  return (
    <>
     <StatusBar style="auto" />
    <View style={styles.container}>
       <Image
            source={require("../assets/bgAI.jpg")}
            style={styles.backgroundImage}
          />
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={logo} />
      </View>

      <Text style={styles.slogan}>
      {i18n.t("slogan1")}{"\n"} {i18n.t("slogan2")} !!
      </Text>

      <ScrollView
        style={styles.s2}
        contentContainerStyle={styles.ContentContainer}
      >
        <View
          style={{
            backgroundColor: '#08c47f',
            borderRadius: 50,
            margin: 2,
            marginTop: 15,
            minWidth: "60%",
          }}
        >
          <TouchableOpacity
            style={{
              margin: 2,
              backgroundColor: "white",
              padding: 3,
              borderRadius: 100,
              minWidth: "60%",
              zIndex: 2,
            }}
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text
              style={{
                color: '#08c47f',
                fontSize: 18,
                fontWeight: "bold",
                textAlign: "center",
                padding: 5,
                paddingVertical: 5,
              }}
            >
              {/* CONTINUE WITH PHONE */}
              {i18n.t("btn1")}
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            alignItems: "center",
            textAlign: "center",
            marginTop: 10,
            fontWeight: "bold",
          }}
        >
          {/* OR */}
        
          
        </Text>
        <TouchableOpacity
          style={button1}
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "center",
              padding: 5,
            }}
          >
           {i18n.t("btn2")}
          </Text>
        </TouchableOpacity>

        <Text style={link2}>
        {i18n.t("link")}&nbsp;
          {/* If don't have an account ?&nbsp; */}
          <Text
            style={{ color: "#08c47f" }}
            onPress={() => navigation.navigate("SignIn")}
          >
             {i18n.t("link1")}
          </Text>
        </Text>
      </ScrollView>
    </View>
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  ContentContainer: {
    marginTop: "10%",
    alignItems: "center",
    backgroundColor: 'transparent',
    paddingBottom: 20,
  },

  slogan: {
    textAlign: "center",
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
    paddingVertical: 10,
    marginBottom: "35px",
  },

  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20%",
    marginBottom: "40%",
  },
  logo: {
    width: width * 0.6,
    height: width * 0.6,
    marginTop: "40%",
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
