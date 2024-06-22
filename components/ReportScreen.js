import React, { useState, useEffect } from "react";
import { Audio } from "expo-av";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Card, Button } from "react-native-elements";
import * as FileSystem from "expo-file-system";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "@firebase/storage";

const data = [
  {
    p: "P1",
    TB: "101",
    observedValue: "10.7797305281023",
    abnormalRange: "423.123 to 234.453",
  },
  {
    p: "P1",
    TB: "101",
    observedValue: "10.7797305281023",
    abnormalRange: "423.123 to 234.453",
  },
  {
    p: "P1",
    TB: "101",
    observedValue: "10.7797305281023",
    abnormalRange: "423.123 to 234.453",
  },
  {
    p: "P1",
    TB: "101",
    observedValue: "10.7797305281023",
    abnormalRange: "423.123 to 234.453",
  },
  {
    p: "P1",
    TB: "101",
    observedValue: "10.7797305281023",
    abnormalRange: "423.123 to 234.453",
  },
  {
    p: "P1",
    TB: "101",
    observedValue: "10.7797305281023",
    abnormalRange: "423.123 to 234.453",
  },
  {
    p: "P1",
    TB: "101",
    observedValue: "10.7797305281023",
    abnormalRange: "423.123 to 234.453",
  },
  {
    p: "P1",
    TB: "101",
    observedValue: "10.7797305281023",
    abnormalRange: "423.123 to 234.453",
  },
  {
    p: "P1",
    TB: "101",
    observedValue: "10.7797305281023",
    abnormalRange: "423.123 to 234.453",
  },
  {
    p: "P1",
    TB: "101",
    observedValue: "10.7797305281023",
    abnormalRange: "423.123 to 234.453",
  },
  {
    p: "P1",
    TB: "101",
    observedValue: "10.7797305281023",
    abnormalRange: "423.123 to 234.453",
  },
  {
    p: "P1",
    TB: "101",
    observedValue: "10.7797305281023",
    abnormalRange: "423.123 to 234.453",
  },
  {
    p: "P1",
    TB: "101",
    observedValue: "10.7797305281023",
    abnormalRange: "423.123 to 234.453",
  },
  {
    p: "P1",
    TB: "101",
    observedValue: "10.7797305281023",
    abnormalRange: "423.123 to 234.453",
  },
  {
    p: "P1",
    TB: "101",
    observedValue: "10.7797305281023",
    abnormalRange: "423.123 to 234.453",
  },
  {
    p: "P1",
    TB: "101",
    observedValue: "10.7797305281023",
    abnormalRange: "423.123 to 234.453",
  },
  {
    p: "P1",
    TB: "101",
    observedValue: "10.7797305281023",
    abnormalRange: "423.123 to 234.453",
  },
  {
    p: "P1",
    TB: "101",
    observedValue: "10.7797305281023",
    abnormalRange: "423.123 to 234.453",
  },
  {
    p: "P1",
    TB: "101",
    observedValue: "10.7797305281023",
    abnormalRange: "423.123 to 234.453",
  },
  {
    p: "P1",
    TB: "101",
    observedValue: "10.7797305281023",
    abnormalRange: "423.123 to 234.453",
  },
  {
    p: "P1",
    TB: "101",
    observedValue: "10.7797305281023",
    abnormalRange: "423.123 to 234.453",
  },
  {
    p: "P1",
    TB: "101",
    observedValue: "10.7797305281023",
    abnormalRange: "423.123 to 234.453",
  },
  {
    p: "P1",
    TB: "101",
    observedValue: "10.7797305281023",
    abnormalRange: "423.123 to 234.453",
  },
  {
    p: "P1",
    TB: "101",
    observedValue: "10.7797305281023",
    abnormalRange: "423.123 to 234.453",
  },
  {
    p: "P1",
    TB: "101",
    observedValue: "10.7797305281023",
    abnormalRange: "423.123 to 234.453",
  },
  {
    p: "P1",
    TB: "101",
    observedValue: "10.7797305281023",
    abnormalRange: "423.123 to 234.453",
  },
  {
    p: "P1",
    TB: "101",
    observedValue: "10.7797305281023",
    abnormalRange: "423.123 to 234.453",
  },
  {
    p: "P1",
    TB: "101",
    observedValue: "10.7797305281023",
    abnormalRange: "423.123 to 234.453",
  },
  {
    p: "P1",
    TB: "101",
    observedValue: "10.7797305281023",
    abnormalRange: "423.123 to 234.453",
  },
  {
    p: "P1",
    TB: "101",
    observedValue: "10.7797305281023",
    abnormalRange: "423.123 to 234.453",
  },
  {
    p: "P1",
    TB: "101",
    observedValue: "10.7797305281023",
    abnormalRange: "423.123 to 234.453",
  },
  {
    p: "P1",
    TB: "101",
    observedValue: "10.7797305281023",
    abnormalRange: "423.123 to 234.453",
  },
  {
    p: "P1",
    TB: "101",
    observedValue: "10.7797305281023",
    abnormalRange: "423.123 to 234.453",
  },

  // Add more data objects as needed
];

