import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Alert,
  Pressable,
  Image
} from "react-native";
import React, { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { button1 } from "./common/button";
import * as DocumentPicker from "expo-document-picker";

import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const VolunteerPatientData = ({ navigation }) => {
  // const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const text = " (Upload Voice file here...)";

  const [nameF, setNameF] = useState(false);
  const [ageF, setAgeF] = useState(false);
  const [genderF, setGenderF] = useState(false);
  const [locationF, setLocationF] = useState(false);
  const [consentF, setconsentF] = useState(false);
  const [treatF, setTreatF] = useState(false);
  const [diagF, setDiagF] = useState(false);
  const [dateF, setDateF] = useState(false);

  const [hbF, setHbF] = useState(false);
  const [esrF, setEsrF] = useState(false);
  const [lypmF, setLympF] = useState(false);
  const [xrayF, setXrayF] = useState(false);
  const [anyF, setAnyF] = useState(false);

  const [fdata, setFdata] = useState({
    Name: "",
    Age: "",
    Gender: "",
    Consent: "",
    Location: "",
    Treatment: "",
    Diagnosis: "",
    Date: "",
  });

  const [activeField, setActiveField] = useState("");
  // *****************************************************************
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  //   const [fdata, setFdata] = useState({ Diagnosis: '' });

  const onChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
      const formattedDate = selectedDate.toLocaleDateString("en-GB"); // Format the date as "DD/MM/YYYY"
      setFdata({ ...fdata, Date: formattedDate });
    }
  };

  const clearInput = () => {
    setSelectedDate(null);
    setFdata({ ...fdata, Date: "" });
  };
  //************************************************************************/

  const selectFile = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({});

      if (file.type === "success") {
        console.log("Selected file:", file);

        const uriParts = file.uri.split("/");
        const fileName = uriParts[uriParts.length - 1];
        Alert.alert("File selected:- ", fileName);
        // Perform actions with the selected file
      } else {
        console.log("File selection cancelled");
        Alert.alert("Please select a file");
      }
    } catch (err) {
      console.log("Error selecting file:", err);
    }
  };

  const submit = () => {
    Alert.alert("Your Data Submitted Successfully..!!");
  };

  return (
    <>
    <View style={{backgroundColor: "transparent", paddingTop: 80,}}>
    <Image
            source={require("../assets/bgAI.jpg")}
            style={styles.backgroundImage}
          />
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          fontWeight: 500,
          marginTop:10,
          padding: 2,
          marginBottom: 2,
        }}
      >
        Patient Details Upload Here...!!
      </Text>
    <ScrollView style={{ top: 10, marginBottom: 25 }}>
      
        <View
          style={{
            margin: 10,
            backgroundColor: "white",
            borderRadius: 8,
            borderColor: consentF ? "#129bad" : "black",
            borderWidth: 2,
          }}
        >
          <View
            style={{ display: "flex", flexDirection: "row", marginLeft: 15 }}
          >
            <Foundation
              name="page-edit"
              size={24}
              color={consentF ? "#129bad" : "black"}
              style={{ marginTop: 8 }}
            />
            <TextInput
              style={{
                height: 40,
                backgroundColor: "white",
                fontSize: 15,
                width: "80%",
                padding: 5,
                marginLeft: 20,
              }}
              onChangeText={(text) => setFdata({ ...fdata, Consent: text })}
              placeholder="Is the patient consent obtainend ?"
              onFocus={() => {
                setNameF(false);
                setAgeF(false);
                setGenderF(false);
                setconsentF(true);
                setLocationF(false);
                setTreatF(false);
                setDiagF(false);
                setDateF(false);
              }}
            />
          </View>
        </View>
      <View
        onFocus={() => {
          setHbF(false);
          setEsrF(false);
          setLympF(false);
          setXrayF(false);
          setAnyF(false);
        }}
      >
        <View
          style={{
            margin: 10,
            backgroundColor: "white",
            borderRadius: 8,
            borderColor: nameF ? "#129bad" : "black",
            borderWidth: 2,
          }}
        >
          <View
            style={{ display: "flex", flexDirection: "row", marginLeft: 15 }}
          >
            <FontAwesome
              name="user"
              size={24}
              color={nameF ? "#129bad" : "black"}
              style={{ marginTop: 8 }}
            />
            <TextInput
              style={{
                height: 40,
                backgroundColor: "white",
                fontSize: 15,
                width: "80%",
                padding: 5,
                marginLeft: 20,
              }}
              onChangeText={(text) => setFdata({ ...fdata, Name: text })}
              placeholder="Intern name"
              onFocus={() => {
                setNameF(true);
                setAgeF(false);
                setGenderF(false);
                setLocationF(false);
                setconsentF(false);
                setTreatF(false);
                setDiagF(false);
                setDateF(false);
              }}
            />
          </View>
        </View>

        <View style={{ display: "flex", flexDirection: "row" }}>
          <View
            style={{
              margin: 10,
              backgroundColor: "white",
              borderRadius: 8,
              borderColor: ageF ? "#129bad" : "black",
              borderWidth: 2,
              width: "44%",
            }}
          >
            <View
              style={{ display: "flex", flexDirection: "row", marginLeft: 15 }}
            >
              <AntDesign
                name="calendar"
                size={24}
                color={ageF ? "#129bad" : "black"}
                style={{ marginTop: 8 }}
              />
              <TextInput
                style={{
                  height: 40,
                  backgroundColor: "white",
                  fontSize: 15,
                  width: "40%",
                  padding: 5,
                  marginLeft: 20,
                }}
                onChangeText={(text) => setFdata({ ...fdata, Age: text })}
                placeholder="Age"
                onFocus={() => {
                  setNameF(false);
                  setAgeF(true);
                  setGenderF(false);
                  setLocationF(false);
                  setconsentF(false);
                  setTreatF(false);
                  setDiagF(false);
                  setDateF(false);
                }}
              />
            </View>
          </View>
          <View
            style={{
              margin: 10,
              backgroundColor: "white",
              borderRadius: 8,
              borderColor: genderF ? "#129bad" : "black",
              overflow: "hidden",
              borderWidth: 2,
              width: "45%",
            }}
          >
            <View
              style={{ display: "flex", flexDirection: "row", marginLeft: 15 }}
            >
              <Foundation
                name="torsos-female-male"
                size={24}
                color={genderF ? "#129bad" : "black"}
                style={{ marginTop: 8 }}
              />
              <TextInput
                style={{
                  height: 40,
                  backgroundColor: "white",
                  fontSize: 15,
                  padding: 5,
                  marginLeft: 15,
                  width: "40%",
                }}
                onChangeText={(text) => setFdata({ ...fdata, Gender: text })}
                placeholder="Gender"
                onFocus={() => {
                  setNameF(false);
                  setAgeF(false);
                  setGenderF(true);
                  setLocationF(false);
                  setconsentF(false);
                  setTreatF(false);
                  setDiagF(false);
                  setDateF(false);
                }}
              />
            </View>
          </View>
        </View>

      

        <View
          style={{
            margin: 10,
            backgroundColor: "white",
            borderRadius: 8,
            borderColor: locationF ? "#129bad" : "black",
            borderWidth: 2,
          }}
        >
          <View
            style={{ display: "flex", flexDirection: "row", marginLeft: 15 }}
          >
            <Entypo
              name="location"
              size={24}
              color={locationF ? "#129bad" : "black"}
              style={{ marginTop: 8 }}
            />
            <TextInput
              style={{
                height: 40,
                backgroundColor: "white",
                fontSize: 15,
                width: "80%",
                padding: 5,
                marginLeft: 20,
              }}
              onChangeText={(text) => setFdata({ ...fdata, Location: text })}
              placeholder="Location of sampale collection site"
              onFocus={() => {
                setNameF(false);
                setAgeF(false);
                setGenderF(false);
                setconsentF(false);
                setLocationF(true);
                setTreatF(false);
                setDiagF(false);
                setDateF(false);
              }}
            />
          </View>
        </View>

        <View
          style={{
            margin: 10,
            backgroundColor: "white",
            borderRadius: 8,
            borderColor: treatF ? "#129bad" : "black",
            borderWidth: 2,
          }}
        >
          <View
            style={{ display: "flex", flexDirection: "row", marginLeft: 15 }}
          >
            <FontAwesome5
              name="hospital-user"
              size={24}
              color={treatF ? "#129bad" : "black"}
              style={{ marginTop: 8 }}
            />
            <TextInput
              style={{
                height: 40,
                backgroundColor: "white",
                fontSize: 15,
                width: "80%",
                padding: 5,
                marginLeft: 20,
              }}
              onChangeText={(text) => setFdata({ ...fdata, Treatment: text })}
              placeholder="Is the patient on treatment ?"
              onFocus={() => {
                setNameF(false);
                setAgeF(false);
                setGenderF(false);
                setconsentF(false);
                setLocationF(false);
                setTreatF(true);
                setDiagF(false);
                setDateF(false);
              }}
            />
          </View>
        </View>

        <View
          style={{
            margin: 10,
            backgroundColor: "white",
            borderRadius: 8,
            borderColor: diagF ? "#129bad" : "black",
            borderWidth: 2,
          }}
        >
          <View
            style={{ display: "flex", flexDirection: "row", marginLeft: 15 }}
          >
            <FontAwesome5
              name="diagnoses"
              size={24}
              color={diagF ? "#129bad" : "black"}
              style={{ marginTop: 8 }}
            />
            <TextInput
              style={{
                height: 40,
                backgroundColor: "white",
                fontSize: 15,
                width: "80%",
                padding: 5,
                marginLeft: 20,
              }}
              onChangeText={(text) => setFdata({ ...fdata, Diagnosis: text })}
              placeholder="Diagnosis if any"
              onFocus={() => {
                setNameF(false);
                setAgeF(false);
                setGenderF(false);
                setconsentF(false);
                setLocationF(false);
                setTreatF(false);
                setDiagF(true);
                setDateF(false);
              }}
            />
          </View>
        </View>

        <View
          style={{
            margin: 10,
            backgroundColor: "white",
            borderColor: dateF ? "#129bad" : "black",
            borderWidth: 2,
            width: "45%",
            borderRadius: 8,
          }}
        >
          <View
            style={{ display: "flex", flexDirection: "row", marginLeft: 8 }}
          >
            <EvilIcons
              name="calendar"
              size={28}
              color={dateF ? "#129bad" : "black"}
              style={{ marginTop: 8 }}
            />
            <TextInput
              style={{
                height: 40,
                backgroundColor: "white",
                fontSize: 15,
                width: "52%",
                padding: 2,
                marginLeft: 15,
              }}
              value={fdata.Date}
              onChangeText={(text) => setFdata({ ...fdata, Date: text })}
              editable={!showPicker}
              placeholder="Date"
              onFocus={() => {
                setShowPicker(true);
                setNameF(false);
                setAgeF(false);
                setGenderF(false);
                setconsentF(false);
                setLocationF(false);
                setTreatF(false);
                setDiagF(false);
                setDateF(true);
              }}
            />
            {selectedDate && (
              <TouchableOpacity
                onPress={clearInput}
                style={{ marginTop: 7, marginLeft: 5 }}
              >
                <Ionicons name="close-circle-outline" size={24} color="red" />
              </TouchableOpacity>
            )}
          </View>
          {showPicker && (
            <DateTimePicker
              value={selectedDate || new Date()}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            margin: 5,
            marginLeft: 15,
            marginRight: 20,
            padding: 5,
            borderRadius: 8,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              padding: 5,
              justifyContent: "space-around",
              alignItems: "center",
              marginLeft: 8,
              borderRadius: 8,
              backgroundColor: "white",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#129bad",
                alignItems: "center",
                width: "45%",
                margin: 1,
                padding: 15,
                borderRadius: 10,
                marginTop: 8,
              }}
              activeOpacity={0.4}
              onPress={() => {
                selectFile();
              }}
            >
              <MaterialCommunityIcons
                name="microphone-settings"
                size={30}
                color="white"
              />
            </TouchableOpacity>
            <Text style={{ fontWeight: 500, fontSize: 12 }}>
              {" "}
              {text.slice(-45)}
            </Text>
          </View>

          <View
            style={{
              padding: 5,
              alignItems: "center",
              marginLeft: 8,
              borderRadius: 8,
              backgroundColor: "white",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#129bad",
                alignItems: "center",
                width: "42%",
                margin: 1,
                padding: 15,
                borderRadius: 10,
                marginTop: 8,
              }}
              activeOpacity={0.4}
              onPress={() => {
                selectFile();
              }}
            >
              <Foundation name="photo" size={30} color="white" />
            </TouchableOpacity>
            <Text style={{ fontWeight: 500, fontSize: 12 }}>
              {" "}
              (Select Your Face Photo.)
            </Text>
          </View>
        </View>

        <View>
          <Pressable
            style={{
              margin: 10,
              backgroundColor: "#129bad",
              padding: 10,
              borderRadius: 20,
              marginTop: 10,
            }}
            onPress={selectFile}
          >
            <Text
              style={{ textAlign: "center", color: "white", fontWeight: "500" }}
            >
              Treatment Card{" "}
              <Text style={{ fontSize: 10 }}>
                {" "}
                (if any, upload photo of file)
              </Text>
            </Text>
          </Pressable>
        </View>
      </View>

      <View
        onFocus={() => {
          setNameF(false);
          setAgeF(false);
          setGenderF(false);
          setLocationF(false);
          setconsentF(false);
          setTreatF(false);
          setDiagF(false);
          setDateF(false);
        }}
      >
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View
            style={{
              margin: 10,
              backgroundColor: "white",
              borderRadius: 8,
              borderColor: hbF ? "#00b1d9" : "black",
              borderWidth: 2,
              width: "44%",
            }}
          >
            <View
              style={{ display: "flex", flexDirection: "row", marginLeft: 10 }}
            >
              <FontAwesome5
                name="calculator"
                size={20}
                color={hbF ? "#00b1d9" : "black"}
                style={{ marginTop: 8 }}
              />
              <TextInput
                style={{
                  height: 40,
                  backgroundColor: "white",
                  fontSize: 13,
                  width: "70%",
                  padding: 1,
                  marginLeft: 8,
                }}
                onChangeText={(text) => setFdata({ ...fdata, Age: text })}
                placeholder="Hemoglobin Value"
                onFocus={() => {
                  setHbF(true);
                  setEsrF(false);
                  setLympF(false);
                  setXrayF(false);
                  setAnyF(false);
                }}
              />
            </View>
          </View>
          <View
            style={{
              margin: 10,
              backgroundColor: "white",
              borderRadius: 8,
              borderColor: esrF ? "#00b1d9" : "black",
              overflow: "hidden",
              borderWidth: 2,
              width: "45%",
            }}
          >
            <View
              style={{ display: "flex", flexDirection: "row", marginLeft: 8 }}
            >
              <MaterialCommunityIcons
                name="test-tube"
                size={24}
                color={esrF ? "#00b1d9" : "black"}
                style={{ marginTop: 8 }}
              />
              <TextInput
                style={{
                  height: 40,
                  backgroundColor: "white",
                  fontSize: 15,
                  padding: 5,
                  marginLeft: 12,
                  width: "80%",
                }}
                onChangeText={(text) => setFdata({ ...fdata, Gender: text })}
                placeholder="ESR Value"
                onFocus={() => {
                  setHbF(false);
                  setEsrF(true);
                  setLympF(false);
                  setXrayF(false);
                  setAnyF(false);
                }}
              />
            </View>
          </View>
        </View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View
            style={{
              margin: 10,
              backgroundColor: "white",
              borderRadius: 8,
              borderColor: lypmF ? "#00b1d9" : "black",
              borderWidth: 2,
              width: "44%",
            }}
          >
            <View
              style={{ display: "flex", flexDirection: "row", marginLeft: 10 }}
            >
              <FontAwesome5
                name="cloudscale"
                size={24}
                color={lypmF ? "#00b1d9" : "black"}
                style={{ marginTop: 5 }}
              />
              <TextInput
                style={{
                  height: 40,
                  backgroundColor: "white",
                  fontSize: 13,
                  width: "80%",
                  padding: 5,
                  marginLeft: 5,
                }}
                onChangeText={(text) => setFdata({ ...fdata, Age: text })}
                placeholder="Lymphocyte value"
                onFocus={() => {
                  setHbF(false);
                  setEsrF(false);
                  setLympF(true);
                  setXrayF(false);
                  setAnyF(false);
                }}
              />
            </View>
          </View>
          <View
            style={{
              margin: 10,
              backgroundColor: "white",
              borderRadius: 8,
              borderColor: xrayF ? "#00b1d9" : "black",
              overflow: "hidden",
              borderWidth: 2,
              width: "45%",
            }}
          >
            <View
              style={{ display: "flex", flexDirection: "row", marginLeft: 10 }}
            >
              <FontAwesome5
                name="x-ray"
                size={15}
                color={xrayF ? "#00b1d9" : "black"}
                style={{ marginTop: 11 }}
              />
              <TextInput
                style={{
                  height: 40,
                  backgroundColor: "white",
                  fontSize: 15,
                  padding: 5,
                  marginLeft: 15,
                  width: "70%",
                }}
                onChangeText={(text) => setFdata({ ...fdata, Gender: text })}
                placeholder="Chest X-Ray"
                onFocus={() => {
                  setHbF(false);
                  setEsrF(false);
                  setLympF(false);
                  setXrayF(true);
                  setAnyF(false);
                }}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            margin: 10,
            backgroundColor: "white",
            borderRadius: 8,
            borderColor: anyF ? "#00b1d9" : "black",
            borderWidth: 2,
          }}
        >
          <View
            style={{ display: "flex", flexDirection: "row", marginLeft: 15 }}
          >
            <Foundation
              name="page-edit"
              size={24}
              color={anyF ? "#00b1d9" : "black"}
              style={{ marginTop: 8 }}
            />
            <TextInput
              style={{
                height: 40,
                backgroundColor: "white",
                fontSize: 15,
                width: "80%",
                padding: 5,
                marginLeft: 20,
              }}
              onChangeText={(text) => setFdata({ ...fdata, Consent: text })}
              placeholder="Any other important clinical record...."
              onFocus={() => {
                setHbF(false);
                setEsrF(false);
                setLympF(false);
                setXrayF(false);
                setAnyF(true);
              }}
            />
          </View>
        </View>
      </View>

      <View style={{ alignItems: "center" }}>
        <View
          style={{
            width: "50%",
            padding: 2,
            backgroundColor: "white",
            borderRadius: 30,
            marginTop: 10,
          }}
        >
          <Pressable
            style={{
              margin: 5,
              backgroundColor: "#129bad",
              padding: 10,
              borderRadius: 20,
              marginTop: 5,
            }}
            onPress={submit}
          >
            <Text
              style={{ textAlign: "center", color: "white", fontWeight: "500" }}
            >
              Submit{" "}
            </Text>
          </Pressable>
        </View>
      </View>

      <Text> {"\n"}</Text>
    </ScrollView>
    </View>
    </>
  );
};

export default VolunteerPatientData;

const styles = StyleSheet.create({

  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "120%",
    opacity: 0.2,
    backgroundColor: "#08c47f",
    resizeMode: "cover", // Adjust this as needed
  },
});
