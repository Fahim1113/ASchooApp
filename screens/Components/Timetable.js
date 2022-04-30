import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Timetable({ subject, classroom }) {
  return (
    <View
      style={{
        backgroundColor: "#8ac1ff",
        width: "95%",
        height: 45,
        alignSelf: "center",
      }}
    >
      <Text style={[styles.text, { position: "absolute", left: "15%" }]}>
        {subject}
      </Text>
      <Text style={[styles.text, { position: "absolute", right: "15%" }]}>
        {classroom}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    color: "#fff",
  },
});
