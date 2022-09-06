import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { obtener } from "../functions/location";
import { Searching, Maps, ModalDirections } from "../components";
import { IconButton } from "react-native-paper";
import * as local from "expo-location";

export const HomeScreen = ({ navigation }) => {
  const [visibility, setVisibility] = useState(false);
  const [origin, setOrigin] = useState({
    latitude: 14.252588,
      longitude: -89.873671,
      longitudeDelta: 0.05,
      latitudeDelta: 0.05,
  });
  const [destination, setDestination] = useState({
    latitude: 14.292588,
    longitude: -89.893671,
  });
  const [region, setRegion] = useState({
    latitude: 14.292588,
    longitude: -89.893671,
    longitudeDelta: 0.05,
    latitudeDelta: 0.05,
  });
  useEffect(() => {
    obtener(setOrigin);
  }, []);

  const data = [
    {
      terminal: "Progreso",
      latitude: 14.293933,
      longitude: -89.90136,
    },
    {
      terminal: "Jalpatagua",
      latitude: 14.291504,
      longitude: -89.899793,
    },
    {
      terminal: "Quesada",
      latitude: 14.291772,
      longitude: -89.89932,
    },
  ];
  return (
    <View style={styles.container}>
      <Searching
        data={data}
        visibility={visibility}
        setVisibility={setVisibility}
      />
      <Maps
        setRegion={setRegion}
        region={region}
        origin={origin}
        destination={destination}
        setDestination={setDestination}
      />
      <ModalDirections visibility={visibility} setVisibility={setVisibility} />
      <IconButton
        icon="map-marker-account"
        color="#E64A19"
        size={60}
        style={{ position: "absolute", right: -5, bottom: 10 }}
        onPress={() => {
          setRegion(origin);
        }}
      />
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
