import * as React from "react";
import { StyleSheet, Text, View, Appearance } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_KEY } from "@env";
import LottieView from "lottie-react-native";
import { points } from "../functions/location";
import { mapstyle, mapstyleNight, mapstyleretro } from "../functions/mapstyles";

export const Maps = ({
  data,
  setRegion,
  region,
  UserLocation,
  navigation,
  ruta,
  setRuta,
  dest,
  setDest,
}) => {
  return (
    <MapView
      customMapStyle={
        Appearance.getColorScheme() === "dark" ? mapstyleNight : mapstyleretro
      }
      userInterfaceStyle={"dark"}
      rotateEnabled={true}
      style={styles.mapa}
      initialRegion={region}
      region={region}
    >
      <Marker
        coordinate={{
          latitude: UserLocation.latitude,
          longitude: UserLocation.longitude,
        }}
      >
        <LottieView
          autoPlay={true}
          source={require("../assets/icons/profile.json")}
          loop
          style={{ width: 30, height: 50 }}
        />
      </Marker>
      {data.map((item, index) => {
        const rutas = points(item.rutas);
        return (
          <Marker
            image={require("../assets/autobus4.png")}
            coordinate={{
              longitude: item.coordenadas.longitud,
              latitude: item.coordenadas.latitud,
            }}
            key={index}
            onPress={() => {
              navigation.navigate("terminal", {
                item: item,
                setRuta: setRuta,
                setDest: setDest,
                rutas: rutas,
              });
            }}
          />
        );
      })}
      {ruta ? (
        <MapViewDirections
          origin={UserLocation}
          destination={dest}
          apikey={GOOGLE_MAPS_KEY}
          strokeColor={"#E66536"}
          strokeWidth={10}
        />
      ) : null}
    </MapView>
  );
};

const styles = StyleSheet.create({
  mapa: {
    width: "100%",
    height: "100%",
  },
});
