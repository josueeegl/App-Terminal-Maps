import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import LottieView from "lottie-react-native";

export default () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <ActivityIndicator size={100} />
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
    size: 26,
    color: "#01A2FD",
    fontWeight:"bold"
  }
});
