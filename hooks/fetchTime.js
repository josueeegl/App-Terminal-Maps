import React, { useState } from "react";
import { Alert } from "react-native";
import { GOOGLE_MAPS_KEY } from "@env";

export const fetchTime = (setDataTime, origen, destino) => {
  fetch(
    `https://maps.googleapis.com/maps/api/distancematrix/json?units=international&mode=driving&origins=${origen}&destinations=${destino}&key=${GOOGLE_MAPS_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      setDataTime(data);
    })
    .catch((e) => {
      console.log(e);
      return Alert.alert(
        "Error",
        "Hubo un error, verifica la red e intenta de nuevo."
      );
    });
};
