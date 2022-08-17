import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Searching, Maps } from "./components";

export default function App() {
  const [origin, setOrigin] = useState({
    latitude: 14.292146,
    longitude: -89.899463,
  });
  const [destination, setDestination] = useState({
    latitude: 14.292588,
    longitude: -89.893671,
  });

  const data = [
    {
      terminal: "Progreso",
      latitude: 14.293933,
      longitude: -89.901360
    },
    {
      terminal: "Jalpatagua",
      latitude: 14.291504,
      longitude: -89.899793
    },
    {
      terminal: "Quesada",
      latitude: 14.291772,
      longitude: -89.899320
    },
  ];
  return (
    <View style={styles.container}>
      <Searching data={data}/>
      <Maps
        origin={origin}
        setOrigin={setOrigin}
        destination={destination}
        setDestination={setDestination}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
