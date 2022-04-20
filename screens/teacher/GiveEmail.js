import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from "react-native";
import firebase from "firebase";

function GiveEmail(props) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  return (
    <View style={styles.container}>
      <SafeAreaView
        style={{
          marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      />
      <View style={styles.box}>
        <TextInput
          placeholder="Title"
          placeholderTextColor="#fff"
          value={title}
          onChangeText={(text) => {
            setTitle(text);
          }}
          style={styles.text}
        />
        <TextInput
          placeholder="Body"
          placeholderTextColor="#fff"
          value={body}
          onChangeText={(text) => {
            setBody(text);
          }}
          style={styles.text}
        />
        <TouchableOpacity 
          style={styles.button}
        >
          <Text style={styles.text}>Send Email</Text>
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

export default GiveEmail;
