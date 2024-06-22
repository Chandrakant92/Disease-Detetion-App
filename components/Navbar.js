import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const Navbar = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: "#fff" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          marginVertical: "5%",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 25, fontWeight: "bold", marginRight: "4%" }}>
            AiSense
          </Text>
        </View>

        <Ionicons name="menu" size={35} color="black" />
      </View>
      <View style={{ borderWidth: 2, borderColor: "#129bad" }}></View>
    </View>
  );
};

export default Navbar;
