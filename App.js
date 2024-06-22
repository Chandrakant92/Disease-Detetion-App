import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./components/Register";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ResetPass from "./components/ResetPass";
import DraweMenu from "./components/DraweMenu";
import OnboardingScreen from "./components/OnboardingScreen";
import { getItem, getSession } from "./utils/asyncStorage.js";
import ConsentScreen from "./components/ConsentScreen";
import LanguageScreen from "./components/LanguageScreen";
import Toast from "react-native-toast-message";
import LottieView from "lottie-react-native";
import lodding from "./assets/animations/loding.json";
import LogInSignIn from "./components/LogIn&SignIn";
import PrivacyConsent from "./components/PrivacyConsent";

const Stack = createNativeStackNavigator();

export default function App() {
  // const [showOnboarding, setShowOnboarding] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    // checkIfAlreadyOnboarded();
    checkLoginStatus();
  }, [isLoggedIn]);

  const checkLoginStatus = async () => {
    // Call getSession without await and handle it as a Promise

    let userLoggedIn = await getSession("isLoggedIn");
    // getSession("isLoggedIn")
    //   .then((userLoggedIn) => {
    //     console.log("====================================");
    //     console.log(userLoggedIn, "User login check");
    //     console.log("====================================");
    if (userLoggedIn === "true") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  const checkIfAlreadyOnboarded = async () => {
    let onboarded = await getItem("onboarded");

    if (onboarded == 1) {
      // hide onboarding
      setShowOnboarding(false);
    } else {
      // show onboarding
      setShowOnboarding(true);
    }
  };

  if (isLoggedIn == null) {
    return (
      <>
      
      <Image
        source={require("./assets/bgAI.jpg")}
        style={styles.backgroundImage}
      />

      <LottieView
        source={lodding}
        autoPlay
        loop
        style={{
          marginTop: 90,
          height: 400,
        }} // Adjust the dimensions as needed
      />
    </>
    );
  }

 
  // return (
  //   <NavigationContainer>
  //      <Stack.Navigator
  //           screenOptions={{
  //             headerShown: true, // Show the header
  //             headerTransparent: true, // Make the header transparent
  //             headerTintColor: "#000", // Color of header elements
  //             headerTitle: "AiSense", // Hide the title
  //             headerTitleStyle: {
  //               fontSize: 25, // Customize the font size if needed
  //               fontWeight: "600", // Customize the font weight if needed
  //             },
  //             headerTitleAlign: "center",
  //             // headerLeft: () => <CustomMenuIcon />, // Custom menu icon
  //           }}
  //         >
  //           <Stack.Screen
  //             name="menu"
  //             component={LogInSignIn}
  //             options={{
  //               headerShown: false,
  //             }}
  //           />
  //           </Stack.Navigator>
  //   </NavigationContainer>
  //    )

  console.log("====================================");
  console.log(isLoggedIn, ".....");
  console.log("====================================");

  if (!isLoggedIn) {
    return (
      <>
     
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={isLoggedIn ? "menu" : "Onboarding"}
            screenOptions={{
              headerShown: true, // Show the header
              headerTransparent: true, // Make the header transparent
              headerTintColor: "#000", // Color of header elements
              headerTitle: "AiSense", // Hide the title
              headerTitleStyle: {
                fontSize: 25, // Customize the font size if needed
                fontWeight: "600", // Customize the font weight if needed
              },
              headerTitleAlign: "center",

              // headerLeft: () => <CustomMenuIcon />, // Custom menu icon
            }}
          >
            <Stack.Screen
              name="Onboarding"
              options={{ headerShown: false }}
              component={OnboardingScreen}
            />
            <Stack.Screen
              name="LanguageScreen"
              component={LanguageScreen}
              options={{
                headerShown: false,
                headerTitle: "AiSense",
              }}
            />
            <Stack.Screen
              name="consent"
              component={ConsentScreen}
              options={{
                headerShown: false,
                headerTitle: "AiSense",
              }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="menu"
              component={DraweMenu}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{
                headerShown: true,
              }}
            />

            <Stack.Screen
              name="ResetPass"
              component={ResetPass}
              options={{
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{
                headerShown: true,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </>
    );
  } else {
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: true, // Show the header
              headerTransparent: true, // Make the header transparent
              headerTintColor: "#000", // Color of header elements
              headerTitle: "AiSense", // Hide the title
              headerTitleStyle: {
                fontSize: 25, // Customize the font size if needed
                fontWeight: "600", // Customize the font weight if needed
              },
              headerTitleAlign: "center",
              // headerLeft: () => <CustomMenuIcon />, // Custom menu icon
            }}
          >
            <Stack.Screen
              name="menu"
              component={DraweMenu}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Onboarding"
              options={{ headerShown: false }}
              component={OnboardingScreen}
            />
            <Stack.Screen
              name="LanguageScreen"
              component={LanguageScreen}
              options={{
                headerShown: false,
                headerTitle: "AiSense",
              }}
            />
            <Stack.Screen
              name="consent"
              component={ConsentScreen}
              options={{
                headerShown: false,
                headerTitle: "AiSense",
              }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{
                headerShown: true,
              }}
            />

            <Stack.Screen
              name="ResetPass"
              component={ResetPass}
              options={{
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{
                headerShown: true,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </>
    );
  }
}

// **********************************************************************************
// if (showOnboarding) {
//   return (
//     <>
//       <NavigationContainer>
//         <Stack.Navigator
//           screenOptions={{
//             headerShown: true, // Show the header
//             headerTransparent: true, // Make the header transparent
//             headerTintColor: "#000", // Color of header elements
//             headerTitle: "AiSense", // Hide the title
//             headerTitleStyle: {
//               fontSize: 25, // Customize the font size if needed
//               fontWeight: "600", // Customize the font weight if needed
//             },
//             headerTitleAlign: "center",
//             // headerLeft: () => <CustomMenuIcon />, // Custom menu icon
//           }}
//         >
//           <Stack.Screen
//             name="Onboarding"
//             options={{ headerShown: false }}
//             component={OnboardingScreen}
//           />
//           <Stack.Screen
//             name="LanguageScreen"
//             component={LanguageScreen}
//             options={{
//               headerShown: false,
//               headerTitle: "AiSense",
//             }}
//           />
//           <Stack.Screen
//             name="consent"
//             component={ConsentScreen}
//             options={{
//               headerShown: false,
//               headerTitle: "AiSense",
//             }}
//           />
//           <Stack.Screen
//             name="Register"
//             component={Register}
//             options={{
//               headerShown: false,
//             }}
//           />

//           <Stack.Screen
//             name="SignIn"
//             component={SignIn}
//             options={{
//               headerShown: true,
//             }}
//           />
//             <Stack.Screen
//             name="menu"
//             component={DraweMenu}
//             options={{
//               headerShown: false,
//             }}
//           />

//           <Stack.Screen
//             name="ResetPass"
//             component={ResetPass}
//             options={{
//               headerShown: true,
//             }}
//           />
//           <Stack.Screen
//             name="SignUp"
//             component={SignUp}
//             options={{
//               headerShown: true,
//             }}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//       <Toast />
//     </>
//   );
// }
// else if(isLoggedIn){
//   return (
//     <>
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen
//             name="menu"
//             component={DraweMenu}
//             options={{
//               headerShown: false,
//             }}
//           />

//         </Stack.Navigator>
//       </NavigationContainer>
//       <Toast />
//     </>
//   );
// }
// else {
//   return (
//     <>
//       <NavigationContainer>
//       <Stack.Navigator

//           screenOptions={{
//             headerShown: true, // Show the header
//             headerTransparent: true, // Make the header transparent
//             headerTintColor: "#000", // Color of header elements
//             headerTitle: "AiSense", // Hide the title
//             headerTitleStyle: {
//               fontSize: 25, // Customize the font size if needed
//               fontWeight: "600", // Customize the font weight if needed
//             },
//             headerTitleAlign: "center",

//             // headerLeft: () => <CustomMenuIcon />, // Custom menu icon
//           }}
//         >
//           <Stack.Screen
//             name="Onboarding"
//             options={{ headerShown: false }}
//             component={OnboardingScreen}
//           />
//            <Stack.Screen
//             name="LanguageScreen"
//             component={LanguageScreen}
//             options={{
//               headerShown: false,

//             }}
//           />
//           <Stack.Screen
//             name="consent"
//             component={ConsentScreen}
//             options={{
//               headerShown: false,
//             }}
//           />
//           <Stack.Screen
//             name="Register"
//             component={Register}
//             options={{
//               headerShown: false,
//             }}
//           />
//           <Stack.Screen
//             name="SignIn"
//             component={SignIn}
//             options={{
//               headerShown: true,
//             }}
//           />
//           <Stack.Screen
//             name="menu"
//             component={DraweMenu}
//             options={{
//               headerShown: false,
//             }}
//           />

//           <Stack.Screen
//             name="ResetPass"
//             component={ResetPass}
//             options={{
//               headerShown: true,
//             }}
//           />
//           <Stack.Screen
//             name="SignUp"
//             component={SignUp}
//             options={{
//               headerShown: true,
//             }}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//       <Toast />
//     </>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
