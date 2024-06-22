import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  ScrollView,
} from "react-native";
import { Card } from "react-native-elements";
import { firebase } from "../components/FirebaseConfig";
import { getSession } from "../utils/asyncStorage";
import * as Print from "expo-print";
const ResultScreen = ({ route }) => {


  const { dataOutput ,invoiceNo } = route.params ;
  // console.log("prop",dataOutput);
  const [userDetails, setUserDetails] = useState("");
  const [resultData, setResultData] = useState();

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
              setResultData(dataOutput);
            });
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userDetails]);

 


  const invoiceData = {
    invoiceNumber: invoiceNo,
    
    

    items: [
      {
        id: 1,
        description: "Covid19 & TB",
        quantity: dataOutput.covid19_tb,
      },
      {
        id: 2,
        description: "Diabetes ",
        quantity: dataOutput.diabetes,
      },
      {
        id: 3,
        description: "AML  ",
        quantity: dataOutput.aml,
      },
      {
        id: 4,
        description: "Mental Health",
        quantity: dataOutput.mental_health,
      },
      {
        id: 5,
        description: "Cold & Cough2 ",
        quantity: dataOutput.cold_cough2,
      },
      {
        id: 6,
        description: "cardiac_health",
        quantity: dataOutput.cardiac_health,
      },
    ],
  };

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date().toLocaleDateString("en-US", {
        timeZone: "Asia/Kolkata", // Set the time zone to India
      });
      setCurrentDate(currentDate);
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const { invoiceNumber, items } =
    invoiceData;


    const handlePrint = async () => {
      try {
        const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Result Screen</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #fff;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
            }
            .card {
              border-radius: 5px;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
              background-color: #fff;
              padding: 20px;
              margin-bottom: 20px;
            }
            .logo {
              width: 50px;
              height: 50px;
              margin-right: 10px;
            }
            .header {
              display: flex;
              align-items: center;
              border-bottom: 1px solid #ccc;
              padding-bottom: 10px;
              margin-bottom: 20px;
            }
            .headerText {
              font-size: 20px;
              font-weight: bold;
            }
            .body {
              padding-top: 20px;
            }
            .clientInfo {
              display: flex;
              margin-bottom: 20px;
            }
            .label {
              font-size: 16px;
              font-weight: bold;
              margin-right: 5px;
            }
            .value {
              font-size: 16px;
            }
            .itemsContainer {
              margin-bottom: 20px;
            }
            .itemsHeader {
              font-size: 16px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .itemRow {
              display: flex;
              padding: 10px 0;
            }
            .itemDescription {
              flex: 1;
              font-size: 14px;
            }
            .itemQuantity {
              width: 160px;
              font-size: 13px;
              text-align: center;
            }
            .actions {
              display: flex;
              justify-content: flex-end;
              margin-top: 20px;
            }
            .button {
              margin-left: 10px;
            }
            .asach{
              margin-left:15rem;
              flex-direction: column;
              justify-content: flex-end;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="card">
              <div class="header">
                <img class="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqjm8RZqhCE5woLA5pRb9g_ipuxkyfZnZadA&usqp=CAU" alt="Logo">
                <div class="main">
                  <h1 class="headerText">RESULT</h1>
                  <div class="body">
                    <div class="asach">
                   <p class="htest">Patient Receipt No. </p>
                    <p class="htestvalue">${invoiceNumber}</p>
                    <p class="htest">Receipt Date:</p>
                    <p class="htestvalue">${currentDate}</p>
                    </div>
                  </div>
                </div>
              </div>
        
              <div class="clientInfo">
                <div class="clientText">
                  <p class="label">Patient:</p>
                  <p class="value">${userDetails.name}</p>
                  <p class="value">${userDetails.email}</p>
                  <p class="value">${userDetails.phone}</p>
                  <p class="value">${userDetails.address}</p>
                </div>
              </div>
        
              <div class="itemsContainer">
                <h2 class="itemsHeader">Scored Probability of Diseases:</h2>
                <!-- Items loop -->
                <div class="itemRow">
                  <p class="itemDescription">${items[0].description} :- </p>
                  <p class="itemQuantity">${items[0].quantity}</p>
                </div>

                <div class="itemRow">
                  <p class="itemDescription">${items[1].description} :- </p>
                  <p class="itemQuantity">${items[1].quantity}</p>
                </div>
                <div class="itemRow">
                  <p class="itemDescription">${items[2].description} :- </p>
                  <p class="itemQuantity">${items[2].quantity}</p>
                </div>
                <div class="itemRow">
                  <p class="itemDescription">${items[3].description} :- </p>
                  <p class="itemQuantity">${items[3].quantity}</p>
                </div>
                <div class="itemRow">
                  <p class="itemDescription">${items[4].description} :- </p>
                  <p class="itemQuantity">${items[4].quantity}</p>
                </div>
                <div class="itemRow">
                  <p class="itemDescription">${items[5].description} :- </p>
                  <p class="itemQuantity">${items[5].quantity}</p>
                </div>

              </div>
        
              <div class="actions">
                <button class="button">Save</button>
              </div>
            </div>
          </div>
        </body>
        </html>
        
        `;
        await Print.printAsync({ html: htmlContent });
      } catch (error) {
        console.error("Error printing:", error);
      }
    };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/bgAI.jpg")}
        style={styles.backgroundImage}
      />
      <Card containerStyle={styles.card}>
        <ScrollView>
          <View style={styles.header}>
            <Image
              style={styles.logo}
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqjm8RZqhCE5woLA5pRb9g_ipuxkyfZnZadA&usqp=CAU",
              }}
            />
            <View style={styles.main}>
              <Text style={styles.headerText}>RESULT</Text>
              <View style={styles.body}>
                <Text style={styles.htest}>Patient Receipt No. </Text>
                <Text style={styles.htestvalue}>{invoiceNumber}</Text>
                <Text style={styles.htest}>Receipt Date:</Text>
                <Text style={styles.htestvalue}>{currentDate}</Text>
              </View>
            </View>
          </View>

          <View style={styles.clientInfo}>
            <View style={styles.clientText}>
              <Text style={styles.label}>Patient:</Text>
              <Text style={styles.value}>{userDetails.name}</Text>
              <Text style={styles.value}>{userDetails.email}</Text>
              <Text style={styles.value}>{userDetails.phone}</Text>
              <Text style={styles.value}>{userDetails.address}</Text>
            </View>
          </View>

          <View style={styles.itemsContainer}>
            <Text style={styles.itemsHeader}>
              Scored Probobility of Diseases:
            </Text>
            {items.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <View
                  key={item.id}
                  style={[
                    styles.itemRow,
                    isEven ? styles.itemRowEven : styles.itemRowOdd,
                  ]}
                >
                  <Text style={styles.itemDescription}>
                    {item.description} :-{" "}
                  </Text>
                  <Text style={styles.itemQuantity}>{item.quantity}</Text>
                  {/* <Text style={styles.itemPrice}>{item.price}</Text> */}
                </View>
              );
            })}
          </View>

          <View style={styles.actions}>
            {/* <Button
              style={styles.button}
              title="Share"
              onPress={() => console.log("Share")}
            /> */}
            <View style={{ margin: 2 }}></View>
            <Button
              style={styles.button}
              title="Print"
              onPress={handlePrint}
            />
          </View>
        </ScrollView>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    backgroundColor: "transparent",
  },
  main: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  card: {
    borderRadius: 1,
    padding: 13,
    elevation: 3,
    backgroundColor: "#fff",
    marginTop: "25%",
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
  },
  htest: {
    fontSize: 12,
    fontWeight: "bold",
  },
  htestvalue: {
    fontSize: 12,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  body: {
    paddingTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
  },
  itemsContainer: {
    paddingTop: 20,
  },
  itemsHeader: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemRow: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  itemRowEven: {
    backgroundColor: "#eee",
  },
  itemRowOdd: {
    backgroundColor: "#fff",
  },
  itemDescription: {
    flex: 1,
    fontSize: 14,
  },
  itemQuantity: {
    width: 160,
    fontSize: 13,
    textAlign: "center",
  },
  itemPrice: {
    width: 100,
    fontSize: 16,
    textAlign: "right",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: 20,
    margin: 2,
  },
  button: {
    marginLeft: 10,
  },
  clientInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
  },
  clientLogo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  clientText: {
    flex: 1,
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

export default ResultScreen;
