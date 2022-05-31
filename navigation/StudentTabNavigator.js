import * as React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreenStudent from "../screens/student/HomeScreenStudent";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import EmailNavigator from "./EmailNavigator";
import ResetPasswordNavigator from './ResetPasswordNavigator'

const Tab = createMaterialBottomTabNavigator();

export default class StudentTabNavigator extends React.Component {
  render() {
    let a = this.props.route;
    return (
      <Tab.Navigator
        shifting={true}
        labeled={false}
        initialRouteName="Home"
        activeColor="#fff"
        inactiveColor="#fff9"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            } else if (route.name === "Email") {
              iconName = focused ? "file-tray-full" : "file-tray-full-outline";
            }
            return (
              <Ionicons
                name={iconName}
                size={RFValue(25)}
                color={color}
                style={{
                  width: RFValue(30),
                  height: RFValue(30),
                }}
              />
            );
          },
        })}
      >
        <Tab.Screen
          component={HomeScreenStudent}
          name="Home"
          options={{
            tabBarColor: "#03adfc",
          }}
          initialParams={a}
        />
        <Tab.Screen
          component={EmailNavigator}
          name="Email"
          options={{
            tabBarColor: "#03fc77",
          }}
          initialParams={a}
        />
        <Tab.Screen
          component={ResetPasswordNavigator}
          name="Profile"
          options={{
            tabBarColor: "#03fc77",
          }}
          initialParams={a}
        />
      </Tab.Navigator>
    );
  }
}
