import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";
import Timetable from "../Components/Timetable";

export default function HomeScreenStudent({
  route: {
    params: {
      params: { school, username },
    },
  },
  navigation,
}) {
  const [data, setData] = useState({});
  var amountOfPoints = 0;
  var email = {};

  function fetchData() {
    let a = [];
    firebase
      .database()
      .ref(`/${school}/timetables/${username}/`)
      .on("value", (snapshot) => {
        if (snapshot.val() === null) {
          a.push({
            key: 0,
            value: { subject: "No timetable", classroom: "" },
          });
        } else {
          Object.keys(snapshot.val()).forEach((data) => {
            a.push({
              key: data,
              value: snapshot.val()[data],
            });
          });
        }
      });
    // setTimetable(a);
    firebase
      .database()
      .ref(`/${school}/points/${username}/`)
      .on("value", (snapshot) => {
        if (snapshot.val().amount === null) {
          amountOfPoints = 0;
        } else {
          amountOfPoints = snapshot.val().amount;
        }
      });

    setData({ timetable: a });
  }
  useEffect(() => {
    fetchData();
  }, []);
  function TimeTableProp({ data }) {
    return (
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Timetable
            subject={item.value.subject}
            classroom={item.value.classroom}
          />
        )}
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
        style={{ marginTop: 20 }}
      />
    );
  }
  return (
    <View style={styles.container}>
      <SafeAreaView
        style={{
          marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      />
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <TimeTableProp data={data.timetable} />
          <View style={[styles.box, { marginTop: 20 }]}>
            <Text style={styles.text}>Points: {amountOfPoints}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
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
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    color: "#fff",
    alignSelf: "center",
  },
});
