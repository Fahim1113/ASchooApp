import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreenStudent from "../screens/student/ProfileScreenStudent";
import ResetPassword from "../screens/student/ResetPassword";

const { Navigator, Screen } = createStackNavigator();

export default class ResetPassowrdNavigator extends React.Component {
  render() {
    let a = this.props.route.params.params;
    return (
      <Navigator
        initialRouteName="profile"
        screenOptions={{ headerShown: false }}
      >
        <Screen
          name="profile"
          component={ProfileScreenStudent}
          initialParams={a}
        />
        <Screen name="reset" component={ResetPassword} initialParams={a} />
      </Navigator>
    );
  }
}
