import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Timetable({ time, subject, classroom }) {
  return (
    <View
      style={{
        borderWidth: 2,
        borderColor: "#1232",
        width: "100%",
        height: 45,
      }}
    >
      <Text style={[styles.text, {position: "absolute",left:1}]}>{time}</Text>
      <Text style={[styles.text, { alignSelf:'center'}]}>{subject}</Text>
      <Text style={[styles.text, { position: "absolute",left:'80%' }]}>{classroom}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 25,
  },
});
