import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";

function GivePoints(props) {
  const [amount, setAmount] = useState(0);
  const [snapshot, setSnapshot] = useState(0);

  console.log(props.route);
  return (
    <View style={styles.container}>
      <SafeAreaView
        style={{
          marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      />
      <View style={styles.box}>
        <Text style={styles.text}>Give Points</Text>
        <View style={{ width: "100%" }}>
          <View
            style={{
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              left: "10%",
            }}
          >
            <TouchableOpacity
              style={{ width: "100%", height: "100%" }}
              onPress={() => {
                setAmount(() => {
                  return amount + 1;
                });
              }}
            >
              <Text style={styles.text}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.text, { alignSelf: "center" }]}>{amount}</Text>
          <View
            style={{
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              left: "85%",
            }}
          >
            <TouchableOpacity
              style={{ width: "100%", height: "100%" }}
              onPress={() => {
                setAmount(() => {
                  return amount - 1;
                });
              }}
            >
              <Text style={styles.text}>-</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{ alignSelf: "center" }}
            onPress={() => {
              firebase.database().ref(
                `/${props.route.params.school}/points/${props.route.params.user}`
              ).on('value',(snapshot)=>{
                if(snapshot.val()){
                  setSnapshot(snapshot.val().amount)
                }
                else {
                  setSnapshot(0)
                }
              })
              firebase
                .database()
                .ref(
                  `/${props.route.params.school}/points/${props.route.params.user}`
                )
                .set({
                  amount: amount+snapshotz,
                });
            }}
          >
            <Text style={styles.text}>Save Points</Text>
          </TouchableOpacity>
        </View>
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
  box: {
    width: "95%",
    backgroundColor: "#8AC1FF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
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

export default GivePoints;
