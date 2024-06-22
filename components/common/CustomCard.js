import React from "react";
import { View, Text ,Dimensions ,StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
const { width, height } = Dimensions.get("window");

function CustomCard({ title, description, lottieFile }) {
  return (

    <>
    <View style={styles.container}>
    <View>
      <LottieView
        source={lottieFile}
        autoPlay
        loop
        style={styles.img} // Adjust the size as needed
      />
      <View style={styles.Text}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{title}</Text>
      <Text>{description}</Text>
      </View>
    </View>
    </View>
    </>
   
  );
}

export default CustomCard;

const styles = StyleSheet.create({
  container:
  {
    borderRadius: 40,
    backgroundColor: '#fff',
    height:  height,
    width: width*0.98 ,
    flex:1,
    justifyContent: 'center',
    alignItems:'center',
    alignContent:'center',
    borderWidth:3,
    borderColor:'#08c47f',

  },
  img:{
    height: 200,
    width: 200,
  },
  Text:{
      alignItems:"center",  
  }
});
