import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  ScrollView,
  FlatList,
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
  let timetable = [];
  function fetchData() {
    firebase
      .database()
      .ref(`/${school}/timetables/s/${username}/`)
      .on("value", (snapshot) => {
        Object.keys(snapshot.val()).forEach((data) => {
          timetable.push({
            key: data,
            value: snapshot.val()[data],
          });
        });
      });
  }
  function TimeTableProp({ data }) {
    if (data === null) {
      return <Text style={styles.textTitle}>No timetable</Text>;
    } else {
      return (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Timetable
              subject={item.value.subject}
              time={item.value.time}
              classroom={item.value.classroom}
            />
          )}
        />
      );
    }
  }
  fetchData();
  return (
    <View style={styles.container}>
      <SafeAreaView
        style={{
          marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      />
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <TimeTableProp data={timetable} />
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
});
