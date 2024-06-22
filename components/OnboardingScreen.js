import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import Lottie from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { setItem } from "../utils/asyncStorage";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function OnboardingScreen({ navigation }) {
  // const navigation = useNavigation();

  const handleDone = () => {
    navigation.navigate("LanguageScreen");
    setItem("onboarded", "1");
  };

  const doneButton = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.doneButton} {...props}>
        <Text style={{ fontSize: 15, color: "#fff" }}>Let's start</Text>
      </TouchableOpacity>
    );
  };
  const skip = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.skipButton} {...props}>
        <Text style={{ fontSize: 15, color: "#fff" }}>Skip</Text>
      </TouchableOpacity>
    );
  };

  const nextButton = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.nextButton} {...props}>
        <Ionicons
          name={"ios-arrow-forward-circle"}
          size={50}
          color="#08c47f"
          style={{ marginRight: 15 }}
        />
      </TouchableOpacity>
    );
  };

  // Custom component for the title with custom styles
  const CustomTitle = ({ title }) => (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );

  // Custom component for the subtitle with custom styles
  const CustomSubtitle = ({ subtitle }) => (
    <View style={styles.subtitleContainer}>
      <Text style={styles.subtitleText}>{subtitle}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        NextButtonComponent={nextButton}
        SkipButtonComponent={skip}
        bottomBarHighlight={true}
        DoneButtonComponent={doneButton}
        containerStyles={{ paddingHorizontal: 15 }}
        pages={[
          {
            backgroundColor: "#fff",
            image: (
              <>
                <View>
                  <Image
                    source={require("../assets/Onbording/onbording1.jpg")}
                    style={styles.image}
                  />
                </View>
              </>
            ),

            title: <CustomTitle title="Welcome To AiSense" />,
            subtitle: (
              <CustomSubtitle subtitle="The Future of Disease Screening is Here!!" />
            ),
          },
          {
            backgroundColor: "#fff",
            image: (
              <View>
                <Image
                  source={require("../assets/Onbording/onbording4.jpg")}
                  style={styles.image}
                />
              </View>
            ),

            title: <CustomTitle title="Decoding Wellness through Sound" />,
            subtitle: (
              <CustomSubtitle subtitle="Discovering the Science Behind How Your Voice Reflects Your Health Journey." />
            ),
          },
          {
            backgroundColor: "#fff",
            image: (
              <>
                <View>
                  <Image
                    source={require("../assets/Onbording/onbording3.jpg")}
                    style={styles.image}
                  />
                </View>
              </>
            ),

            title: <CustomTitle title="Privacy & Security" />,
            subtitle: (
              <CustomSubtitle subtitle="Your Data Security is Our Priority: We Do Not Store Your Voice Sample, Ensuring Your Privacy.!" />
            ),
          },
          {
            backgroundColor: "#fff",
            image: (
              <View>
                <Image
                  source={require("../assets/Onbording/onbording2.jpg")}
                  style={styles.image}
                />
              </View>
            ),

            title: <CustomTitle title="Let’s Get Started" />,
            subtitle: (
              <CustomSubtitle subtitle="Just Use Your Voice Anytime, Anywhere, and Get Advanced Early Stage Detection and Insights Effortlessly. " />
            ),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  lottie: {
    width: width * 0.5,
    height: width * 0.6,
  },
  image: {
    width: width * 0.5,
    height: width * 0.6,
  },
  doneButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#08c47f",
    borderRadius: 50,

    marginRight: 10,
  },
  skipButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#08c47f",
    borderRadius: 50,
    marginLeft: 10,
  },
  subtitleContainer: {
    alignItems: "center",
  },
  subtitleText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center", 
  },
  titleContainer: {
    alignItems: "center",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
});

// <View style={styles.lottie}>
//   <Lottie
//     source={require("../assets/animations/onbording2.json")}
//     autoPlay
//     loop
//   />
// </View>
