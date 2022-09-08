import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { obtener, LocationUser } from "../functions/location";
import { Searching, Maps, Loading } from "../components";
import { IconButton } from "react-native-paper";
import useFetch from "../hooks/useFetch";
import { DOMINIO } from "@env";

export const HomeScreen = ({ navigation }) => {
  const [visibility, setVisibility] = useState(false);
  const [ruta, setRuta] = useState(false);
  const [loader, setLoader] = useState(false);
  const [Data, setData] = useState([]);
  const [UserLocation, setUserLocation] = useState({
    latitude: 14.252588,
    longitude: -89.873671,
  });

  const [region, setRegion] = useState({
    latitude: 14.292588,
    longitude: -89.893671,
    longitudeDelta: 0.03,
    latitudeDelta: 0.03,
  });
  useEffect(() => {
    obtener(setUserLocation);
    useFetch(DOMINIO, setLoader, setData);
  }, []);

  return (
    <View style={styles.container}>
      <Searching
        data={Data}
        visibility={visibility}
        setVisibility={setVisibility}
        navigation={navigation}
      />
      <Maps
        data={Data}
        setRegion={setRegion}
        region={region}
        UserLocation={UserLocation}
        navigation={navigation}
        ruta={ruta}
        setRuta={setRuta}
      />
      <IconButton
        icon="map-marker-account"
        color="#E64A19"
        size={60}
        style={{ position: "absolute", right: -5, bottom: 10 }}
        onPress={() => {
          setLoader(true);
          LocationUser(setUserLocation, UserLocation, setRegion, setLoader);
        }}
      />
      {ruta ? (
        <IconButton
          icon="map-marker-off"
          color="#01A2FD"
          size={60}
          style={{ position: "absolute", right: 50, bottom: 10 }}
          onPress={() => setRuta(false)}
        />
      ) : null}
      {loader ? <Loading /> : null}
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
