import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_KEY } from "@env";
import { IconButton } from "react-native-paper";
import LottieView from "lottie-react-native";
import { mapstyleretro } from "../functions/mapstyles";

export const TerminalScreen = ({ navigation }) => {
  const rutas = navigation.getParam("rutas");
  const item = navigation.getParam("item");
  const setDest = navigation.getParam("setDest");
  const setRuta = navigation.getParam("setRuta");
  const coordDest = {
    longitude: item.coordenadas_destino.longitud,
    latitude: item.coordenadas_destino.latitud,
  };
  const coordOrig = {
    longitude: item.coordenadas.longitud,
    latitude: item.coordenadas.latitud,
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>{item.nombre}</Text>
      </View>
      <View style={styles.botones}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => navigation.navigate("inicio")}
        >
          <Text style={styles.textIr}>Regresar</Text>
          <IconButton
            icon="arrow-left-circle"
            color="#E66536"
            size={35}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => {
            setDest(coordOrig);
            setRuta(true);
            navigation.navigate("inicio");
          }}
        >
          <Text style={styles.textIr}>Ir a terminal</Text>
          <IconButton
            icon="map-marker-path"
            color="#E66536"
            size={35}
          />
        </TouchableOpacity>
      </View>

      <MapView
        customMapStyle={mapstyleretro}
        userInterfaceStyle={"dark"}
        style={styles.mapa}
        initialRegion={{
          longitude: item.coordenadas.longitud,
          latitude: item.coordenadas.latitud,
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={coordOrig} image={require("../assets/autobus2.png")}/>
        <Marker coordinate={coordDest} image={require("../assets/fin.png")} />
        <MapViewDirections
          origin={coordOrig}
          destination={coordDest}
          apikey={GOOGLE_MAPS_KEY}
          strokeColor={"#E66536"}
          strokeWidth={10}
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
              
            />
          );
        })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  mapa: {
    alignSelf: "center",
    width: "93%",
    height: "30%",
    bottom: -190,
    borderRadius: 20,
  },
  textIr: {
    margin: 0,
    fontSize: 16,
    bottom: -22,
    right: -10,
    color: "#E66536",
    fontWeight: "bold",
  },
  touchable: {
    flexDirection: "row",
    backgroundColor: "rgba(230,101,54,0.2)",
    borderRadius: 15,
    padding: 0,
  },
  botones: {
    width: "93%",
    flexDirection: "row",
    bottom: -180,
    alignSelf: "center",
    justifyContent: "space-between",
  },
});
