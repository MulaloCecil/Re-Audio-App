import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Audio } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "./Header";

export default function HomeScreen({ navigation }) {
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    Audio.requestPermissionsAsync();
    Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });
  }, []);

  async function startRecording() {
    try {
      if (isPaused) {
        await recording.startAsync();
      } else {
        const recordingObject = new Audio.Recording();
        await recordingObject.prepareToRecordAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        await recordingObject.startAsync();
        setRecording(recordingObject);
      }
      setIsRecording(true);
      setIsPaused(false);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    setIsRecording(false);
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      navigation.navigate("Recordings", { uri });
    } catch (error) {
      ("");
    }
  }

  async function pauseRecording() {
    if (recording && !isPaused) {
      await recording.pauseAsync();
      setIsPaused(true);
    }
  }

  async function resumeRecording() {
    if (recording && isPaused) {
      await recording.startAsync();
      setIsPaused(false);
    }
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.contentContainer}>
        <Text style={styles.headerText}>
          {isRecording ? "Recording..." : "Not Recording"}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.recordButton}
            onPress={isRecording ? stopRecording : startRecording}
          >
            <Image
              source={require("../../assets/rec.png")}
              style={styles.recordIcon}
            />
          </TouchableOpacity>
          {isRecording && (
            <TouchableOpacity
              style={styles.pauseButton}
              onPress={isPaused ? resumeRecording : pauseRecording}
            >
              <Text style={styles.pauseText}>
                {isPaused ? "Resume" : "Pause"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <MaterialIcons name="home" size={30} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Recordings")}>
            <MaterialIcons name="list" size={30} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  recordButton: {
    backgroundColor: "#FF0000",
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  recordIcon: {
    width: 60,
    height: 60,
  },
  pauseButton: {
    backgroundColor: "#00AA00",
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  pauseText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
});
