import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  Animated,
  Button,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { button1 } from "./common/button";
import React, { useState, useRef, useEffect, useId } from "react";
import { Audio } from "expo-av";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import * as Localization from "expo-localization";
import i18n, { t } from "i18n-js";
import { translations } from "../Translation";
import { getSession, setSession } from "../utils/asyncStorage";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "@firebase/storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import Toast from "react-native-toast-message";
import speakerAnimation from "../assets/animations/speaker.json"; // Update the path
import RecordAnimation from "../assets/animations/recodring.json"; // Update the path
import soundwave from "../assets/animations/soundwave.json"; // Update the path
import NetInfo from "@react-native-community/netinfo";
import { Recording } from "expo-av/build/Audio";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

i18n.translations = translations; // Set up translation
i18n.fallbacks = true;

const BlinkingText = ({ text }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev); // Toggle visibility
    }, 500); // Adjust the interval duration as needed

    return () => {
      clearInterval(interval); // Clean up the interval when the component unmounts
    };
  }, []);

  return isVisible ? <Text style={styles.text}>{text}</Text> : null;
};

const BottomNavBar = ({}) => {
  const navigation = useNavigation();
  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);
  const [sound, setSound] = useState();
  const [IconStart, setIconStart] = useState(false);
  const [recordIcon, setrecordIcon] = useState(false);
  const [isConnected, setIsConnected] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [Isspeaker, setIsSpeaker] = useState(true);
  const [Length, SetLength] = useState(false);
  const [loading, setLoading] = useState(false);

  const [uri, setUri] = useState(null);

  //###########################################################################
  //when recording is start
  async function startRecording() {
    try {
      // Check if already recording

      if (isRecording) {
        Toast.show({
          type: "error", //success ,error, info
          text1: "Already recording is in progress..",
        });
        console.log("Already recording.");
        return;
      }

      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const recordingOptions = {
          android: {
            extension: ".wav",
            outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_DEFAULT,
            audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_DEFAULT,
            sampleRate: 44100,
            numberOfChannels: 1,
            bitRate: 128000,
          },
          ios: {
            extension: ".wav",
            audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
            sampleRate: 44100,
            numberOfChannels: 1,
            bitRate: 128000,
            linearPCMBitDepth: 16,
            linearPCMIsBigEndian: false,
            linearPCMIsFloat: false,
          },
        };

        const { recording } =
          await Audio.Recording.createAsync(recordingOptions);

        setRecording(recording);
        setIsRecording(true);
        console.log("Recording started");
      } else {
        setMessage("Please grant permission to app to access microphone");
        Toast.show({
          type: "error", //success ,error, info
          text1: "Allow Microphone..",
          text2: "Please grant permission to app to access microphone..",
        });
      }
    } catch (err) {
      console.error("Failed to start recording", err);
      Toast.show({
        type: "error", //success ,error, info
        text1: "Recording get Failed..",
        text2: "Please start again or try after some time...",
      });
    }
  }

  //get firebase storage
  const storage = firebase.storage();
  const db = firebase.firestore();
  // const userRef = db.collection("UserData").id;

  // ##########################################################################

  const generateInvoiceNumber = () => {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    return randomNumber.toString().substring(0, 6); // Ensure it's a 6-digit number
  };

  //genatte unquie values
  function modifyValues(inputValues) {
    const modifiedValues = {};

    for (const key in inputValues) {
      if (Object.hasOwnProperty.call(inputValues, key)) {
        const originalValue = parseFloat(inputValues[key]);
        const randomChange =
          Math.random() * Math.min(originalValue, 1 - originalValue); // Restrict the random change to avoid exceeding 0 or 1
        const addOrSubtract = Math.random() < 0.5 ? -1 : 1;
        let modifiedValue = originalValue + randomChange * addOrSubtract;

        // Ensure the modified value stays within [0, 1] and limits decimal places to 15
        modifiedValue = Math.max(
          0,
          Math.min(1, parseFloat(modifiedValue.toFixed(15)))
        );

        modifiedValues[key] = modifiedValue;
      }
    }

    return modifiedValues;
  }

  //Upload function after  recording done
  async function uploadRecording() {
    checkNetworkStatus();

    if (!isConnected) {
      //check network is connected or not

      Toast.show({
        type: "error", //success ,error, info
        text1: "Network issues in uploading..",
        text2: "Your recording will be uploaded after network is available",
      });
    } else {
      // Check if already stopped or not recording

      console.log("====================================");
      console.log(uri);
      console.log("====================================");
      // creating blob from uri of recording
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError("Network request failed"));
          Toast.show({
            type: "error", //success ,error, info
            text1: "Recording get Failed..",
            text2: "Please start again or try after some time...",
          });
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });

      // checking if blob is created or not
      if (blob) {
        //-----------------------------------------------------------
        const uid = await getSession("userId");
        const uriParts = uri.split(".");
        const fileType = uriParts[uriParts.length - 1];
        const audioFileName = `Test2.${fileType}`;
        // const audioFileName = `${Date.now()}.${fileType}`;
        const audioFileRef = ref(storage, `/${uid}/${audioFileName}`);
        const metadata = {
          contentType: `audio/${fileType}`,
        };
        await uploadBytes(audioFileRef, blob, metadata);
        const downloadURL = await getDownloadURL(audioFileRef);
        console.log(" Recording Upload to firebase");

        console.log("downloadURL", downloadURL);
      } else {
        console.log("error in creating blob");
      }

      Toast.show({
        type: "success", //success ,error, info
        text1: "Recording is uploaded Successfully",
        text2: "Now wait for the result .....",
      });
      // console.log("sound", sound);
      try {
        setLoading(true);
        const response = await fetch("http://103.127.35.45:5005/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uid: "qVgLjjyqZ1XynEqXfIG55v6D58x2" }),
        });

        if (!response.ok) {
          // setLoading(false);
          Toast.show({
            type: "error", //success ,error, info
            text1: "Network Issue ",
            text2: "Try Again....",
          });
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setLoading(false);
        console.log("Response:", data);
        setLoading(false);
        const r = modifyValues(data);
        navigation.navigate("Result", {
          dataOutput: r,
          invoiceNo: generateInvoiceNumber(),
        });
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    }
  }

  const deleteRecording = (index) => {
    let updatedRecordings = [...recordings];
    const deletedRecording = updatedRecordings.splice(index, 1)[0];
    deletedRecording.sound.unloadAsync(); // Unload the deleted sound to free resources
    setRecordings(updatedRecordings);

    Toast.show({
      type: "success", //success ,error, info
      text1: "Recording is Deleted Successfully",
      text2: "You can Record it one more time.. ",
    });
  };

  //######################################################################################
  // when recording is stop the recording
  async function stopRecording() {
    console.log("stopping recording..");
    // Check if already stopped or not recording
    if (!isRecording) {
      console.log("Recording is not in progress.");
      Toast.show({
        type: "error", //success ,error, info
        text1: "Recording is not in progress...",
        text2: "to Start press play button.. ",
      });
      return;
    }

    //setRecording(undefined); // set recording to undefined to stop recording
    await recording.stopAndUnloadAsync(); // stop and unload the recording, it will create a file in the cache directory
    const uri = recording.getURI();
    setUri(uri);
    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI(),
    });

    setIsRecording(false);
    console.log("Recording stopped successfully");

    Toast.show({
      type: "info", //success ,error, info
      text1: "Great, Recording has Done",
      text2: "Now play , upload or delete it..",
    });

    setRecordings(updatedRecordings);
  }

  //##################################################################################

  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  function getRecordingLines() {
    if (recordings.length === 0) {
      return null; // Return null or any desired UI when no recordings are present
    }
    const recordingLine = recordings[recordings.length - 1]; // Get the last recording

    return (
      <View style={styles.row}>
        {!recordIcon ? (
          <Text style={styles.fill}>
            Recording {recordings.length} - {recordingLine.duration}
          </Text>
        ) : (
          <>
            <Text style={styles.fill}>Recording{recordings.length}</Text>
            <LottieView
              source={soundwave}
              autoPlay
              loop
              style={{
                height: 40,
              }} // Adjust the dimensions as needed
            />
          </>
        )}
        <Pressable
          style={styles.iconButton}
          onPress={() => {
            const soundToPlay = recordingLine;
            console.log("soundToPlay", soundToPlay);

            if (soundToPlay) {
              if (!recordIcon) {
                // Audio is not playing, so start playback
                soundToPlay.sound.replayAsync();

                // Set Isspeaker to false before playing
                setrecordIcon(true);

                // When audio playback is done, set Isspeaker to true
                soundToPlay.sound.setOnPlaybackStatusUpdate((status) => {
                  if (status.didJustFinish) {
                    setrecordIcon(false);
                  }
                });
              } else {
                // Audio is already playing, so stop it
                soundToPlay.sound.stopAsync();
                // Set Isspeaker to true
                setrecordIcon(false);
              }
            }
          }}
        >
          <MaterialCommunityIcons
            name={recordIcon ? "stop" : "play"}
            size={24}
            style={{ color: "#000" }}
          />
        </Pressable>
        <Pressable
          style={styles.iconButton}
          onPress={() => deleteRecording(recordings.length - 1)}
        >
          <Text>
            <AntDesign name="delete" size={24} color="black" />{" "}
            {/* Delete icon */}
          </Text>
        </Pressable>
        <Pressable style={styles.iconButton} onPress={() => uploadRecording()}>
          <Text>
            <AntDesign name="cloudupload" size={24} color="black" />{" "}
          </Text>
        </Pressable>
      </View>
    );
  }
  //cancel the recording without stored to database

  async function cancelRecording() {
    console.log("stopping recording");
    // Check if already stopped or not recording
    if (!isRecording) {
      console.log("Recording is not in progress.");
      Toast.show({
        type: "error", //success ,error, info
        text1: "Recording is not in progress...",
        text2: "to Start press paly button.. ",
      });
      return;
    }

    setRecording(undefined); // set recording to undefined to stop recording

    await recording.stopAndUnloadAsync(); // stop and unload the recording, it will create a file in the cache directory
    uri = recording.getURI();

    setIsRecording(false);
    console.log("Recording stopped");
    Toast.show({
      type: "error", //success ,error, info
      text1: "You cancel the Recording...",
      text2: "Press start button and Record again..",
    });

    // let updatedRecordings = [...recordings];
    // const { sound, status } = await recording.createNewLoadedSoundAsync();
    // updatedRecordings.push({
    //   sound: sound,
    //   duration: getDurationFormatted(status.durationMillis),
    //   file: uri,
    // });

    setRecordings(updatedRecordings);

    // console.log("sound", sound);
  }

  const [time, setTime] = useState(0);

  // state to check stopwatch running or not
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const handleLanguage = async () => {
      i18n.locale = await getSession("Language");
    };
    handleLanguage();

    let intervalId;
    if (isRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 6), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  // Hours calculation
  const hours = Math.floor(time / 360000);

  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000);

  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100);

  // Milliseconds calculation
  const milliseconds = time % 100;

  // Method to start and stop timer
  const startAndStop = () => {
    setIsRunning(!isRunning);
    setrecordIcon(!recordIcon);
    setTime(0);
    setIconStart(!IconStart);
  };

  // Function to load and play the audio
  const playAudio = async () => {
    if (Isspeaker) {
      // Audio is not playing, so start playback
      console.log("audio playing....");
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/Audio.mp3")
      );
      setSound(sound);

      // Set Isspeaker to false before playing
      setIsSpeaker(false);

      await sound.playAsync();

      // When audio playback is done, set Isspeaker to true
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsSpeaker(true);
        }
      });
    } else {
      // Audio is already playing, so stop it
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
      }

      console.log("audio i stop...");

      // Set Isspeaker to true
      setIsSpeaker(true);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        // Check if recording is in progress
        // if (isRecording) {
        //   stopRecording();
        //   startAndStop(); // Stop the recording when the screen loses focus
        // }

        if (!Isspeaker) {
          sound.stopAsync();
          setIsSpeaker(true);
        }
      };
    }, [isRecording, Isspeaker])
  );

  // Network issues check

  const checkNetworkStatus = async () => {
    const state = await NetInfo.fetch();
    setIsConnected(state.isConnected);
  };

  useEffect(() => {
    // Subscribe to network connectivity changes
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      console.log("====================================");
      console.log(state.isConnected);
      console.log("====================================");
    });

    // Clean up the subscription when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <>
        <Image
          source={require("../assets/bgAI.jpg")}
          style={styles.backgroundImage}
        />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" style={{ alignItems: "center" }} />
          <Text style={{ fontSize: 14 }}>Analyzing voice...</Text>
          <Text>wait for result</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <View style={styles.containerNav}>
        <Image
          source={require("../assets/bgAI.jpg")}
          style={styles.backgroundImage}
        />
        <View style={{ height: 30 }}>
          {!IconStart ? (
            <BlinkingText text={i18n.t("recordHeading")} />
          ) : (
            <Text style={[styles.text1]}>{i18n.t("recordHeading")}</Text>
          )}
        </View>
        <ScrollView
          style={styles.container1}
          contentContainerStyle={styles.ContentContainer}
        >
          <View style={{ flex: 1, justifyContent: "flex-start" }}>
            <TouchableOpacity onPress={playAudio}>
              {!Isspeaker ? (
                <LottieView
                  source={speakerAnimation}
                  autoPlay
                  loop
                  style={{
                    height: 40,
                  }} // Adjust the dimensions as needed
                />
              ) : (
                <Ionicons
                  name="volume-mute"
                  size={30}
                  style={{ color: "#000", marginBottom: 7 }}
                  // onPress={() => navigation.navigate("")}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.text3}>
              अ... आ... इ... ई... उ... ऊ... ए... ऐ... ओ... औ... अं... अंह... ख..
              खा. झ. ज. थ. प. फह. क्ष. त्र.
            </Text>
          </View>
        </ScrollView>

        <View style={styles.bottomNavBar}>
          <Image
            source={require("../assets/bgAI.jpg")}
            style={styles.backgroundImage}
          />
          <View style={styles.curveContainer}>
            {IconStart ? (
              <>
                <View style={styles.row1}>
                  <LottieView
                    source={RecordAnimation}
                    autoPlay
                    loop
                    style={{
                      height: 30,
                      marginRight: 10,
                      alignContent: "center",
                    }} // Adjust the dimensions as needed
                  />
                  <View>
                    <Text style={styles.Recordtext}>
                      {minutes.toString().padStart(2, "0")}:
                      {seconds.toString().padStart(2, "0")}:
                      {milliseconds.toString().padStart(2, "0")}
                    </Text>
                  </View>
                </View>
              </>
            ) : (
              getRecordingLines()
            )}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Pressable
                style={styles.iconBox}
                onPress={() => {
                  if (isRecording) {
                    console.log("====================================");
                    console.log("Here");
                    console.log("====================================");
                    stopRecording();
                  } else {
                    startRecording();
                  }
                  startAndStop();
                }}
              >
                {IconStart ? (
                  <MaterialCommunityIcons
                    name="stop"
                    size={50}
                    style={{ color: "#fff" }}
                    // onPress={() => navigation.navigate("")}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="microphone"
                    size={50}
                    style={{ color: "#fff" }}
                    // onPress={() => navigation.navigate("")}
                  />
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default BottomNavBar;

const styles = StyleSheet.create({
  containerNav: {
    flex: 1,
    position: "relative",
    backgroundColor: "transparent",
    paddingTop: 100,
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
  ContentContainer: {
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 32,
    alignContent: "center",
  },
  container1: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingTop: 0,
    paddingHorizontal: "5%",
    margin: "8%",
    marginBottom: "10%",
    borderColor: "#129bad",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
  },
  Timecontainer: {
    borderRadius: 30,
    paddingHorizontal: 25,
    padding: 2,
    backgroundColor: "#bbeef0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: "#129bad",
    flexDirection: "row",
    marginBottom: 0,
  },

  text1: {
    marginBottom: "0%",
    fontSize: 20,
    color: "#000",
    textAlign: "center",
    fontWeight: "600",
  },
  text4: {
    marginBottom: "0%",
    fontSize: 20,
    color: "#129bad",
    textAlign: "center",
    fontWeight: "600",
  },
  text: {
    fontSize: 18,
    color: "#000",
    textAlign: "center",
    fontWeight: "600",
  },
  Recordtext: {
    fontSize: 25,
    color: "#08c47f",
    textAlign: "center",
    fontWeight: "600",
  },
  text2: {
    paddingTop: "10%",
    padding: "5%",
    fontSize: 18,
    color: "#000",
    textAlign: "center",
    fontWeight: "500",
  },
  text3: {
    padding: "5%",
    fontSize: 35,
    color: "#000",
    textAlign: "center",
    fontWeight: "500",
  },

  curveContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingHorizontal: 40,
    paddingBottom: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 8,
  },
  iconBox: {
    backgroundColor: "#08c47f",
    borderRadius: 100,
    elevation: 2,
    padding: 5,
  },
  iconBox1: {
    backgroundColor: "#08c47f",
    borderRadius: 15,
    padding: 10,
    elevation: 2,
    color: "red",
    paddingHorizontal: "15%",
    borderWidth: 1,
    borderColor: "#08c47f",
  },

  playButton: {
    position: "absolute",
    bottom: Dimensions.get("window").height * 0.02, // Responsive positioning
    left: "50%",
    transform: [{ translateX: -60 }],
    zIndex: 1,
    borderRadius: 100,
    padding: 25,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  playButton1: {
    backgroundColor: "#129bad",
    borderRadius: 100,
    padding: 10,
    elevation: 8,
  },
  button1: {
    minWidth: "60%",
    backgroundColor: "#bbeef0",
    borderRadius: 10,
    textAlign: "center",
    paddingVertical: 5,
    marginVertical: 5,
    fontSize: 25,
    fontWeight: "bold",
    elevation: 2,
  },
  button: {
    minWidth: "20%",
    backgroundColor: "#bbeef0",
    borderRadius: 10,
    textAlign: "center",
    paddingVertical: 5,
    marginVertical: 5,
    fontSize: 15,
    fontWeight: "bold",
    elevation: 2,
  },
  iconButton: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 5,
    marginRight: 5, // Adjust spacing between buttons if needed
    elevation: 2,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#08c47f",
    color: "#129bad",
    borderWidth: 1,
    borderColor: "#d4d4d4",
  },
  row1: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 5,
    marginBottom: 20,
    borderRadius: 10,
    // backgroundColor: "#129bad",
    borderWidth: 2,
    borderColor: "#08c47f",
  },
  fill: {
    textAlignVertical: "bottom",
    fontSize: 15,
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    margin: 10,
  },
});
