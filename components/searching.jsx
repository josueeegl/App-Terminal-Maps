import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from "react-native";
import { IconButton } from "react-native-paper";
import { points } from "../functions/location";

export const Searching = ({ data, navigation, setRuta, setDest }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);

  const searchFilter = (text) => {
    setSearch(text);
    if (text !== "") {
      const newData = data.filter(
        (x) => x.nombre.toUpperCase().indexOf(text.toUpperCase()) > -1
      );
      setFilter(newData);
    } else {
      setFilter([]);
    }
  };

  return (
    <View style={styles(search).container}>
      <View style={styles(search).viewSearch}>
        <TextInput
          style={styles(search).input}
          onChangeText={(text) => searchFilter(text)}
          value={search}
          placeholder="Buscar"
          placeholderTextColor={"white"}
          underlineColorAndroid="transparent"
        />
        <IconButton
          icon={search !== "" ? "backspace" : "text-search"}
          color="white"
          size={30}
          style={{ bottom: 15 }}
          onPress={() => {
            search !== "" ? setSearch("") : Keyboard.dismiss();
          }}
        />
      </View>

      {search !== "" ? (
          <FlatList
            style={styles(search).list}
            data={filter.length === 0 ? data : filter}
            keyExtractor={(x) => x.nombre}
            renderItem={({ item, index }) => {
              const rutas = points(item.rutas);
              return (
                <TouchableOpacity
                  style={styles(search).touchable}
                  onPress={() => {
                    setSearch("");
                    navigation.navigate("terminal", {
                      item: item,
                      setRuta: setRuta,
                      setDest: setDest,
                      rutas: rutas,
                    });
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
                  >
                    {item.nombre}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
      ) : null}
    </View>
  );
};

const styles = (search) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      width: "100%",
      top: 50,
      alignItems: "center",
      zIndex: 1,
    },
    viewSearch: {
      flexDirection: "row",
      height: 50,
      width: "93%",
      padding: 15,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      borderBottomLeftRadius: search == "" ? 25 : 0,
      borderBottomRightRadius: search == "" ? 25 : 0,
      backgroundColor: "#E98D58",
    },
    list: {
      backgroundColor: "transparent",
      width: "90%",
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
      paddingBottom: 15,
    },
    input: {
      width: "85%",
      fontSize: 14,
      color: "white",
      fontWeight: "bold",
    },
    requests: {
      backgroundColor: "#eee",
      width: "93%",
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
    },
    touchable: {
      alignSelf: "center",
      width: "100%",
      height: 65,
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      padding: 10,
    },
  });
