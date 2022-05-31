import * as React from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

export default class TeacherOrStudent extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <Image
          source={require("../images/logo.png")}
          resizeMode="contain"
          style={{ width: "50%" }}
        />
        <View
          style={{
            height: 50,
          }}
        />
        <TouchableOpacity
          style={[
            styles.box30,
            {
              backgroundColor: "#45C4B0",
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            },
          ]}
          onPress={() => {
            this.props.navigation.navigate("LoginScreenStudent");
          }}
        >
          <Text style={styles.buttonText}>Student</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.box30,
            {
              backgroundColor: "#008F8C",
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
            },
          ]}
          onPress={() => {
            this.props.navigation.navigate("LoginScreenTeacher");
          }}
        >
          <Text style={styles.buttonText}>Teacher</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate("RegisterScreen");
          }}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate("CreateSchool");
          }}
        >
          <Text style={styles.buttonText}>Add School</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#8AC1FF",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  box30: {
    flex: 0.3,
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#0CABA8",
    borderRadius: 10,
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 40,
  },
});
