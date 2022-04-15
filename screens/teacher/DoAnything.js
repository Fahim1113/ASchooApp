import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";

export default function DoAnything(props) {
  return (
    <View style={styles.container}>
      <SafeAreaView
        style={{
          marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      />
      <View style={styles.box}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate("Points", {
              school: props.route.params.school,
              user: props.route.params.user,
            });
          }}
        >
          <Text style={styles.text}>Give points</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate("Homework", {
              school: props.route.params.school,
              user: props.route.params.user,
            });
          }}
        >
          <Text style={styles.text}>Give homework</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate("Email", {
              school: props.route.params.school,
              user: props.route.params.user,
            });
          }}
        >
          <Text style={styles.text}>Email</Text>
        </TouchableOpacity>
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
