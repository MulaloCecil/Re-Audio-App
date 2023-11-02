import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Button } from "react-native-paper";

function Forgotpassword({ navigation }) {
  const [isLoading, setisLoading] = useState(false);
  const [Username, setUsername] = useState("");
  const handleSubmit = async () => {
    if (Username !== "") {
      try {
        const auth = getAuth();
        setisLoading(true);
        sendPasswordResetEmail(auth, Username.trim().toLocaleLowerCase())
          .then(() => {
            setisLoading(false);
            Alert.alert(
              "Notification",
              "check your email address for a password reset link",
              [{ text: "OK", onPress: () => navigation.navigate("Login") }]
            );
          })
          .catch((err) => {
            console.log(error);
            setisLoading(false);
            Alert.alert("Notification", err.message);
          });
      } catch (error) {
        console.log(error);
        setisLoading(false);
        Alert.alert("Notification", error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset password</Text>
      <Text style={styles.title2}>
        To reset your kindly enter your username below.
      </Text>

      <Text style={styles.title3}>Username</Text>
      <TextInput
        style={styles.input1}
        placeholder="Email"
        value={Username}
        cursorColor={"black"}
        onChangeText={(text) => setUsername(text)}
      />

      <TouchableOpacity onPress={() => handleSubmit()}>
        <Button
          disabled={isLoading ? true : false}
          style={styles.customButton}
          loading={isLoading}
          mode="contained"
        >
          Reset Password
        </Button>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 100,
    color: "black",
  },
  input1: {
    height: 45,
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  registerButton: {
    borderRadius: 10,
  },
  title2: {
    color: "black",
    fontSize: 15,
    marginTop: 10,
  },
  title3: {
    marginTop: 30,
    marginBottom: 10,
  },
  availableText: {
    color: "green",
    fontWeight: "bold",
    marginTop: 10,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "40%",
  },

  buttonContainer: {
    position: "absolute",
    bottom: 20,
  },
  customButton: {
    marginTop: "15%",
    width: "100%",
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Forgotpassword;
