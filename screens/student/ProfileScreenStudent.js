import * as React from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default class ProfileScreenStudent extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView
          style={{
            marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate("reset");
          }}
        >
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    );
  }
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
    marginTop: 20,
    width: "90%",
    backgroundColor: "#0CABA8",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  username: {
    width: "90%",
    color: "#fff",
    backgroundColor: "#0CABA8",
    fontSize: 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  password: {
    width: "90%",
    color: "#fff",
    backgroundColor: "#0CABA8",
    fontSize: 25,
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#0CABA8",
    borderRadius: 10,
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    height:50
  },
  buttonText: {
    color: "white",
    fontSize: 30,
  },
  buttonTextSelected: {
    color: "#0CABA8",
    fontSize: 25,
  },
  scrollView: {
    width: "100%",
  },
  studentOrTeacher: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  studentOrTeacherButtons: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
  },
  studentOrTeacherButtonsSeleted: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
    backgroundColor: "#fff",
    borderRadius: 10,
  },
});
