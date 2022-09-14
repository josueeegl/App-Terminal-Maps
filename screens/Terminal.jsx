import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_KEY } from "@env";
import { IconButton } from "react-native-paper";
import LottieView from "lottie-react-native";
import { mapstyleretro, MapGrey } from "../functions/mapstyles";

import { fetchTime } from "../hooks/fetchTime";

export const TerminalScreen = ({ navigation }) => {
  const [Data, setData] = React.useState();
  const rutas = navigation.getParam("rutas");
  const item = navigation.getParam("item");
  const setDest = navigation.getParam("setDest");
  const setRuta = navigation.getParam("setRuta");
  const setDataTime = navigation.getParam("setDataTime");
  const UserLocation = navigation.getParam("UserLocation");
  const coordDest = {
    longitude: item.coordenadas_destino.longitud,
    latitude: item.coordenadas_destino.latitud,
  };
  const coordOrig = {
    longitude: item.coordenadas.longitud,
    latitude: item.coordenadas.latitud,
  };
  const clickMap = () =>
    navigation.navigate("rutas", {
      item: item,
      rutas: rutas,
      coordDest: coordDest,
      coordOrig: coordOrig,
    });

  React.useEffect(() => {
    fetchTime(
      setData,
      `${coordOrig.latitude}, ${coordOrig.longitude}`,
      `${coordDest.latitude}, ${coordDest.longitude}`
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          width: "93%",
          marginTop: StatusBar.currentHeight+5,
          backgroundColor: "#4C4C4C",
          padding: 5,
          borderRadius: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={styles.title}>{item.nombre}</Text>
          <Text style={{ opacity: 0.8, fontWeight: "bold", color: "white" }}>
            Terminal
          </Text>
        </View>
        <IconButton
          icon="arrow-left-circle"
          color="white"
          size={45}
          onPress={() => navigation.navigate("inicio")}
        />
      </View>
      <View
        style={{
          width: "93%",
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={styles.etiqueta}>Horario regular de operación</Text>
          <Text style={styles.etiqueta2}>{item.horario}</Text>
        </View>
        <View>
          <Text style={styles.etiqueta}>Precio estimado</Text>
          <Text style={{ fontSize: 22, fontWeight: "bold", color: "#4C4C4C" }}>
            Q {item.precio_estimado}.00
          </Text>
        </View>
      </View>
      <View style={{ width: "93%", marginTop: 5 }}>
        <Text style={styles.etiqueta}>Frecuencia de salida</Text>
        <Text style={styles.etiqueta2}>{item.intervalo}</Text>
      </View>
      <View
        style={{
          width: "93%",
          marginTop: 5,
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        {Data !== undefined ? (
          <>
            <View style={{marginRight: 15}}>
              <Text style={styles.etiqueta}>Distancia</Text>
              <Text style={styles.etiqueta2}>
                {Data["rows"][0]["elements"][0].distance.text}
              </Text>
            </View>
            <View>
              <Text style={styles.etiqueta}>Tiempo estimado de viaje</Text>
              <Text style={styles.etiqueta2}>
                {Data["rows"][0]["elements"][0].duration.text}
              </Text>
            </View>
          </>
        ) : null}
      </View>
      <View
        style={{
          width: "93%",
          marginTop: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 25,
        }}
      >
        <View style={{ top: 30 }}>
          <Text style={styles.etiqueta}>Salida</Text>
          <Text style={styles.etiqueta2}>{item.nombre}</Text>
        </View>
        <LottieView
          source={require("../assets/viaje3.json")}
          autoPlay
          loop
          style={{ width: 100 }}
        />
        <View style={{ top: 30 }}>
          <Text style={styles.etiqueta}>Destino</Text>
          <Text style={styles.etiqueta2}>{item.destino_final}</Text>
        </View>
      </View>
      <MapView
        customMapStyle={MapGrey}
        style={styles.mapa}
        initialRegion={{
          longitude: item.coordenadas.longitud,
          latitude: item.coordenadas.latitud,
          longitudeDelta: 0.05,
          latitudeDelta: 0.05,
        }}
        onPress={clickMap}
        scrollEnabled={false}
        zoomEnabled={false}
        rotateEnabled={false}
        provider={"google"}
      >
        <Marker
          coordinate={coordOrig}
          image={require("../assets/autobus4.png")}
          onPress={clickMap}
        />
        <Marker
          coordinate={coordDest}
          image={require("../assets/fin.png")}
          onPress={clickMap}
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
              onPress={clickMap}
            />
          );
        })}
      </MapView>
      <View style={styles.botones}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => {
            fetchTime(
              setDataTime,
              `${UserLocation.latitude}, ${UserLocation.longitude}`,
              `${coordOrig.latitude}, ${coordOrig.longitude}`
            );
            setDest(coordOrig);
            setRuta(true);
            navigation.navigate("inicio");
          }}
        >
          <Text style={styles.textIr}>Ir a terminal</Text>
          <IconButton icon="map-marker-path" color="#4C4C4C" size={35} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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
    bottom: -15,
    right: -10,
    color: "#4C4C4C",
    fontWeight: "bold",
  },
  touchable: {
    flexDirection: "row",
    backgroundColor: "#eee",
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
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  etiqueta: {
    color: "black",
    fontSize: 10,
    opacity: 0.5,
    fontWeight: "bold",
    
  },
  etiqueta2: {
    color: "#4C4C4C",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 15,
    maxWidth: 150
  },
});
