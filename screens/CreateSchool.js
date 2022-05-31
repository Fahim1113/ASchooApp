import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from "react-native";
import * as firebase from "firebase";
import { ScrollView } from "react-native-gesture-handler";
import Ionicon from "react-native-vector-icons/Ionicons";

export default class CreateSchool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView
          style={{
            marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          }}
        />
        <ScrollView style={styles.scrollView}>
          <TouchableOpacity
            style={{
              marginTop: 20,
              backgroundColor: "#0CABA8",
              borderRadius: 10,
              width: 150,
              height: 45,
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              marginLeft: 20,
            }}
            onPress={() => {
              this.props.navigation.navigate("TeacherOrStudent");
            }}
          >
            <Text style={styles.buttonText}>
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
          <View
            style={{
              height: 50,
            }}
          />
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image source={require("../images/logo.png")} />
            <View style={styles.box}>
              <TextInput
                style={styles.username}
                onChangeText={(text) => {
                  this.setState({ school: text });
                }}
                placeholder="School"
                textAlign="center"
                placeholderTextColor="#fff"
              />
              <TouchableOpacity
                onPress={() => {
                  let accountAvailable, UserName, schoolAvailable;
                  if (this.state.school !== "") {
                    firebase
                      .database()
                      .ref("/")
                      .child("" + this.state.school)
                      .on("value", (snapshot) => {
                        schoolAvailable = snapshot.val();
                      });
                  }

                  if (schoolAvailable !== null) {
                    schoolAvailable = true;
                  } else {
                    schoolAvailable = false;
                  }
                  if (this.state.school === "") {
                    Alert.alert("Do not leave fields empty");
                  }
                  if (schoolAvailable === false) {
                    Alert.alert("School added successfully");
                    this.props.navigation.navigate("TeacherOrStudent");
                    firebase.database()
                      .ref("/" + this.state.school + "/")
                      .set({
                        a:'a'
                      });
                  } else {
                    Alert.alert("This school already exist");
                  }
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Create School</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 25,
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
