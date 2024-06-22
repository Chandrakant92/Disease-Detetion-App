import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { button1 } from "./common/button";
import {
  colors,
  link2,
  formgroup,
  input,
  textinput,
  errormessage,
  head1,
  head2,
} from "./common/formcss";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import CustomCard from "../components/common/CustomCard";
import Carousel from "react-native-reanimated-carousel";
import i18n from "i18n-js";
import { translations } from "../Translation";
import { getSession } from "../utils/asyncStorage";
import Network from "../components/common/Network";
import {firebase} from "../components/FirebaseConfig"


i18n.translations = translations; // Set up translations
i18n.fallbacks = true;

const Home = ({ navigation }) => {
  const width = Dimensions.get("window").width;
  const [isConnected, setIsConnected] = useState(null);
  const [userDetails, setUserDetails] = useState("");

  const handleLanguage = async () => {
    i18n.locale = await getSession("Language");
  };
  

  useEffect(() => {
    
    handleLanguage();

    const fetchUserData = async () => {
      try {
        const uid = await getSession("userId");
        // console.log("current userId is ",uid); 
        if (uid) {
          const userRef = firebase.firestore().collection("UserData").where('uid', '==', uid );
         
        
          userRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const documentId = doc.id; // This is the document ID
              const userData = doc.data(); // This is the document data
              // console.log("Document ID:", documentId);
              // console.log("UserData:", userData);
              setUserDetails(userData);
            });
          });

          
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userDetails]);
  

  const dataForCards = [
    // {
    //   title: "Acquisition Device",
    //   description: "Unleash the power of your voice.",
    //   lottieFile: require("../assets/animations/Home1.json"),
    // },
    // {
    //   title: "Data Collector",
    //   description: "Description for Card 2",
    //   lottieFile: require("../assets/animations/Home2.json"),
    // },
    // {
    //   title: "Signal Processor",
    //   description: "Description for Card 3",
    //   lottieFile: require("../assets/animations/Home2.json"),
    // },
    // {
    //   title: "Cloud Data Storage",
    //   description: "Description for Card 4",
    //   lottieFile: require("../assets/animations/Home4.json"),
    // },
    {
      title: "Human Analysis",
      description: "Description for Card 5",
      lottieFile: require("../assets/animations/Home5.json"),
    },
    {
      title: "Diagnosis prediction",
      description: "Description for Card 6",
      lottieFile: require("../assets/animations/Home6.json"),
    },
    {
      title: "Al & ML patient Disease DB",
      description: "Description for Card 7",
      lottieFile: require("../assets/animations/Home7.json"),
    },
    // Add more data objects for additional cards
  ];

  const renderCardItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <CustomCard
        title={item.title}
        description={item.description}
        lottieFile={item.lottieFile}
      />
    </View>
  );

  return (
    <>
     <StatusBar style="auto" />
      {isConnected ? (
        <View style={styles.containerBG}>
          <Image
            source={require("../assets/bgAI.jpg")}
            style={styles.backgroundImage}
          />
          <View style={styles.container}>
         
            <View style={styles.container1}>
              <View>
                <Text style={styles.text2}>" {i18n.t("WELCOME")} , {userDetails.name} !</Text>
                <Text style={styles.text1}> {i18n.t("sloganHome")}</Text>
              </View>

              <Carousel
                containerCustomStyle={{ overflow: "visible" }}
                loop={true}
                width={width}               
                style={styles.carousel}
                autoPlay={true}
                mode="parallax"
                firstItem={1}
                data={dataForCards}
                scrollAnimationDuration={2000}
                renderItem={renderCardItem}
                inactiveSlideScale={0.75}
                inactiveSlideOpacity={0.75}
                slideStyle={styles.slide}
                sliderWidth={width * 0.2}
                itemWidth={width * 1}
                layoutCardOffset={20} // Adjust this value to change the spacing between cards
              />
            </View>

            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate("Record");
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: "bold",
                  textAlign: "center",
                  padding: 5,
                }}
              >
                {i18n.t("btnHome")}
              </Text>
            </TouchableOpacity>
          </View>
          <View></View>
        </View>
      ) : null}
     
     <Network isConnected={isConnected} setIsConnected={setIsConnected} />
    </>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    // backgroundColor:'#046569',
    justifyContent: "center",
    alignItems: "center",
  },
  container1: {
    marginTop: "35%",
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  ContentContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },

  text2: {
    fontSize: 18,
    color: "#08c47f",
    textAlign: "left",
    fontWeight: "800",
  },
  text1: {
    fontSize: 18,
    color: "#08c47f",
    textAlign: "left",
    fontWeight: "400",
  },

  btn: {
    minWidth: "70%",
    backgroundColor: "#08c47f",
    borderRadius: 10,
    textAlign: "center",
    paddingVertical: 8,
    marginVertical: 5,
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
  },

  cardContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  slide: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  carousel: {
    // backgroundColor: "#bbeef0",
    flex: 1,
    justifyContent: "center",
    marginTop: 0,
  },
  containerBG: {
    flex: 1,
    backgroundColor: "transparent",
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

// 2 #00989e
// 3  1e86d6
