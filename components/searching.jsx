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

export const Searching = ({
  data,
  navigation,
  setRuta,
  setDest,
  setDataTime,
  UserLocation,
}) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);

  const searchFilter = (text) => {
    setSearch(text);
    if (text !== "") {
      const newData = data.filter(
        (x) =>
          x.nombre.toUpperCase().indexOf(text.toUpperCase()) > -1 ||
          x.destino_final.toUpperCase().indexOf(text.toUpperCase()) > -1
      );
      if (newData.length === 0) {
        let rt = [];
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].rutas.length; j++) {
            if (
              data[i].rutas[j].nombre
                .toUpperCase()
                .indexOf(text.toUpperCase()) > -1
            ) {
              rt.push(data[i]);
            }
          }
        }
        setFilter(rt);
        rt = [];
      } else {
        setFilter(newData);
      }
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
          color={search == "" ? "white" : "#4C4C4C"}
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
          keyExtractor={(x) => x._id + (Math.random() * (100 - 10) + 10)}
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
                    UserLocation: UserLocation,
                    setDataTime: setDataTime,
                  });
                }}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: "bold", color: "white" }}
                >
                  {item.destino_final}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    color: "white",
                    opacity: 0.7,
                    fontWeight: "bold",
                  }}
                >
                  Saliendo de {item.nombre}
                </Text>
                <FlatList
                  style={{ width: "95%" }}
                  horizontal
                  data={rutas}
                  ItemSeparatorComponent={() => {
                    return <Text style={styles(search).paradas}>{">"}</Text>;
                  }}
                  keyExtractor={(x) => x.latitude}
                  renderItem={(item2, index) => {
                    return (
                      <Text style={styles(search).paradas}>
                        {item2.item.nombre}
                      </Text>
                    );
                  }}
                />
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
      top: 40,
      alignItems: "center",
      zIndex: 1,
    },
    viewSearch: {
      flexDirection: "row",
      height: search == "" ? 50 : 60,
      width: "93%",
      padding: 15,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      borderBottomLeftRadius: search == "" ? 25 : 0,
      borderBottomRightRadius: search == "" ? 25 : 0,
      borderBottomWidth: search == "" ? 0 : 1,
      borderLeftWidth: search == "" ? 0 : 1,
      borderRightWidth: search == "" ? 0 : 1,
      borderColor: "rgba(0,0,0,0.2)",
      backgroundColor: search == "" ? "#4C4C4C" : "white",
    },
    list: {
      backgroundColor: "#4C4C4C",
      width: "90%",
      paddingBottom: 15,
      maxHeight: 500,
    },
    input: {
      width: "85%",
      fontSize: 14,
      color: search == "" ? "white" : "#4C4C4C",
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
      height: 100,
      backgroundColor: "#4C4C4C",
      borderTopWidth: 1,
      borderColor: "rgba(255,255,255,0.5)",
      padding: 15,
    },
    paradas: {
      fontSize: 10,
      color: "white",
      opacity: 0.7,
      fontWeight: "bold",
      marginRight: 15,
      top: 5,
    },
  });
