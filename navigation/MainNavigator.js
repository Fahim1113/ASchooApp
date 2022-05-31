import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import StudentTabNavigator from "./StudentTabNavigator";
import TeacherTabNavigator from "./TeacherTabNavigator";
import LoginScreenStudent from "../screens/LoginScreenStudent";
import LoginScreenTeacher from "../screens/LoginScreenTeacher";
import TeacherOrStudent from "../screens/TeacherOrStudent";
import RegisterScreen from "../screens/RegisterScreen";
import DoAnythingNavigator from "./DoAnythingNavigator";
import CreateSchool from "../screens/CreateSchool";

const { Navigator, Screen } = createStackNavigator();

export default class MainNavigator extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Navigator
          initialRouteName="TeacherOrStudent"
          screenOptions={{ headerShown: false }}
        >
          <Screen name="RegisterScreen" component={RegisterScreen} />
          <Screen name="LoginScreenTeacher" component={LoginScreenTeacher} />
          <Screen name="LoginScreenStudent" component={LoginScreenStudent} />
          <Screen name="TeacherOrStudent" component={TeacherOrStudent} />
          <Screen name="StudentHome" component={StudentTabNavigator} />
          <Screen name="TeacherHome" component={TeacherTabNavigator} />
          <Screen name="DoAnythingNavigator" component={DoAnythingNavigator} />
          <Screen name="CreateSchool" component={CreateSchool} />
        </Navigator>
      </NavigationContainer>
    );
  }
}
