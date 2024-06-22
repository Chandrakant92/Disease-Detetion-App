import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log("value is store", key, value);
  } catch (error) {
    console.log("Error storing value: ", error);
  }
};

export const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.log("Error retrieving value: ", error);
  }
};

export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("Error deleting value: ", error);
  }
};

//login sesssion stored 

export const setSession = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log("UID is store", key, value);
  } catch (error) {
    console.log("Error storing : ", error);
  }
};

export const getSession = async (uid) => {
  try {
    const value = await AsyncStorage.getItem(uid);
    return value;
  } catch (error) {
    console.log("Error retrieving value: ", error);
  }
};
// export const getSession = (key) => {
//   return new Promise((resolve, reject) => {
//     AsyncStorage.getItem(key)
//       .then((value) => {
//         resolve(value);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };

export const removeSession= async (uid) => {
  try {
    await AsyncStorage.removeItem(uid);
  } catch (error) {
    console.log("Error deleting value: ", error);
  }
};
