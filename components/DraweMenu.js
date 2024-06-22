import {
  View,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  Pressable,
  Image,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import Home from "./Home";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome6 } from '@expo/vector-icons';
import {
  createDrawerNavigator,
  DrawerContent,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import RecordVoice from "./RecordVoice";
import { useNavigation } from "@react-navigation/native";
import ReportScreen from "./ReportScreen";
import VolunteerPatientData from "./VolunteerPatientData";
import ProfilePage from "./ProfilePage";
import { getSession } from "../utils/asyncStorage";
import LogoutModal from "../components/common/LogoutModal";

// import firebase from "firebase/compat/app";
import { firebase } from "../components/FirebaseConfig";
import HandleLogout from "./HandleLogout";
import OnboardingScreen from "./OnboardingScreen";
import ResultScreen from "./ResultScreen";
const Drawer = createDrawerNavigator();

const CustomMenuIcon = () => {
  const navigation = useNavigation();
  const [icon, seticon] = useState(false);

  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <TouchableWithoutFeedback onPress={openDrawer}>
      <View style={styles.menubox}>
        <View style={styles.menu}>
          {/* Your custom menu icon */}
          <Ionicons name={"ios-menu-sharp"} size={24} color="#000" />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const CustomProFileIcon = ({ userData }) => {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={()=>{navigation.navigate("ProfilePage")}}>
      <View style={styles.menubox1}>
        <View style={styles.menu1}>
          <Image
            source={{
              uri:
                userData.avatar ||
                "https://bootdey.com/img/Content/avatar/avatar6.png",
            }}
            style={styles.profileImage1}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};


const CustomDrawerContent = ({ userData, ...props }) => {
  return (
    <DrawerContentScrollView {...props}>
      {/* User details */}
      <TouchableWithoutFeedback onPress={() => console.log("Profile clicked")}>
        <View style={styles.userDetailsContainer}>
          <Image
            source={{
              uri:
                userData.avatar ||
                "https://bootdey.com/img/Content/avatar/avatar6.png",
            }} // Replace with the actual image source
            style={styles.profileImage}
          />
          <Text style={{ marginTop: 10 }}>
            <Text style={styles.username}>{userData.name}</Text>
            {"\n"}
            <Text style={styles.userEmail}>{userData.email}</Text>{" "}
          </Text>
        </View>
      </TouchableWithoutFeedback>

      {/* Drawer items */}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const DrawerMenu = () => {
  const [userDetails, setUserDetails] = useState("");
 


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const uid = await getSession("userId");
        // console.log("current userId is ",uid);
        if (uid) {
          const userRef = firebase
            .firestore()
            .collection("UserData")
            .where("uid", "==", uid);

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

  return (
    <>
      <Drawer.Navigator
        drawerContent={(props) => (
          <CustomDrawerContent userData={userDetails} {...props} />
        )}
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
          headerLeft: () => <CustomMenuIcon />, // Custom menu icon
        }}
      >
        <Drawer.Screen
          name="Home"
          component={Home}
          options={({ navigation, props }) => ({
            drawerLabel: ({ focused }) => (
              <>
                <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                  <Ionicons
                    name={"ios-home"}
                    size={20}
                    color="#08c47f"
                    style={{ marginRight: 15 }}
                  />
                  <Text style={{ color: focused ? "#08c47f" : "black" }}>
                    Home
                  </Text>
                </View>
              </>
            ),
            headerRight: () => (
              <CustomProFileIcon userData={userDetails} navigation={navigation} />
             
            ),
          })}
        />
        <Drawer.Screen
          name="Record"
          component={RecordVoice}
          options={({ navigation }) => ({
            drawerLabel: ({ focused }) => (
              <>
                <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                  <Ionicons
                    name={"ios-mic-sharp"}
                    size={20}
                    color="#08c47f"
                    style={{ marginRight: 15 }}
                  />
                  <Text style={{ color: focused ? "#08c47f" : "black" }}>
                    Record
                  </Text>
                </View>
              </>
            ),
            headerRight: () => (
              <Pressable style={styles.righticonbox}>
                <Ionicons
                  name={"ios-home"}
                  size={22}
                  color="#000"
                  onPress={() => {
                    navigation.navigate("Home");
                  }}
                />
              </Pressable>
            ),
          })}
        />
       
        <Drawer.Screen
          name="Tuberculosis Report"
          component={ReportScreen}
          options={({ navigation }) => ({
            drawerLabel: ({ focused }) => (
              <>
                <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                  <Ionicons
                    name={"ios-bar-chart"}
                    size={20}
                    color="#08c47f"
                    style={{ marginRight: 15 }}
                  />
                  <Text style={{ color: focused ? "#08c47f" : "black" }}>
                    Report
                  </Text>
                </View>
              </>
            ),
            headerRight: () => (
              <View style={styles.righticonbox}>
                <Ionicons
                  name={"ios-home"}
                  size={22}
                  color="#000"
                  onPress={() => {
                    navigation.navigate("Home");
                  }}
                />
              </View>
            ),
          })}
        />
        <Drawer.Screen
          name="VolunteerPatientData"
          component={VolunteerPatientData}
          options={({ navigation }) => ({
            drawerLabel: ({ focused }) => (
              <>
                <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                  <Ionicons
                    name={"ios-document"}
                    size={20}
                    color="#08c47f"
                    style={{ marginRight: 15 }}
                  />
                  <Text style={{ color: focused ? "#08c47f" : "black" }}>
                    Volunteer Patient Data
                  </Text>
                </View>
              </>
            ),
            headerRight: () => (
              <View style={styles.righticonbox}>
                <Ionicons
                  name={"ios-home"}
                  size={22}
                  color="#000"
                  onPress={() => navigation.navigate("Home")} // Navigate to Record screen
                />
              </View>
            ),
          })}
        />
        <Drawer.Screen
          name="ProfilePage"
          component={ProfilePage}
          options={({ navigation }) => ({
            drawerLabel: ({ focused }) => (
              <>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FontAwesome
                    name={"user-circle-o"}
                    size={22}
                    color="#08c47f"
                    style={{ marginRight: 15 }}
                    onPress={() => navigation.navigate("ProfilePage")}
                  />
                  <Text style={{ color: focused ? "#08c47f" : "black" }}>
                    Update Profile
                  </Text>
                </View>
              </>
            ),
            headerRight: () => (
              <View style={styles.righticonbox}>
                <Ionicons
                  name={"ios-home"}
                  size={22}
                  color="#000"
                  onPress={() => navigation.navigate("Home")} // Navigate to Record screen
                />
              </View>
            ),
          })}
        />
        <Drawer.Screen
          name="HandleLogout"
          component={HandleLogout}
          options={({ navigation }) => ({
            drawerLabel: ({ focused }) => (
              <>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons
                    name={"ios-log-out"}
                    size={24}
                    color="#08c47f"
                    style={{ marginRight: 15 }}
                  />
                  <Text style={{ color: focused ? "#08c47f" : "black" }}>
                    Log Out
                  </Text>
                </View>
              </>
            ),
          })}
          // component={}
        />
         <Drawer.Screen
          name="Result"
          component={ResultScreen}
          
          options={({ navigation  }) => ({
            drawerLabel: ({ focused }) => (
              <>
                {/* <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                  <Ionicons
                    name={"ios-receipt-sharp"}
                    size={20}
                    color="#08c47f"
                    style={{ marginRight: 15 }}
                  />
                  <Text style={{ color: focused ? "#08c47f" : "black" }}>
                    Result 
                  </Text>
                </View> */}
              </>
            ),
            headerRight: () => (
              <View style={styles.righticonbox}>
                <Ionicons
                  name={"ios-home"}
                  size={22}
                  color="#000"
                  onPress={() => {
                    navigation.navigate("Home");
                  }}
                />
              </View>
            ),
            drawerLockMode: 'locked-closed',
          })}
        />
        {/* ********************************* */}
     
        
      </Drawer.Navigator>
     
    </>
  );
};

export default DrawerMenu;

const styles = StyleSheet.create({
  menubox: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 5,
    elevation: 8,
    marginLeft: 10,
  },
  menubox1: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 2,
    elevation: 8,
    marginRight: 5,
  },
  righticonbox: {
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 5,
    elevation: 8,
    marginRight: 10,
  },
  rightIcon: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 100,
  },
  userDetailsContainer: {
    backgroundColor: "#90e0c3", // Customize the background color
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#fff",
  },
  profileImage1: {
    width: 30,
    height: 30,
    borderRadius:30,
    borderColor: "#fff",
  },
  username: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  userEmail: {
    marginTop: 10,
    fontSize: 14,
    color: "#000",
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  drawerItemText: {
    marginLeft: 15,
    fontSize: 16,
    color: "#000",
  },
});
