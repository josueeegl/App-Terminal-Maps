import AsyncStorage from "@react-native-async-storage/async-storage";
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
