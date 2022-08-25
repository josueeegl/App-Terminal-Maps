import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_KEY } from "@env";
import LottieView from "lottie-react-native";

export const Maps = ({
  origin,
  destination,
  setDestination,
  region,
  setRegion,
}) => {
  return (
    <MapView
      style={styles.mapa}
      onRegionChangeComplete={(x) => setRegion(x)}
      region={region}
    >
      <Marker
        coordinate={{ latitude: origin.latitude, longitude: origin.longitude }}
        draggable
      >
        <LottieView
          autoPlay={true}
          source={require("../assets/icons/profile.json")}
          loop
          style={{ width: 30, height: 50 }}
        />
      </Marker>
      <Marker
        coordinate={destination}
        draggable
        onDragEnd={(direction) =>
          setDestination(direction.nativeEvent.coordinate)
        }
      >
        <LottieView
          source={require("../assets/icons/bus.json")}
          autoPlay
          loop
          style={{ width: 70, height: 20 }}
        />
      </Marker>

      {/* <MapViewDirections
        origin={origin}
        destination={destination}
        apikey={GOOGLE_MAPS_KEY}
        strokeColor={"#01A2FD"}
        strokeWidth={8}
      /> */}
    </MapView>
  );
};

const styles = StyleSheet.create({
  mapa: {
    width: "100%",
    height: "100%",
  },
});
