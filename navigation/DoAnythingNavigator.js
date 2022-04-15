import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import DoAnything from "../screens/teacher/DoAnything";
import HomeScreen from "../screens/teacher/HomeScreenTeacher";
import GivePoints from "../screens/teacher/GivePoints";
import GiveEmail from "../screens/teacher/GiveEmail";
import GiveHomework from "../screens/teacher/GiveHomework";

const { Navigator, Screen } = createStackNavigator();

export default class DoAnythingNavigator extends React.Component {
  render() {
    const a = this.props.route.params.params;
    return (
      <Navigator
        initialRouteName="HomeScreen"
        screenOptions={{ headerShown: false }}
      >
        <Screen name="HomeScreen" component={HomeScreen} initialParams={a} />
        <Screen name="DoAnything" component={DoAnything} />
        <Screen name="Points" component={GivePoints} />
        <Screen name="Email" component={GiveEmail} />
        <Screen name="Homework" component={GiveHomework} />
      </Navigator>
    );
  }
}
