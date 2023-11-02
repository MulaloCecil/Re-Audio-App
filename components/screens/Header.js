import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Header = ({ navigation }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Voice Recorder</Text>
      <TouchableOpacity
        style={styles.profileIcon}
        onPress={() => navigation.navigate("Prof")}
      >
        <MaterialIcons name="person" size={30} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#000000",
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    color: "#FFFFFF",
  },
  profileIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default Header;
