import * as React from "react";
import MapView, { Marker } from "react-native-maps";
import LottieView from "lottie-react-native";

export const Markers = ({data, press}) => {
  data.map((item, index) => {
    return (
      <Marker
        coordinate={{
          longitude: item.longitude,
          latitude: item.latitude,
        }}
        key={index}
        onPress={() => {
          //navigation.navigate("terminal", { item: item, setRuta: setRuta, setDest: setDest });
          press(1, item);
        }}
      >
        <LottieView
          source={require("../assets/icons/bus.json")}
          autoPlay
          loop
          style={{ width: 90, height: 20 }}
        />
      </Marker>
    );
  });
};
