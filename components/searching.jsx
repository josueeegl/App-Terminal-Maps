import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
  FlatList,
  BackHandler,
} from "react-native";
import { IconButton } from "react-native-paper";

export const Searching = ({ data }) => {
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);
  return (
    <View style={styles(search).container}>
      <View style={styles(visible).viewSearch}>
        <TextInput
          style={styles(search).input}
          onChangeText={(text) => setSearch(text)}
          value={search}
          placeholder="Buscar"
          placeholderTextColor={"white"}
          underlineColorAndroid="transparent"
          onFocus={() => setVisible(true)}
          onBlur={() => setVisible(false)}
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

      {visible ? (
        <View style={styles(search).requests}>
          <FlatList
            style={styles(search).list}
            data={data}
            keyExtractor={(x) => x.terminal}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity style={styles(search).touchable}>
                  <Text
                    style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
                  >
                    {item.terminal}
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
      top: 40,
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
      borderBottomLeftRadius: search ? 0 : 25,
      borderBottomRightRadius: search ? 0 : 25,
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
