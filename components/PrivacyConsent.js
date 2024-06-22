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
  Image,
  Pressable,
} from "react-native";
const { width, height } = Dimensions.get("window");
import { Entypo } from "@expo/vector-icons";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
import { translations } from "../Translation";
import ConsentScreen from "./ConsentScreen";

i18n.translations = translations; // Set up translations
i18n.locale = Localization.locale;
i18n.fallbacks = true;

const PrivacyConsent = ({ visible, onClose }) => {
  return (
    <>
      <Modal visible={visible} animationType="slide" transparent={true}>
        <ScrollView
          style={styles.s2}
          contentContainerStyle={styles.ContentContainer}
        >
          <Image
            source={require("../assets/privacy.png")}
            style={styles.Image}
          />
          <View style={styles.top}>
            <Text style={styles.heading}>We value your privacy</Text>
            <Text style={styles.consentH}>
              Before you proceed, please understand that your participation in
              voice collection for disease screening is entirely voluntary. You
              have the right to decline or withdraw consent at any time without
              consequences.
            </Text>
            <Text style={styles.consentH}>
              By continuing, you agree that we will collect and securely store
              necessary information for your account, prioritize data security,
              and use your data for personalized services while maintaining
              strict confidentiality.
            </Text>
            <Text style={styles.consentH}>
              We do not share your data without your explicit consent and retain
              it only as long as needed. 
            </Text>
            <Text style={styles.consentH}>
              For more details, consult our  {"                                             "}
              <Pressable onPress={ConsentScreen}>
                <Text>
              <Text style={{ color: "green" }}>Terms & conditions</Text> and{" "}
              <Text style={{ color: "green" }}> privacy policy </Text>
              </Text>
              </Pressable>
            </Text>
            <Pressable
                  style={{
                    margin: 10,
                    backgroundColor: "#08c47f",
                    padding: 10,
                    borderRadius: 20,
                    marginTop: 10,
                  }}
                  activeOpacity={0.8}
                //   onPress={handleAgree}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontWeight: "500",
                    }}
                  >
                  Accept & continue
                  </Text>
                </Pressable>
          </View>
        </ScrollView>
      </Modal>
    </>
  );
};

export default PrivacyConsent;

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
    marginTop: 250,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: "white",
  },
  Image: {
    marginTop: 10,
    width: 70,
    height: 70,
  },
  top: {
    marginTop: 30,
    padding: 10,
    borderRadius: 20,
  },
  consentH: {
    fontSize: 13,
    textAlign: "center",
    fontWeight: "500",
    color: "grey",
    marginBottom:10,
    marginHorizontal:5
  },
  heading: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },
});
