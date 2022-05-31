import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EmailsScreen from "../screens/student/EmailsScreen";
import Preview from "../screens/student/Preview";

const { Navigator, Screen } = createStackNavigator();

export default class MainNavigator extends React.Component {
  render() {
    let a = this.props.route.params.params;
    return (
      <Navigator
        initialRouteName="inbox"
        screenOptions={{ headerShown: false }}
      >
        <Screen name="inbox" component={EmailsScreen} initialParams={a} />
        <Screen name="preview" component={Preview} initialParams={a} />
      </Navigator>
    );
  }
}
