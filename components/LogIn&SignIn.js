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
  TextInput,
} from "react-native";
import { useState ,useRef } from "react";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import React from "react";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
import { translations } from "../Translation";
import { getSession } from "../utils/asyncStorage";
const { width, height } = Dimensions.get("window");
import loginImage from "../assets/animations/login.json";
import { FontAwesome } from "@expo/vector-icons";
import OTPVerification from "./OTPVerification";
import ConsentScreen from "./ConsentScreen";
import firebase from "firebase/compat/app";
import { firebaseConfig } from "../components/FirebaseConfig";
import PrivacyConsent from "./PrivacyConsent";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";


i18n.translations = translations; // Set up translations
i18n.locale = Localization.locale;
i18n.fallbacks = true;

const LogInSignIn = ({ navigation }) => {
  const recaptchaverifier = useRef(null);
  const [showOTPModel, setShowOTPModel] = useState(false);
  const [phoneNo, SetphoneNo] = useState("");
  const [verificationId, setVerificationId] = useState(null);

  const handleSendOTP = () => {
      
    console.log("phone no.",phoneNo)
        if (phoneNo == '') {
            
           console.log('please enter your phone no.');
            return;
        }
        else if (phoneNo.length != 13) {
            
            console.log('Invalid Number or use +91');
            return;
        }

     try {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();

        phoneProvider
            .verifyPhoneNumber(phoneNo, recaptchaverifier.current)
            .then(setVerificationId);
        SetphoneNo('');
        console.log('A Code has been sent to you on your Phone No.')
        setShowOTPModel(true)
        
     } catch (error) {
      console.log('something wrong ...')
     }
  };

  return (
    <>
      <StatusBar style="auto" />
      <View
        style={{
          flex: 1,
          backgroundColor: showOTPModel ? "rgba(0, 0, 0, 0.3)" : "white",
        }}
      >
        <Text style={styles.slogan}>LoG IN or SIGN UP</Text>
        <View style={styles.logoContainer}>
          <LottieView
            source={loginImage}
            autoPlay
            loop={false}
            style={{
              height: width * 0.6,
              marginTop: 30,
            }} // Adjust the dimensions as needed
          />
        </View>

        <ScrollView
          style={styles.s2}
          contentContainerStyle={styles.ContentContainer}
        >
          <View style={styles.formgroup1}>
            <TextInput
              style={styles.textinput1}
              placeholder={"+91  " + i18n.t("input3")}
              keyboardType="phone-pad"
              autoCompleteType="tel"
              onChangeText={(text) => SetphoneNo(text)}
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => {
              handleSendOTP();
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "400",
                textAlign: "center",
                width: width * 0.8,
                padding: 5,
              }}
            >
              {/* {i18n.t("btn2")} */}
              Send OTP
            </Text>
          </TouchableOpacity>

          {showOTPModel && (
            <OTPVerification
              visible={showOTPModel}
              onClose={() => setShowOTPModel(false)}
              verficationID={verificationId}
            />
          )}

          <Text style={styles.connectWithText}>Or Connect With</Text>

          <FirebaseRecaptchaVerifierModal
            ref={recaptchaverifier}
            firebaseConfig={firebaseConfig}
          />

          <View style={styles.socialIcons}>
            {/* Google icon */}
            <FontAwesome
              name="google"
              size={30}
              color="#4285F4"
              style={styles.icon}
            />

            {/* <FontAwesome
              name="sign-in"
              size={30}
              color="#1877F2" // You can customize the color
              style={styles.icon}
            /> */}
          </View>
          <Text style={styles.text}>
            By proceeding with registration , login and using our app , you
            agree to our{" "}
            <Pressable onPress={ConsentScreen}>
              <Text>
                <Text style={{ color: "green" }}>Terms & conditions</Text> and{" "}
                <Text style={{ color: "green" }}> privacy policy </Text>
              </Text>
            </Pressable>
          </Text>
        </ScrollView>
      </View>
    </>
  );
};

export default LogInSignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  ContentContainer: {
    marginTop: "10%",
    alignItems: "center",
    backgroundColor: "transparent",
  },

  formgroup1: {
    borderWidth: 1,
    flexDirection: "row",
    marginVertical: 5,
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 10,
    fontSize: 10,
    paddingLeft: 10,
    marginBottom: 10,
    alignItems: "center",
    borderColor: "#000",
  },
  textinput1: {
    fontSize: 15,
    marginLeft: 10,
    width: width * 0.8,
  },
  button: {
    flexDirection: "row",
    marginVertical: 5,
    backgroundColor: "grey",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
    fontSize: 10,
    paddingLeft: 10,
    marginBottom: 10,
    alignItems: "center",
    borderColor: "#000",
  },
  slogan: {
    textAlign: "center",
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
    paddingVertical: 10,
    marginTop: 30,
  },
  text: {
    fontSize: 10,
    textAlign: "center",
    color: "gray",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 0,
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
  connectWithText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  icon: {
    marginHorizontal: 10,
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
  },
});
