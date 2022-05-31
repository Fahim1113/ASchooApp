import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../screens/teacher/ProfileScreenTeacher";
import ResetPassword from "../screens/teacher/ResetPassword";

const { Navigator, Screen } = createStackNavigator();

export default class ResetPassowrdNavigatorTeacher extends React.Component {
  render() {
    let a = this.props.route.params.params;
    return (
      <Navigator
        initialRouteName="profile"
        screenOptions={{ headerShown: false }}
      >
        <Screen
          name="profile"
          component={ProfileScreen}
          initialParams={a}
        />
        <Screen name="reset" component={ResetPassword} initialParams={a} />
      </Navigator>
    );
  }
}
