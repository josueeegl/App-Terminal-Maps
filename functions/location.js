import AsyncStorage from "@react-native-async-storage/async-storage";
import * as local from "expo-location";

export const obtener = async (setOrigin) => {
  const latitude = await AsyncStorage.getItem("latitude");
  const longitude = await AsyncStorage.getItem("longitude");
  const directions = {
    latitude: Number(latitude),
    longitude: Number(longitude),
    longitudeDelta: 0.05,
    latitudeDelta: 0.05,
  };
  setOrigin(directions);

  return directions;
};

export const LocationUser = async (
  setUserLocation,
  UserLocation,
  setRegion,
  setLoader
) => {
  setUserLocation({
    latitude: (await local.getCurrentPositionAsync()).coords.latitude,
    longitude: (await local.getCurrentPositionAsync()).coords.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  setLoader(false);
  setRegion(UserLocation);
};

export const points = (rutas) => {
  const nuevo = rutas.map((item) => {
    return { longitude: item.point.longitud, latitude: item.point.latitud, nombre: item.nombre };
  });
  return nuevo;
};


