import React, { useCallback, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import { IconButton } from "react-native-paper";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export const ModalDirections = ({ visibility, setVisibility }) => {
  return (
    <Modal
      onRequestClose={() => setVisibility(false)}
      animationType="slide"
      visible={visibility}
      transparent={true}
    >
      <View style={{backgroundColor: "black", width: "100%", height: "100%"}}></View>
    </Modal>
  );
};
