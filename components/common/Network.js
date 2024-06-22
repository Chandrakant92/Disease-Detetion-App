import React, { useEffect, useState } from "react";
import { View, Text, Button ,StyleSheet,TouchableOpacity, Image} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import networkImg from "../../assets/animations/network.json";
import LottieView from "lottie-react-native";

function Network({isConnected, setIsConnected}) {
   //const [isConnected, setIsConnected] = useState(null);

  const checkNetworkStatus = async () => {
    const state = await NetInfo.fetch();
    setIsConnected(state.isConnected);
    
  };

  useEffect(() => {
    // Subscribe to network connectivity changes
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      console.log("====================================");
      console.log(state.isConnected,"network");
      console.log("====================================");
    });

    // Clean up the subscription when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
    {isConnected ? null : (
      <View style={styles.container}>
           <Image
            source={require("../../assets/bgAI.jpg")}
            style={styles.backgroundImage}
          />
        <View style={styles.animationContainer}>
          <LottieView
            source={networkImg}
            autoPlay
            loop
            style={styles.animation} // Adjust the dimensions as needed
          />
        </View>
        <Text style={styles.noInternetText}>NO INTERNET CONNECTION</Text>
        <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.8}
              onPress={() => {
               checkNetworkStatus();
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
               Reload
              </Text>
            </TouchableOpacity>
      </View>
    )}
  </>
  );
}

export default Network;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity:0.2,
    backgroundColor: "#08c47f",
    resizeMode: "cover", // Adjust this as needed
  },
  text: {
    color: "#000",
    marginBottom: 20,
  },
  animationContainer: {
    alignItems: "center", // Center the Lottie animation horizontally
  },
  animation: {
    height: 200,
    
  },
  noInternetText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom:30
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
    borderWidth: 1,
    borderColor: "#129bad",
    marginBottom: 20,
  },
});

