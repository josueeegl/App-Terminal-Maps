import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import LottieView from "lottie-react-native";

export default () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <LottieView
        source={require("../assets/loading3.json")}
        autoPlay
        loop
        style={{ width: 100, height: 100 }}
      />
      <Text style={styles.text}>Obteniendo tu ubicación...</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    zIndex: 1,
  },
  text: {
    size: 36,
    color: "#4C4C4C",
    fontWeight:"bold"
  }
});
