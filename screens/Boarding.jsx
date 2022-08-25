import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { Searching, Maps, ModalDirections } from "../components";

export const BoardinScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Holaa</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
