import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";

import firebase from "firebase";

function SetTimetable(props) {
  const [l1, setl1] = useState("");
  const [l2, setl2] = useState("");
  const [l3, setl3] = useState("");
  const [l4, setl4] = useState("");
  const [l5, setl5] = useState("");
  const [l6, setl6] = useState("");
  const [l7, setl7] = useState("");

  const [c1, setc1] = useState("");
  const [c2, setc2] = useState("");
  const [c3, setc3] = useState("");
  const [c4, setc4] = useState("");
  const [c5, setc5] = useState("");
  const [c6, setc6] = useState("");
  const [c7, setc7] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View
          style={{
            height: 10,
          }}
        />
        <View style={styles.view}>
          <TextInput
            placeholder="Subject"
            value={l1}
            onChangeText={(a) => setl1(a)}
            placeholderTextColor="#fff"
            style={styles.text}
          />
          <TextInput
            placeholder="Class"
            value={c1}
            onChangeText={(a) => setc1(a)}
            placeholderTextColor="#fff"
            style={styles.textb}
          />
        </View>
        <View style={styles.view}>
          <TextInput
            placeholder="Subject"
            value={l2}
            onChangeText={(a) => setl2(a)}
            placeholderTextColor="#fff"
            style={styles.text}
          />
          <TextInput
            placeholder="Class"
            value={c2}
            onChangeText={(a) => setc2(a)}
            placeholderTextColor="#fff"
            style={styles.textb}
          />
        </View>
        <View style={styles.view}>
          <TextInput
            placeholder="Subject"
            value={l3}
            onChangeText={(a) => setl3(a)}
            placeholderTextColor="#fff"
            style={styles.text}
          />
          <TextInput
            placeholder="Class"
            value={c3}
            onChangeText={(a) => setc3(a)}
            placeholderTextColor="#fff"
            style={styles.textb}
          />
        </View>
        <View style={styles.view}>
          <TextInput
            placeholder="Subject"
            value={l4}
            onChangeText={(a) => setl4(a)}
            placeholderTextColor="#fff"
            style={styles.text}
          />
          <TextInput
            placeholder="Class"
            value={c4}
            onChangeText={(a) => setc4(a)}
            placeholderTextColor="#fff"
            style={styles.textb}
          />
        </View>
        <View style={styles.view}>
          <TextInput
            placeholder="Subject"
            value={l5}
            onChangeText={(a) => setl5(a)}
            placeholderTextColor="#fff"
            style={styles.text}
          />
          <TextInput
            placeholder="Class"
            value={c5}
            onChangeText={(a) => setc5(a)}
            placeholderTextColor="#fff"
            style={styles.textb}
          />
        </View>
        <View style={styles.view}>
          <TextInput
            placeholder="Subject"
            value={l6}
            onChangeText={(a) => setl6(a)}
            placeholderTextColor="#fff"
            style={styles.text}
          />
          <TextInput
            placeholder="Class"
            value={c6}
            onChangeText={(a) => setc6(a)}
            placeholderTextColor="#fff"
            style={styles.textb}
          />
        </View>
        <View style={styles.view}>
          <TextInput
            placeholder="Subject"
            value={l7}
            onChangeText={(a) => setl7(a)}
            placeholderTextColor="#fff"
            style={styles.text}
          />
          <TextInput
            placeholder="Class"
            value={c7}
            onChangeText={(a) => setc7(a)}
            placeholderTextColor="#fff"
            style={styles.textb}
          />
        </View>

        <View
          style={{
            height: 10,
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (
            l1 !== "" &&
            l2 !== "" &&
            l3 !== "" &&
            l4 !== "" &&
            l5 !== "" &&
            l6 !== "" &&
            l7 !== ""
          ) {
            firebase
              .database()
              .ref(
                `/${props.route.params.school}/timetables/${props.route.params.user}`
              )
              .set({
                1: {
                  subject: l1,
                  classroom: c1,
                },
                2: {
                  subject: l2,
                  classroom: c2,
                },
                3: {
                  subject: l3,
                  classroom: c3,
                },
                4: {
                  subject: l4,
                  classroom: c4,
                },
                5: {
                  subject: l5,
                  classroom: c5,
                },
                6: {
                  subject: l6,
                  classroom: c6,
                },
                7: {
                  subject: l7,
                  classroom: c7,
                },
              });
              props.navigation.navigate('HomeScreen')
          }else{
            Alert.alert('Do no leave any fields empty')
          }
        }}
      >
        <Text style={styles.texta}>Set Timetable</Text>
      </TouchableOpacity>
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
  box: {
    width: "95%",
    backgroundColor: "#8AC1FF",
    borderRadius: 10,
  },
  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8ac1ff",
    borderRadius: 10,
    width: "95%",
    marginTop: 30,
  },
  texta: {
    fontSize: 25,
    color: "#fff",
  },
  text: {
    position: "absolute",
    fontSize: 25,
    color: "#fff",

    alignSelf: "center",
    left: "10%",
  },
  textb: {
    position: "absolute",
    fontSize: 25,
    color: "#fff",
    alignSelf: "center",
    right: "10%",
  },
  view: {
    width: "100%",
    minHeight: 50,
    justifyContent: "space-between",
    alignItems: "stretch",
  },
});

export default SetTimetable;
