import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { button1 } from "./common/button";
import * as Localization from "expo-localization";
import i18n from "i18n-js"; 
import { translations } from "../Translation"; 
import { getSession } from "../utils/asyncStorage";
import { StatusBar } from "expo-status-bar";


i18n.translations = translations;  // Set up translations
i18n.locale = Localization.locale;
i18n.fallbacks = true;


const ConsentScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleAgree = () => {
    navigation.navigate("Register");
  };
  
  useEffect(() => {
     
    const handleLanguage= async () => {
      i18n.locale = await getSession("Language");
    }
     handleLanguage();
    const unsubscribe = navigation.addListener("focus", () => {
      setModalVisible(false); // Reset the drawer state when dashboard page is focused
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <View style={styles.container}>
      {/* <Image style={styles.patternbg} source={pattern} /> */}
      <Image
            source={require("../assets/bgAI.jpg")}
            style={styles.backgroundImage}
          />
      <ScrollView style={styles.container1}>
        <View style={styles.top}>
          <Text style={styles.consentH}>
            {" "}
            {i18n.t("concentheading")}
            {/* Important Discloser & User Consent */}
          </Text>
          <Text style={styles.consentO}>
          {i18n.t("concentheading1")}
            <Text style={{ color: "black", fontSize: 13, fontWeight: "bold" }}>
              {" "}
              {i18n.t("concentheading2")}{" "}
            </Text>
            {i18n.t("concentheading3")}
          </Text>
        </View>
        <View style={styles.mid}>
          <Text
            style={{
              color: "black",
              fontSize: 13,
              fontWeight: "bold",
              margin: 3,
            }}
          >
           {i18n.t("concentheading4")}:-{" "}
          </Text>
        </View>
        {/* <ScrollView horizontal={true} style={{ width: "100%" }}> */}
        <View style={{ paddingLeft: 8 }}>
          <FlatList
            data={[
              {
                key: "key1",
              },
              {
                key: "key2",
              },
              {
                key: "key3",
              },
              {
                key: "key4",
              },
            ]}
            renderItem={({ item }) => {
              return (
                <View style={{ marginBottom: 0.5, marginTop: 15, margin: 3 }}>
                  <Text style={{ fontSize: 14 }}>{i18n.t(item.key)}</Text>
                </View>
              );
            }}
          />
        </View>
        {/* </ScrollView> */}
        <View style={{ margin: 8, padding: 5 }}>
          <Text style={{ color: "black", fontSize: 13, fontWeight: "500" }}>
          {i18n.t("key5")}
          </Text>

          <Pressable onPress={() => setModalVisible(true)}>
            <Text
              style={{
                color: "blue",
                fontSize: 13,
                fontWeight: "500",
                marginTop: 5,
              }}
            >
              {i18n.t("terms")}*{" "}
              <Text style={{ color: "red", fontSize: 9 }}>
                ({i18n.t("terms1")})
              </Text>
            </Text>
          </Pressable>
        </View>

        <View style={styles.TandC}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.modalView}>
              <ScrollView>
                <Text
                  style={{
                    color: "#08c47f",
                    fontSize: 14,
                    fontWeight: "500",
                    marginBottom: 15,
                  }}
                >
                   {i18n.t("terms2")}
                </Text>

                <FlatList
                  data={[
                    {
                      key: "termkey1",
                    },
                    {
                      key: "termkey2",
                    },
                    {
                      key: "termkey3",
                    },
                    {
                      key: "termkey4",
                    },
                    {
                      key: "termkey5",
                    },
                    {
                      key: "termkey6",
                    },
                  ]}
                  renderItem={({ item }) => {
                    return (
                      <View style={{ marginBottom: 0.5 }}>
                        <Text
                          style={{ padding: 2, fontSize: 20, marginRight: 2 }}
                        >
                          {" "}
                          •<Text style={{ fontSize: 16 }}>  {i18n.t(item.key)}</Text>
                        </Text>
                      </View>
                    );
                  }}
                />
                <Pressable
                  style={{
                    margin: 10,
                    backgroundColor: "#08c47f",
                    padding: 10,
                    borderRadius: 20,
                    marginTop: 10,
                  }}
                  onPress={handleAgree}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontWeight: "500",
                    }}
                  >
                   {i18n.t("btn")}
                  </Text>
                </Pressable>
              </ScrollView>
            </View>
          </Modal>
        </View>

        <TouchableOpacity
          style={button1}
          activeOpacity={0.8}
          onPress={() => {
            handleAgree();
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
            {i18n.t("btn")}
          </Text>
        </TouchableOpacity>
        <Text></Text>
      </ScrollView>
    </View>
  );
};

export default ConsentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  container1: {
    marginTop: 25,
    padding: 10,
  },

  top: {
    marginTop: 8,
    padding: 10,
    backgroundColor: "rgba(8, 196, 127, 0.4)",
    borderRadius: 20,
  },
  mid: {
    padding: 8,
  },
  patternbg: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  },

  ImageV: {
    borderColor: "#08c47f",
    margin: 10,
    padding: 8,
    backgroundColor: "#00a99d",
    borderRadius: 30,
    position: "relative",
  },
  consentO: {
    fontSize: 14,
    // fontFamily: 'arial',
  },
  consentH: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
  },

  // ******
  modalView: {
    margin: 8,
    marginTop: "30%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 13,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1.55,
    shadowRadius: 8,
    elevation: 20,
  },
  GetStart: {
    marginTop: 50,
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
