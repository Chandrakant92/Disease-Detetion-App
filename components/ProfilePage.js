import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { Card, Button } from "react-native-elements";
import firebase from "firebase/compat/app";
import Toast from "react-native-toast-message";
import { BlurView } from "expo-blur";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { getSession } from "../utils/asyncStorage";

const ProfilePage = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoding] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [editMode, setEditMode] = useState(false); // New state for edit mode
  const [editedName, setEditedName] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedAge, setEditedAge] = useState("1");
  const [editedGender, setEditedGender] = useState("");
  const [editedAddress, setEditedAddress] = useState("");
  const [editedAvatar, setEditedAvatar] = useState("");
  const [uid, setUID] = useState(null);
  
 
  console.log("current doc id", uid);

  const handleSave = async () => {
   setSaveLoding(false);
    
  
    try {

      console.log("gender",editedGender);
      // get a reference to the image
      // const response = await fetch(editedAvatar);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", editedAvatar, true);
        xhr.send(null);
      });

      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(`images/${uid}`);
      await fileRef.put(blob);
     const  url = await fileRef.getDownloadURL();
        

      const userRef = firebase.firestore().collection("UserData").doc(uid);
      await userRef.update({
        name: editedName,
        phone: editedPhone,
        email: editedEmail,
        age: editedAge,
        gender: editedGender,
        address: editedAddress,
        avatar: url,
      });
      setUserDetails({
        ...userDetails,
        name: editedName,
        phone: editedPhone,
        email: editedEmail,
        age: editedAge,
        gender: editedGender,
        address: editedAddress,
        avatar: url,
      });
      setEditMode(false);
      Toast.show({
        type: "success", //success ,error, info
        text1: "✌️ Great..!!",
        text2: "your profile get updated",
      });
      setSaveLoding(true)

    } catch (error) {
      setEditMode(false);
      setSaveLoding(true)
      console.error("Error updating user details:", error);
      Toast.show({
        type: "error", //success ,error, info
        text1: "Somethimg Wrong..!",
        text2: "your profile can't get updated",
      });
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setSaveLoding(true);
    setEditedName(userDetails.name);
    setEditedPhone(userDetails.phone);
    setEditedEmail(userDetails.email);
    setEditedAge(userDetails.age);
    setEditedGender(userDetails.gender);
    setEditedAddress(userDetails.address);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const UID = await getSession("documentId");
        setUID(UID);
        const userRef = firebase.firestore().collection("UserData").doc(UID);
        const userDoc = await userRef.get();
        const age=userDoc.data().age || ""
        const gender=userDoc.data().gender || ""
        const avatar=userDoc.data().avatar || "https://bootdey.com/img/Content/avatar/avatar6.png"
        const address=userDoc.data().address || ""
       

       

        if (userDoc.exists) {
          setUserDetails(userDoc.data());
          setEditedName(userDoc.data().name);
          setEditedPhone(userDoc.data().phone);
          setEditedEmail(userDoc.data().email);
          setEditedAvatar(avatar); 
          setEditedAge(age);
          setEditedGender(gender);
          setEditedAddress(address);
        } else {
          console.log("User not found.");
          Toast.show({
            type: "error", //success ,error, info
            text1: "Account not Found",
          });
          navigation.navigate("Register");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        Toast.show({
          type: "error", //success ,error, info
          text1: "Account not Found",
        });
        navigation.navigate("Register");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [uid]);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );
  }

  if (!userDetails) {
    Toast.show({
      type: "error", //success ,error, info
      text1: "Account not Found",
    });

    return <Text>Account not found.</Text>;
  }

  //to access the camera and gallary

  const handleCameraIconPress = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        // Update the editedAvatar state with the selected image URI
        setEditedAvatar(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Error selecting image:", error);
    }
  };

  if (editMode) {
    
    return (
      <>
        <View style={styles.container}>
          <SafeAreaView>
            <View style={styles.header}></View>
            <View style={styles.blurContainer}>
              <BlurView tint="light" intensity={15} style={styles.blurView}>
                <Image
                  style={styles.avatar1}
                  source={{
                    uri:
                      editedAvatar ||
                      "https://bootdey.com/img/Content/avatar/avatar6.png",
                  }}
                />
              </BlurView>
            </View>
            <TouchableOpacity
              style={styles.cameraIconContainer}
              onPress={handleCameraIconPress}
            >
              <AntDesign
                name="camerao"
                size={100}
                color="rgba(255, 255, 255, 0.8)"
              />
            </TouchableOpacity>
            <KeyboardAvoidingView behavior="height">
              <Card>
                <ScrollView
                  style={styles.s2}
                  contentContainerStyle={styles.ContentContainer}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Text style={styles.feild1}>Name {"      "} :</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Name"
                      value={editedName}
                      onChangeText={setEditedName}
                    />
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Text style={styles.feild1}>Email {"       "} :</Text>

                    <TextInput
                      style={styles.input}
                      placeholder="Email"
                      value={editedEmail}
                      onChangeText={setEditedEmail}
                      editable={false}
                    />
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Text style={styles.feild1}>Phone No :</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Phone No"
                      value={editedPhone}
                      onChangeText={setEditedPhone}
                    />
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Text style={styles.feild1}>Age {"           "}:</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Age"
                      value={editedAge}
                      onChangeText={setEditedAge}
                    />
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Text style={styles.feild1}>Gender {"     "}:</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Gender"
                      value={editedGender}
                      onChangeText={setEditedGender}
                    />
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Text style={styles.feild1}>Address {"   "}:</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Address"
                      value={editedAddress}
                      onChangeText={setEditedAddress}
                    />
                  </View>
                </ScrollView>
                <Text> </Text>
                <View
                  style={{
                    flexDirection: "row-reverse",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Button
                    title={
                      saveLoading ? (
                        "Save"
                      ) : (
                        <ActivityIndicator
                          size="small"
                          style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            paddingHorizontal:20,
                            paddingVertical:2
                          }}
                        />
                      )
                    }
                    buttonStyle={{
                      backgroundColor: "#08c47f",
                      paddingHorizontal: 50,
                    }}
                    onPress={handleSave}
                  />

                  <Button
                    title="Cancel"
                    buttonStyle={{
                      backgroundColor: "#c45243",
                      paddingHorizontal: 50,
                    }}
                    onPress={handleCancel}
                  />
                </View>
              </Card>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </View>
      </>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <TouchableWithoutFeedback onPress={() => console.log("Profile clicked")}>
        <Image
          style={styles.avatar}
          source={{
            uri:
              editedAvatar ||
              "https://bootdey.com/img/Content/avatar/avatar6.png",
          }}
        />
      </TouchableWithoutFeedback>
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <Text style={{ fontWeight: "600", fontSize: 18 }}> #UserID </Text>
      </View>

      <Card>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Text style={styles.feild}>Name{"       "} :</Text>
          <Text style={styles.name}>{userDetails.name}</Text>
        </View>
        <Card.Divider />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Text style={styles.feild}>Email {"        "}:</Text>
          <Text style={styles.name}>{userDetails.email}</Text>
        </View>
        <Card.Divider />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Text style={styles.feild}>Phone No :</Text>
          <Text style={styles.name}>{userDetails.phone}</Text>
        </View>
        <Card.Divider />
        {editedAge != "" ? (
          <>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Text style={styles.feild}>Age {"           "}:</Text>
              <Text style={styles.name}>{userDetails.age}</Text>
            </View>
            <Card.Divider />
          </>
        ) : null}
        {editedGender != "" ? (
          <>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Text style={styles.feild}>Gender {"     "}:</Text>
              <Text style={styles.name}>{userDetails.gender}</Text>
            </View>
            <Card.Divider />
          </>
        ) : null}
        {editedAddress != "" ? (
          <>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Text style={styles.feild}>Address {"   "}:</Text>
              <Text style={styles.name}>{userDetails.address}</Text>
            </View>
            <Card.Divider />
          </>
        ) : null}

        <Text> </Text>

        <Button
          title="Edit Profile"
          buttonStyle={{ backgroundColor: "#08c47f" }}
          onPress={() => setEditMode(true)}
        />
      </Card>
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ContentContainer: {
    paddingBottom: 10,
  },
  s2: {
    height: 300,
    paddingBottom: 30,
  },
  header: {
    backgroundColor: "#90e0c3",
    height: "30%",
    marginBottom: "12%",
  },
  avatar: {
    width: 160,
    height: 100,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: "30%",
  },
  input: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 2,
    marginVertical: 8,
    width: "100%",
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  feild: {
    fontSize: 18,
    color: "black",
    fontWeight: "600",
  },
  feild1: {
    fontSize: 18,
    color: "black",
    fontWeight: "600",
    paddingRight: 5,
  },
  name: {
    fontSize: 18,
    color: "black",
    fontWeight: "400",
    marginLeft: 5,
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center",
  },
  blurContainer: {
    width: 160,
    height: 100,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "white",
    alignSelf: "center",
    position: "absolute",
    marginTop: "30%",
    overflow: "hidden",
  },
  avatar1: {
    width: 160,
    height: 160,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "white",
    alignSelf: "center",
    position: "absolute",
    marginTop: "30%",
    overflow: "hidden",
    zIndex: -1,
    // opacity: 0.5,
  },
  blurView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraIconContainer: {
    position: "absolute",
    alignSelf: "center",
    marginTop: "40%",
  },
});
