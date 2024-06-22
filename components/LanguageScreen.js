import React, { useState } from "react";
import { StyleSheet, View, Text ,Image } from "react-native";
import { CheckBox, Button } from "react-native-elements";
import * as Localization from "expo-localization";
import i18n from "i18n-js"; 
import { translations } from "../Translation"; 
import { setSession } from "../utils/asyncStorage";
import { StatusBar } from "expo-status-bar";

const languages = {
  en: "English",
  mr: "मराठी",
  hi: "हिंदी",
};

i18n.translations = translations; // Set up translations
i18n.locale = Localization.locale;
i18n.fallbacks = true;

const LanguageScreen = ({navigation}) => {
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    i18n.locale = language; // Set the selected language in i18n
  };

  
 
  
  const handleLogin = () => {
    setSession("Language", i18n.locale);   // stored the language in local 
    navigation.navigate("consent");
  };

  return (
    <>
     <StatusBar style="auto" />
    <View style={styles.container}>
       {/* <Image
            source={require("../assets/bgAI.jpg")}
            style={styles.backgroundImage}
          /> */}
      <View>
        <Text style={styles.head1}>{i18n.t("selectLanguage")}</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.card}>
          {Object.keys(languages).map((language) => ( // Use Object.keys() to map over the object
            <CheckBox
              key={language}
              title={languages[language]}
              checked={selectedLanguage === language}
              onPress={() => handleLanguageSelect(language)}
              containerStyle={styles.checkBoxContainer}
              textStyle={styles.checkBoxText}
            />
          ))}
        </View>
        <Button
          title={i18n.t("submit")}
          buttonStyle={styles.loginButton}
          onPress={handleLogin}
          disabled={!selectedLanguage}
        />
      </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  formContainer: {
    marginHorizontal: 20,
    marginTop: 50,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "rgba(8, 196, 127, 0.2)",
  },

  card: {},
  head1: {
    marginTop: "5%",
    marginBottom: "5%",
    fontSize: 30,
    color: "#08c47f",
    textAlign: "center",
    fontWeight: "500",
  },

  checkBoxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
    padding: 10,
  },
  checkBoxText: {
    color: "#08c47f",
  },
  loginButton: {
    backgroundColor: "#08c47f",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
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

export default LanguageScreen;
