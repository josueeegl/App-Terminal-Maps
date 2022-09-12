import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { obtener, LocationUser, points } from "../functions/location";
import { Searching, Maps, Loading } from "../components";
import { IconButton } from "react-native-paper";
import useFetch from "../hooks/useFetch";
import { DOMINIO } from "@env";

export const HomeScreen = ({ navigation }) => {
  const [dest, setDest] = React.useState({});
  const [visibility, setVisibility] = useState(false);
  const [ruta, setRuta] = useState(false);
  const [loader, setLoader] = useState(false);
  const [Data, setData] = useState([]);
  const [DataTime, setDataTime] = useState();
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
    useFetch(setLoader, setData);
  }, []);

  return (
    <View style={styles.container}>
      <Searching
        data={Data}
        visibility={visibility}
        setVisibility={setVisibility}
        navigation={navigation}
        setRuta={setRuta}
        setDest={setDest}
      />
      <Maps
        data={Data}
        setRegion={setRegion}
        region={region}
        UserLocation={UserLocation}
        navigation={navigation}
        ruta={ruta}
        setRuta={setRuta}
        dest={dest}
        setDest={setDest}
        setLoader={setLoader}
        setDataTime={setDataTime}
        DataTime={DataTime}
      />
      <IconButton
        icon="map-marker-account"
        color="#16A3B6"
        size={60}
        style={{ position: "absolute", right: -5, bottom: 10 }}
        onPress={() => {
          setLoader(true);
          LocationUser(setUserLocation, UserLocation, setRegion, setLoader);
        }}
      />
      {ruta && DataTime !== undefined ? (
        <>
          <Text
            style={{
              position: "absolute",
              right: 60,
              bottom: 10,
              color: "#4C4C4C",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {DataTime["rows"][0]["elements"][0].distance.text}
          </Text>
          <IconButton
            icon="map-marker-remove-variant"
            color="#4C4C4C"
            size={60}
            style={{ position: "absolute", right: 50, bottom: 10 }}
            onPress={() => setRuta(false)}
          />
        </>
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
