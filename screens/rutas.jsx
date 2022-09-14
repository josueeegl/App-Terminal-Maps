import * as React from "react";
import { StyleSheet, Text, View, Appearance, Image } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_KEY } from "@env";
import { IconButton } from "react-native-paper";
import LottieView from "lottie-react-native";
import { points } from "../functions/location";
import {
  mapstyle,
  mapstyleNight,
  mapstyleretro,
  MapGrey,
} from "../functions/mapstyles";

export const MapRuta = ({ navigation }) => {
  const item = navigation.getParam("item");
  const coordDest = navigation.getParam("coordDest");
  const coordOrig = navigation.getParam("coordOrig");
  const rutas = navigation.getParam("rutas");
  return (
    <View>
      <MapView
        customMapStyle={MapGrey}
        style={styles.mapa}
        initialRegion={{
          longitude: item.coordenadas.longitud,
          latitude: item.coordenadas.latitud,
          longitudeDelta: 0.05,
          latitudeDelta: 0.05,
        }}
        provider={"google"}
      >
        <Marker
          coordinate={coordOrig}
          image={require("../assets/autobus4.png")}
          title={item.nombre}
          description={"Terminal"}
        />
        <Marker
          coordinate={coordDest}
          image={require("../assets/fin.png")}
          title={item.destino_final}
          description={"Destino final"}
        />
        <MapViewDirections
          origin={coordOrig}
          destination={coordDest}
          apikey={GOOGLE_MAPS_KEY}
          strokeColor={"#4C4C4C"}
          strokeWidth={8}
          waypoints={rutas}
        />

        {rutas.map((item, index) => {
          return (
            <Marker
              coordinate={{
                longitude: item.longitude,
                latitude: item.latitude,
              }}
              key={index}
              image={require("../assets/bus-stop3.png")}
              title={item.nombre}
              description={"Parada - Recolección de pasajeros"}
            />
          );
        })}
      </MapView>

      <IconButton
        icon="arrow-left-circle"
        color="#4C4C4C"
        size={60}
        onPress={() => navigation.navigate("terminal")}
        style={{ position: "absolute", left: -5, top: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mapa: {
    width: "100%",
    height: "100%",
  },
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#fff",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#fff",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
  },
});
