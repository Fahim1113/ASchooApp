import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";

export default function HomeScreen(props) {
  const [student, setStudent] = useState("");
  const [studentsFlatlist, setStudentsFlatlist] = useState([]);
  const [allStudents, setAllStudents] = useState([]);

  const fetchStudents = () => {
    firebase
      .database()
      .ref("/" + props.route.params.school + "/s/")
      .on("value", (snapshot) => {
        let a = Object.keys(snapshot.val()).map((x, i) => {
          return { title: x, key: i };
        });
        setStudentsFlatlist(() => {
          return [...a];
        });
        setAllStudents(() => {
          return [...a];
        });
      });
  };
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView
        style={{
          marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      />
      <TextInput
        style={[styles.search, { alignSelf: "center" }]}
        onChangeText={(text) => {
          let a = [];
          if (text === "") {
            setStudentsFlatlist(() => {
              return [...allStudents];
            });
          } else {
            a = [...allStudents];
            a = a.filter((a) => {
              return a.title.toLowerCase().includes(text.toLowerCase());
            });
            setStudentsFlatlist(() => {
              return [...a];
            });
          }
          setStudent(text);
        }}
        placeholder="Search Student"
        textAlign="center"
        placeholderTextColor="#fff"
        value={student}
      />
      <FlatList
        style={{
          width: "100%",
        }}
        data={
          studentsFlatlist.length == 0
            ? [{ title: "No Students Available", key: 0 }]
            : studentsFlatlist
        }
        renderItem={({ item: { title } }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("DoAnything", {
                  school: props.route.params.school,
                  user: title,
                });
              }}
            >
              <View
                style={{
                  backgroundColor: "#8AC1FF",
                  color: "white",
                  width: "90%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: "black",
                  alignSelf: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 25 }}>{title}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        ListFooterComponent={() => {
          return (
            <View
              style={{
                height: 10,
                width: "90%",
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                alignSelf: "center",
                backgroundColor: "#8AC1FF",
              }}
            />
          );
        }}
        keyExtractor={(item) => item.key}
      />
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
  search: {
    width: "90%",
    color: "#fff",
    backgroundColor: "#8AC1FF",
    fontSize: 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  list: {
    backgroundColor: "#fff",
  },
});
