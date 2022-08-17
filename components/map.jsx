import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_KEY } from "@env";
import LottieView from "lottie-react-native";

export const Maps = ({ origin, setOrigin, destination, setDestination }) => {
  return (
    <MapView
      style={styles.mapa}
      initialRegion={{
        latitude: origin.latitude,
        longitude: origin.longitude,
        longitudeDelta: 0.04,
        latitudeDelta: 0.04,
      }}
    >
      <Marker
        coordinate={origin}
        draggable
        onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)}
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
      <MapViewDirections
        origin={origin}
        destination={destination}
        apikey={GOOGLE_MAPS_KEY}
        strokeColor={"rgba(0,0,0,0.5)"}
        strokeWidth={8}
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  mapa: {
    width: "100%",
    height: "100%",
  },
});
