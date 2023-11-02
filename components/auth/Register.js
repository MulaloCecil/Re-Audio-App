import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { Button } from "react-native-paper";

function RegistrationPage({ navigation }) {
  const [isLoading, setisLoading] = useState(false);
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");

  const handleSubmit = async () => {
    if (
      Password !== "" &&
      Username !== "" &&
      Name !== "" &&
      Phone !== "" &&
      Phone.length === 10
    ) {
      try {
        const auth = getAuth();
        let data = {
          Username: Username,
          memberDate: new Date().toLocaleDateString().toString(),
          Phone: Phone.trim(),
          Name: Name.trim(),
        };
        setisLoading(true);
        const result = await createUserWithEmailAndPassword(
          auth,
          Username.trim().toLocaleLowerCase(),
          Password
        );
        setDoc(doc(db, "Users", result.user.uid.trim()), data)
          .then(() => {
            setisLoading(false);
            Alert.alert("Notification", "Successful registration", [
              {
                text: "OK",
                onPress: () => navigation.navigate("Login"),
              },
            ]);
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
    } else {
      Alert.alert(
        "Notification",
        "Please fill the required fields. Make sure the phone number consists of 10 digits."
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Sign-Up</Text>
        </View>

        <Text style={styles.title3}>Full Names</Text>
        <TextInput
          style={styles.input1}
          placeholder="Name"
          value={Name}
          cursorColor={"black"}
          onChangeText={(text) => setName(text)}
        />

        <Text style={styles.title3}>Phone No.</Text>
        <TextInput
          style={styles.input1}
          placeholder="Phone"
          inputMode="tel"
          maxLength={10}
          cursorColor={"black"}
          value={Phone}
          onChangeText={(text) => setPhone(text)}
        />

        <Text style={styles.title3}>Username (Email)</Text>
        <TextInput
          style={styles.input1}
          placeholder="Email"
          value={Username}
          cursorColor={"black"}
          onChangeText={(text) => setUsername(text.trim())}
        />
        <Text style={styles.title3}>Password</Text>
        <TextInput
          style={styles.input1}
          placeholder="Password"
          value={Password}
          cursorColor={"black"}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity onPress={() => handleSubmit()}>
          <Button
            disabled={isLoading ? true : false}
            style={styles.customButton}
            loading={isLoading}
            mode="contained"
          >
            Register
          </Button>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default RegistrationPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  titleContainer: {
    flexDirection: "row",
  },
  icon: {
    height: 50,
    width: 50,
  },
  title: {
    fontWeight: "bold",
    fontSize: 35,
    textAlign: "center",
  },
  input1: {
    height: 45,
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  title3: {
    marginTop: 30,
    marginBottom: 10,
  },
  customButton: {
    marginTop: "15%",
    width: "100%",
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20%",
  },
  footerText: {
    fontSize: 17,
  },
  loginText: {
    color: "red",
    marginLeft: 5,
    fontWeight: "bold",
    fontSize: 17,
  },
});