const ReportScreen = () => {
  const [recording, setRecording] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [Uri, setUri] = useState();

  useEffect(() => {
    return () => {
      if (recording) {
        recording.setOnRecordingStatusUpdate(null);
      }
    };
  }, [recording]);

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to record audio was denied");
        return;
      }

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync({
        ...Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
        android: {
          extension: ".3gp",
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_DEFAULT,
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_DEFAULT,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
        },
        ios: {
          extension: ".wav",
          outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_LINEARPCM,
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 705600,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
      });

      recording.setOnRecordingStatusUpdate((status) => {
        setIsRecording(status.isRecording);
      });

      setRecording(recording);
      await recording.startAsync();
      console.log("Recording started");
    } catch (error) {
      console.error("Failed to start recording", error);
    }
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const uri = await recording.getURI(); // Get URI after recording stops
      setUri(uri); // Set URI for playback
      setRecording(undefined);
      console.log("Recording stopped, URI:", uri);
    } catch (error) {
      console.error("Failed to stop recording", error);
    }
  };

  const [sound, setSound] = useState();
  useEffect(() => {
    const loadSound = async () => {
      try {
        if (Uri) {
          const { sound } = await Audio.Sound.createAsync({ uri: Uri });
          setSound(sound);
          console.log("Sound loaded");
        }
      } catch (error) {
        console.error("Failed to load sound", error);
      }
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
        console.log("Sound unloaded");
      }
    };
  }, [Uri]);

  const playSound = async () => {
    try {
      if (sound) {
        await sound.playAsync();
        console.log("Sound playing");
      } else {
        console.warn("Sound not loaded yet");
      }
    } catch (error) {
      console.error("Failed to play sound", error);
    }
  };

  //get firebase storage
  const storage = firebase.storage();
  const db = firebase.firestore();
  const userRef = db.collection("UserRecordings");

  const uploadRecording = async () => {
    try {
      // Create a blob from the recorded audio URI
      const blob = await fetch(Uri).then((response) => response.blob());

      // Get the file extension from the URI
      const uriParts = Uri.split(".");
      const fileType = uriParts[uriParts.length - 1];

      // Generate a unique filename
      const audioFileName = `T${Date.now()}.${fileType}`;

      // Create a reference to the Firebase Storage location
      const storage = getStorage();
      const audioFileRef = ref(storage, `recordings/${audioFileName}`);

      // Set metadata for the file
      const metadata = {
        contentType: `audio/${fileType}`,
      };

      // Upload the blob to Firebase Storage
      await uploadBytes(audioFileRef, blob, metadata);

      // Get the download URL for the uploaded file
      const downloadURL = await getDownloadURL(audioFileRef);

      console.log("Recording uploaded to Firebase Storage");
      console.log("Download URL:", downloadURL);

      // Now you can use the download URL to play the audio
      // For example, you can use it with Audio.Sound from expo-av
    } catch (error) {
      console.error("Failed to upload recording to Firebase Storage:", error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Image
          source={require("../assets/bgAI.jpg")}
          style={styles.backgroundImage}
        />
        {/*  */}

        <Card containerStyle={styles.cardContainer}>
          <ScrollView horizontal>
            <View style={styles.tableContainer}>
              <View style={styles.tableHeader}>
                <Text style={styles.headerText}>Parameter</Text>
                <Text style={styles.headerText}>TB</Text>
                <Text style={styles.headerText}>Observed Value</Text>
                <Text style={styles.headerText}>Abnormal Range</Text>
              </View>
              <View style={styles.separator}></View>
              <ScrollView>
                {/* Table Rows */}
                {data.map((rowData, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.cell}>{rowData.p}</Text>
                    <Text style={styles.cell}>{rowData.TB}</Text>
                    <Text style={styles.cell}>{rowData.observedValue}</Text>
                    <Text style={styles.cell}>{rowData.abnormalRange}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </ScrollView>
        </Card>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 3,
    backgroundColor: "transparent",
  },
  demo: {
    marginTop: "20px",
    paddingTop: 100,
  },
  cardContainer: {
    borderRadius: 10,
    padding: 0,
    elevation: 3,
    backgroundColor: "#fff",
    marginTop: "25%",
    overflow: "hidden", // Ensure card content stays within bounds
  },
  tableContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    alignItems: "center",
  },
  separator: {
    borderWidth: 2,
    borderColor: "#129bad",
    marginBottom: 5,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
    marginLeft: 0,
    justifyContent: "space-between",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#129bad",
    paddingVertical: 8,
    alignItems: "center",
  },
  cell: {
    alignContent: "center",
    fontSize: 12,
    marginLeft: 30,
    justifyContent: "space-between",
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

export default ReportScreen;

{
  /* 
{isRecording ? (
            <Button title="Stop Recording" onPress={stopRecording} />
          ) : (
            <Button title="Start Recording" onPress={startRecording} />
          )}
        </View>
        <Button title="Play Recording" onPress={playSound} disabled={!sound} />
          <Button title="Upload" onPress={uploadRecording} disabled={!Uri} /> */
}
