import React, { useState, useRef } from "react";
import {
  Modal,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
const { width, height } = Dimensions.get("window");
import { Entypo } from "@expo/vector-icons";
import firebase from "firebase/compat/app";
import { firebaseConfig } from "../components/FirebaseConfig";
import PrivacyConsent from "./PrivacyConsent";

const OTPVerification = ({ visible, onClose ,verficationID }) => {
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const [showconcent, setshowconcent] = useState(false);
  const inputRefs = useRef([]);

  const handleVerifyOTP = () => {
    const formattedOTP = otp.join('').substring(0, 6);
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verficationID,
      formattedOTP
    );
    console.log(formattedOTP);
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(() => {
       
        setOTP("");
        console.log("Login Successful...");
       
      })
      .catch((error) => {
        
        console.log("sign up firebase error ", error.message);
        if (
          error.message ==
          "Firebase: The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user. (auth/invalid-verification-code)."
        ) {
          console.log("Incorrect code & try resend code");
        } else {
          console.log("something wrong");
         
        }
        // alert('unsuccessfull....')
        // navigation.navigate('FollowStep');
      });
    setshowconcent(true)
    onClose();
    
  };

  const handleOTPChange = (text, index) => {
    setOTP((prevOTP) => {
      const updatedOTP = [...prevOTP];
      updatedOTP[index] = text;

      // Automatically focus on the next input field, if available
      if (text !== "" && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }

      return updatedOTP;
    });
  };

  return (
    <>
    <Modal visible={visible} animationType="slide" transparent={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.keyboardAvoidingContainer}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 1000} // Adjust the value as needed
      >
        <ScrollView
          style={styles.s2}
          contentContainerStyle={styles.ContentContainer}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
              <Entypo name="circle-with-cross" size={24} color="grey" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Verify OTP</Text>

            <View style={{ flexDirection: "row" }}>
              <Text style={styles.modaldecrib}>
                {" "}
                Please enter the OTP sent to +918530218319{"  "}
              </Text>
              <TouchableOpacity onPress={onClose}>
                <Text
                  style={{ color: "blue", fontWeight: "500", marginLeft: 3 }}
                >
                  Edit
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row" }}>
              {otp.map((char, index) => (
                <TextInput
                  key={index}
                  style={styles.otpInput}
                  onChangeText={(text) => handleOTPChange(text, index)}
                  value={char}
                  maxLength={1}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  keyboardType="numeric"
                />
              ))}
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={styles.modaldecrib}>Didn't receive OTP ?</Text>
              <TouchableOpacity onPress={onClose}>
                <Text
                  style={{ color: "blue", fontWeight: "500", marginLeft: 3 }}
                >
                  Resend
                </Text>
              </TouchableOpacity>
            </View>

           
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={handleVerifyOTP}
            >
              <Text style={styles.verifyButtonText}>Verify OTP</Text>
            </TouchableOpacity>


          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
    <View>
    
    </View>
    </>
  );
};

export default OTPVerification;

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
  },
  ContentContainer: {
    alignItems: "center",
    backgroundColor: "transparent",
  },

  s2: {
    flex: 1,
    marginTop: 310,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: "white",
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  modaldecrib: {
    fontSize: 14,
    marginBottom: 30,
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1, // Ensure it's above other content
  },
  otpInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    fontSize: 20,
    margin: 3,
    padding: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    width: 50, // Adjust the width as needed
    textAlign: "center",
  },
  verifyButton: {
    flexDirection: "row",
    marginVertical: 5,
    backgroundColor: "grey",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 14,
    fontSize: 10,
    paddingLeft: 10,
    marginBottom: 10,
    alignItems: "center",
    borderColor: "#000",
    width: width * 0.8, // Set the width of the button
    alignSelf: "center", // Center the button horizontally
    justifyContent: "center",
  },
  verifyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    width: 200,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
