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

export default class LoginScreenStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "C",
      password: "a",
      school: "A",
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
              backgroundColor: "#008F8C",
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
              backgroundColor: "8AC1FF",
            }}
          >
            <Image
              source={require("../images/logo.png")}
              resizeMode="contain"
              style={{ width: "50%" }}
            />
            <View style={styles.box}>
              <TextInput
                style={[styles.username, { marginTop: 10 }]}
                onChangeText={(text) => {
                  this.setState({ school: text });
                }}
                placeholder="School"
                textAlign="center"
                placeholderTextColor="#fff"
              />

              <TextInput
                style={[styles.username, { marginTop: 10 }]}
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
              <TouchableOpacity
                onPress={() => {
                  let UserName, PassWord, schoolAvailable;
                  if (
                    this.state.username !== "" &&
                    this.state.password !== "" &&
                    this.state.school !== ""
                  ) {
                    if (
                      this.state.username !== "" ||
                      this.state.password !== "" ||
                      this.state.school !== ""
                    ) {
                      firebase
                        .database()
                        .ref("/" + this.state.school + "/")
                        .on("value", (snapshot) => {
                          schoolAvailable = snapshot.val();
                        });
                      if (schoolAvailable !== null) {
                        schoolAvailable = true;
                      } else {
                        schoolAvailable = false;
                        Alert.alert(
                          "This school does not exist",
                          "If You want the school to be added then press the add school button"
                        );
                      }
                      firebase
                        .database()
                        .ref(
                          `/` + this.state.school + `/s/` + this.state.username
                        )
                        .on("value", (snapshot) => {
                          UserName = snapshot.val().username;
                          PassWord = snapshot.val().password;
                        });
                      if (
                        UserName === this.state.username &&
                        PassWord === this.state.password &&
                        schoolAvailable === true
                      ) {
                        this.props.navigation.navigate("StudentHome", {
                          school: this.state.school,
                          username: this.state.username,
                          password: this.state.password,
                        });
                      } else if (UserName === null && PassWord === null) {
                        Alert.alert(
                          "You need to register first",
                          "Click the register button"
                        );
                      }
                    } else {
                      Alert.alert("Do not leave fields empty");
                    }
                  } else {
                    Alert.alert("Do not leave fields empty");
                  }
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Login</Text>
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
    backgroundColor: "#008F8C",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  username: {
    width: "90%",
    color: "#fff",
    backgroundColor: "#008F8C",
    fontSize: 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  password: {
    width: "90%",
    color: "#fff",
    backgroundColor: "#008F8C",
    fontSize: 25,
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#008F8C",
    borderRadius: 10,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 25,
  },
  scrollView: {
    width: "100%",
  },
});
