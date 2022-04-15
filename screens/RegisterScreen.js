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

export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountType: "",
      school: "",
      username: "",
      password: "",
      passwordConfirm: "",
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
              <TextInput
                style={[styles.username, { marginTop: 20 }]}
                onChangeText={(text) => {
                  this.setState({ username: text });
                }}
                placeholder="User name"
                textAlign="center"
                placeholderTextColor="#fff"
              />
              <TextInput
                onChangeText={(text) => {
                  this.setState({ password: text });
                }}
                placeholder="Password"
                textContentType="password"
                autoComplete="password"
                secureTextEntry={true}
                style={styles.password}
                textAlign="center"
                placeholderTextColor="#fff"
              />
              <TextInput
                onChangeText={(text) => {
                  this.setState({ passwordConfirm: text });
                }}
                placeholder="Confirm Password"
                textContentType="password"
                autoComplete="password"
                secureTextEntry={true}
                style={styles.password}
                textAlign="center"
                placeholderTextColor="#fff"
              />
              <View style={styles.studentOrTeacher}>
                <TouchableOpacity
                  style={
                    this.state.accountType === "s"
                      ? styles.studentOrTeacherButtonsSeleted
                      : styles.studentOrTeacherButtons
                  }
                  onPress={() => {
                    this.setState({ accountType: "s" });
                  }}
                >
                  <Text
                    style={
                      this.state.accountType === "s"
                        ? styles.buttonTextSelected
                        : styles.buttonText
                    }
                  >
                    Student
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    this.state.accountType === "t"
                      ? styles.studentOrTeacherButtonsSeleted
                      : styles.studentOrTeacherButtons
                  }
                  onPress={() => {
                    this.setState({ accountType: "t" });
                  }}
                >
                  <Text
                    style={
                      this.state.accountType === "t"
                        ? styles.buttonTextSelected
                        : styles.buttonText
                    }
                  >
                    Teacher
                  </Text>
                </TouchableOpacity>
              </View>
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
                    if (
                      this.state.username !== "" &&
                      this.state.accountType !== ""
                    ) {
                      firebase
                        .database()
                        .ref(
                          "/" +
                            this.state.school +
                            "/" +
                            this.state.accountType +
                            "/"
                        )
                        .child("" + this.state.username)
                        .on("value", (snapshot) => {
                          UserName = snapshot.val();
                        });
                    }
                  }
                  if (UserName === null) {
                    accountAvailable = true;
                  } else {
                    accountAvailable = false;
                  }

                  if (schoolAvailable !== null) {
                    schoolAvailable = true;
                  } else {
                    schoolAvailable = false;
                  }

                  if (this.state.password !== this.state.passwordConfirm) {
                    Alert.alert(
                      "Check your password again",
                      "Make sure that the password and the confirm password is the same"
                    );
                  } else if (
                    this.state.username === "" ||
                    this.state.password === "" ||
                    this.state.passwordConfirm === "" ||
                    this.state.school === ""
                  ) {
                    Alert.alert("Do not leave fields empty");
                  } else if (accountAvailable === false) {
                    Alert.alert("Username already taken");
                  } else if (schoolAvailable === false) {
                    Alert.alert(
                      "This school does not exist",
                      "If You want the school to be added then press the add school button"
                    );
                  } else if (this.state.accountType === "") {
                    Alert.alert(
                      "Please tell if you are a student or a teacher"
                    );
                  } else if (
                    this.statepassword === this.statepasswordConfirm &&
                    this.state.username !== "" &&
                    accountAvailable === true &&
                    schoolAvailable === true &&
                    this.statepassword !== "" &&
                    this.statepasswordConfirm !== ""
                  ) {
                    firebase
                      .database()
                      .ref(
                        `/${this.state.school}/${this.state.accountType}/${this.state.username}/`
                      )
                      .set({
                        username: this.state.username,
                        password: this.state.password,
                        accType: this.state.accountType,
                        school: this.state.school,
                      });
                      firebase.database().ref(`/${this.state.school}/attendance/${this.state.username}/`).set({
                        sessinsAttended:0
                      })
                    this.props.navigation.navigate(
                      this.state.accountType === "s"
                        ? "StudentHome"
                        : "TeacherHome",
                      {
                        school: this.state.school,
                        username: this.state.username,
                        password: this.state.password,
                      }
                    );
                  }
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Register Account</Text>
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
