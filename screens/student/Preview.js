import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  StyleSheet,
} from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";

function Preview(props) {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.a} />
      <TouchableOpacity
        style={{
          marginTop: 20,
          backgroundColor: "#8AC1FF",
          borderRadius: 10,
          width: 150,
          height: 45,
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          marginLeft: '2.5%',
        }}
        onPress={() => {
          props.navigation.navigate('inbox')
        }}
      >
        <Text style={styles.text}>
          <Ionicon
            name={"chevron-back-outline"}
            size={27}
            color={"#fff"}
            style={{
              width: 30,
              height: 30,
            }}
          />
          Go back
        </Text>
      </TouchableOpacity>
      <View style={styles.box}>
        <Text style={styles.text}>{props.route.params.title}</Text>
        <Text style={styles.text}>
          {props.route.params.body}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
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
    marginTop: 20,
    backgroundColor: "#8AC1FF",
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "flex-start",
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
    width:'95%',
    marginTop:5,
    marginBottom:5
  },
  a: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default Preview;
