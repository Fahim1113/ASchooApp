import * as React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreenStudent from "../screens/student/HomeScreenStudent";
import ProfileScreenStudent from "../screens/student/ProfileScreenStudent";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";

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
          component={ProfileScreenStudent}
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
