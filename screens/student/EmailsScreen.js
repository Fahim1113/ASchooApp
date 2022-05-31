import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StyleSheet,
  StatusBar,
} from "react-native";
import firebase from "firebase";

export default function EmailsScreen(props) {
  function renderItem(item) {
    return (
      <TouchableOpacity style={styles.button} onPress={() => {
        props.navigation.navigate('preview',{...item.value})
      }}>
        <Text style={styles.text}>{item.value.title}</Text>
      </TouchableOpacity>
    );
  }
  function fetchData() {
    let array1 = [];
    let array2 = [];
    firebase
      .database()
      .ref(
        `/${props.route.params.school}/emails/${props.route.params.username}`
      )
      .on("value", (a) => {
        array1.push(
          ...Object.keys(a.val()).sort(function (a, b) {
            return b - a;
          })
        );
        array1.forEach((val) => {
          array2.push({
            key: val,
            value: a.val()[val],
          });
        });
      });
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.a} />
        <FlatList
          data={array2}
          renderItem={({ item }) => {
            return renderItem(item);
          }}
          ListHeaderComponent={() => {
            return (
              <View
                style={{
                  height: 10,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  backgroundColor: "#8ac1ff",
                  width: "95%",
                  alignSelf: "center",
                }}
              ></View>
            );
          }}
          ListFooterComponent={() => {
            return (
              <View
                style={{
                  height: 10,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  backgroundColor: "#8ac1ff",
                  width: "95%",
                  alignSelf: "center",
                }}
              ></View>
            );
          }}
          style={{ marginTop: 20, width: "95%" }}
        />
      </View>
    );
  }
  return fetchData();
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  scrollView: {
    width: "100%",
  },
  textTitle: {
    fontSize: 25,
    fontWeight: "bold",
  },
  timetable: {
    width: "100%",
  },
  box: {
    width: "95%",
    backgroundColor: "#8AC1FF",
    borderRadius: 10,
    alignSelf: "center",
  },
  button: {
    alignSelf: "center",
    width: "95%",
    backgroundColor: "#8AC1FF",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    color: "#fff",
    alignSelf: "center",
  },
  a: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
