import React, { useEffect } from "react";
import { ActivityIndicator, View, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import * as local from "expo-location";

export const AuthLoading = ({ navigation }) => {
  useEffect(() => {
    getLocation();
    const timer = setTimeout(() => {}, 3000);
    return () => clearTimeout(timer);
  }, []);

  const getLocation = async () => {
    local.requestForegroundPermissionsAsync().then(({ status }) => {
      console.log(status)
      if (status.toUpperCase() === "DENIED") {
        navigation.navigate("OnBoarding");
      } else {
        local.getCurrentPositionAsync().then((location) => {
          navigation.navigate("Root");
          AsyncStorage.setItem("longitude", location.coords.longitude.toString());
          AsyncStorage.setItem("latitude", location.coords.latitude.toString());
        });
      }
    });
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <LottieView
        source={require("../assets/loading3.json")}
        autoPlay
        loop
        style={{ width: 100, height: 100 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
