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
      <View
        style={{
          width: "93%",
          borderBottomWidth: 1,
          borderColor: "rgba(0,0,0,0.5)",
          marginTop: 20,
        }}
      >
        <Text style={styles.title}>{item.nombre}</Text>
        <Text style={{ opacity: 0.5, fontWeight: "bold" }}>Terminal</Text>
      </View>
      <View style={{ width: "93%", marginTop: 20 }}>
        <Text style={styles.etiqueta}>Horario regular de operación</Text>
        <Text style={styles.etiqueta2}>{item.horario}</Text>
        <Text style={styles.etiqueta}>Frecuencia de salida</Text>
        <Text style={styles.etiqueta2}>{item.intervalo}</Text>
      </View>
      <View
        style={{
          width: "93%",
          marginTop: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 50,
        }}
      >
        <View style={{ top: 20 }}>
          <Text style={styles.etiqueta}>Salida</Text>
          <Text style={styles.etiqueta2}>{item.nombre}</Text>
        </View>
        <LottieView
          source={require("../assets/viaje2.json")}
          autoPlay
          loop
          style={{ width: 100 }}
        />
        <View style={{ top: 20 }}>
          <Text style={styles.etiqueta}>Destino final</Text>
          <Text style={styles.etiqueta2}>{item.destino_final}</Text>
        </View>
      </View>

      <MapView
        customMapStyle={mapstyleretro}
        userInterfaceStyle={"dark"}
        style={styles.mapa}
        initialRegion={{
          longitude: item.coordenadas.longitud,
          latitude: item.coordenadas.latitud,
          longitudeDelta: 0.05,
          latitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={coordOrig}
          image={require("../assets/autobus4.png")}
        />
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
      <View style={styles.botones}>
        <IconButton
          icon="arrow-left-box"
          color="#E66536"
          size={45}
          onPress={() => navigation.navigate("inicio")}
        />
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => {
            setDest(coordOrig);
            setRuta(true);
            navigation.navigate("inicio");
          }}
        >
          <Text style={styles.textIr}>Ir a terminal</Text>
          <IconButton icon="map-marker-path" color="#E66536" size={35} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
    alignItems: "center",
  },
  mapa: {
    width: "93%",
    height: "30%",
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
    height: "80%",
  },
  botones: {
    width: "93%",
    flexDirection: "row",
    margin: 10,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    color: "#E66536",
    fontSize: 34,
    fontWeight: "bold",
  },
  etiqueta: {
    color: "black",
    fontSize: 10,
    opacity: 0.5,
    fontWeight: "bold",
  },
  etiqueta2: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 15,
  },
});
