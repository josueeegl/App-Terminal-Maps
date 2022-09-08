import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_KEY } from "@env";
import { IconButton } from "react-native-paper";

export const TerminalScreen = ({ navigation }) => {
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
            color="#01A2FD"
            size={45}
            style={{ padding: 0, margin: 0 }}
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
          <Text style={styles.textIr}>Ver</Text>
          <IconButton
            icon="map-marker-path"
            color="#01A2FD"
            size={45}
            style={{ padding: 0, margin: 0 }}
          />
        </TouchableOpacity>
      </View>

      <MapView
        style={styles.mapa}
        initialRegion={{
          longitude: item.coordenadas.longitud,
          latitude: item.coordenadas.latitud,
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={coordOrig}
        />
        <Marker
          coordinate={coordDest}
        
        />
        <MapViewDirections
          origin={coordOrig}
          destination={coordDest}
          apikey={GOOGLE_MAPS_KEY}
          strokeColor={"#01A2FD"}
          strokeWidth={8}
          
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  mapa: {
    alignSelf: "center",
    width: "93%",
    height: "30%",
    bottom: -190,
    borderRadius: 15,
  },
  textIr: {
    margin: 0,
    fontSize: 18,
    bottom: -22,
    right: -10,
    color: "#01A2FD",
    fontWeight: "bold",
  },
  touchable: {
    flexDirection: "row",
    backgroundColor: "#D6EAF8",
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
