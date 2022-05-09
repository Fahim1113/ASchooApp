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
  const [timetable, setTimetable] = useState([]);
  const [emailData, setEmailData] = useState([]);
  const [emails, setEmails] = useState([]);

  function fetchData() {
    let a = [];
    let b = [];
    let c = [];
    firebase
      .database()
      .ref(`/${school}/timetables/${username}/`)
      .on("value", (snapshot) => {
        if (snapshot.val() === null) {
          a.push({
            key: 0,
            value: { subject: "No timetable available", classroom: "" },
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
    setTimetable(a);
    firebase
      .database()
      .ref(`/${school}/emails/${username}/`)
      .on("value", (a) => {
        b.push(Object.keys(a.val()).sort());
        console.log(a.val())
        /* setEmails(() => {
          let q = [];
          if (a.val() !== null) {
            Object.keys(a.val()).forEach((data) => {
              q.push({
                key: a.val()[data].time,
                value: {
                  body: a.val()[data].body,
                  title: a.val()[data].title,
                },
              });
            });
          } else {
            q.push({
              key: 0,
              value: {
                body: "",
                title: "You have no emails",
              },
            });
          }
          return [...q];
        }); */
      });
      setEmailData(b)
      console.log(emailData)
      console.log(b)
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
          <TimeTableProp data={timetable} />
          {/* <View>
            <TouchableOpacity
              disabled={emails[0].value.title === "You have no emails"}
              style={styles.button}
            >
              <Text style={styles.text}>{emails[0].value.title}</Text>
            </TouchableOpacity>
          </View> */}
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
  },
  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    color: "#fff",
  },
});
