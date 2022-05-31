import * as React from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import firebase from "firebase";

export default class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
        <TouchableOpacity
          style={{
            marginTop: 20,
            backgroundColor: "#0CABA8",
            borderRadius: 10,
            width: 150,
            height: 45,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            marginLeft: 20,
            left: 10,
            top: 30,
          }}
          onPress={() => {
            this.props.navigation.navigate("profile");
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
        <View style={styles.box}>
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
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (
                this.state.password === "" ||
                this.state.passwordConfirm === ""
              ) {
                Alert.alert("Do not leave any fields empty");
              }else if(this.state.password !== this.state.passwordConfirm){
                Alert.alert('Check the password again')
              }else if(this.state.password === this.state.passwordConfirm){
                firebase
                  .database()
                  .ref(
                    `/${this.props.route.params.school}/s/${this.props.route.params.username}/`
                  )
                  .set({
                    accType: "s",
                    password: this.state.password,
                    school: this.props.route.params.school,
                    username: this.props.route.params.username,
                  });
                  Alert.alert('Password changed successfully')
                  this.props.navigation.navigate('profile')
              }
            }}
          >
            <Text style={styles.buttonText}>Reset Passoword</Text>
          </TouchableOpacity>
        </View>
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
    height: 50,
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
