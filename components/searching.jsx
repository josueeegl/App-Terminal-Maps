import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList, Keyboard
} from "react-native";
import { IconButton } from "react-native-paper";

export const Searching = ({ data, navigation }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);

  const searchFilter = (text) => {
    setSearch(text);
    if (text !== "") {
      const newData = data.filter((x) => x.nombre.toUpperCase().indexOf(text.toUpperCase()) > -1);
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
        <View style={styles(search).requests}>
          <FlatList
            style={styles(search).list}
            data={filter.length === 0 ? data : filter}
            keyExtractor={(x) => x.nombre}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={styles(search).touchable}
                  onPress={() => {
                    setSearch("");
                    navigation.navigate("terminal", { item: item })
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
        </View>
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
      backgroundColor: "#393943",
    },
    list: {
      alignSelf: "stretch",
      backgroundColor: "#eee",
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
    },
    input: {
      width: "85%",
      fontSize: 14,
      color: "white",
      fontWeight: "bold",
    },
    requests: { backgroundColor: "#eee", width: "93%" },
    touchable: {
      width: "100%",
      height: 70,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      padding: 10,
      borderBottomWidth: 1,
      borderColor: "#393943",
    },
  });
