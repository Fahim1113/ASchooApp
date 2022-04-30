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
  const [timetable, setTimetable] = useState([]);
  const [a, setA] = useState([]);
  const [emails, SeEmails] = useState([]);

  function fetchData() {
    let a = [];
    firebase
      .database()
      .ref(`/${school}/timetables/${username}/`)
      .on("value", (snapshot) => {
        if(snapshot.val()===null){
          
        }
        Object.keys(snapshot.val()).forEach((data) => {
          a.push({
            key: data,
            value: snapshot.val()[data],
          });
          setTimetable(a);
        });
      });
    firebase.database().ref(`/${school}/emails/${username}/`).on('value',(a)=>{
      console.log(a.val())
    })
  }
  function TimeTableProp({ data }) {
    return (
      <FlatList
        data={
          data === [] ? [{ subject: "No timetable set", classroom: "" }] : data
        }
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
      />
    );
  }
  useEffect(() => {
    fetchData();
  }, []);
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
