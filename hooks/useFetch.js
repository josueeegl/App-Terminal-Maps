import React, { useState } from "react";
import { Alert } from "react-native";

export default (setLoader, setData) => {
  fetch("https://terminalmaps.herokuapp.com/terminales", { method: "GET" })
    .then(async (x) => {
      if (x.status == 200) {
        const data = await x.json();
        setData(data);
        setLoader(false);
      }
    })
    .catch((e) => {
      console.log(e);
      return Alert.alert(
        "Error",
        "Hubo un error, verifica la red e intenta de nuevo."
      );
    });
};
