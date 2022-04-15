import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as firebase from "firebase";

import MainNavigator from "./navigation/MainNavigator";
import { firebaseConfig } from "./config";

import { createAppContainer, createSwitchNavigator } from "react-navigation";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const AppSwitchNavigator = createSwitchNavigator({
  MainNavigator: MainNavigator
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default function App() {
  return <AppContainer />;
}
