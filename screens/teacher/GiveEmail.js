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
  Alert
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
      <View style={styles.box50}>
        <TextInput
          placeholder="Title"
          placeholderTextColor="#fff"
          value={title}
          onChangeText={(text) => {
            setTitle(text);
          }}
          style={styles.textInput}
          multiline
        />
        <View
          style={{
            width: "95%",
            height: 5,
            backgroundColor: "#fff",
            borderRadius: 5,
          }}
        />
        <TextInput
          placeholder="Body"
          placeholderTextColor="#fff"
          value={body}
          onChangeText={(text) => {
            setBody(text);
          }}
          style={styles.textInput}
          multiline
        />
      </View>
      <TouchableOpacity
        style={[styles.button, { marginTop: 30 }]}
        onPress={() => {
          if(body!=='' && title!==''){
            let time = new Date().getTime();
            firebase
              .database()
              .ref(
                `/${props.route.params.school}/emails/${props.route.params.user}/${time}`
              )
              .set({
                title: title,
                body: body,
              });
            props.navigation.navigate("HomeScreen");
          }else{
            Alert.alert('Do not leave any fields empty')
          }
        }}
      >
        <Text style={styles.text}>Send Email</Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "95%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8AC1FF",
    borderRadius: 10,
  },
  text: {
    fontSize: 25,
    color: "#fff",
  },
  box50: {
    width: "95%",
    backgroundColor: "#8AC1FF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    fontSize: 25,
    color: "#fff",
    width: "95%",
  },
});

export default GiveEmail;
