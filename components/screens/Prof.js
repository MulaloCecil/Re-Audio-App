import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import { getAuth, updateProfile, signOut } from "firebase/auth";

const Profile = ({ navigation }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;

    const userRef = doc(db, "Users", userId);
    getDoc(userRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          setName(userData.Name);
          setPhoneNumber(userData.Phone);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      await updateProfile(user, {
        displayName: name,
      });

      const userId = user.uid;
      const userRef = doc(db, "Users", userId);

      setDoc(userRef, {
        Name: name,
        Phone: phoneNumber,
      })
        .then(() => {
          setIsEditing(false);
          Alert.alert(
            "Profile Updated",
            "Your profile has been updated successfully."
          );
        })
        .catch((error) => {
          console.error("Error updating user data:", error);
        });
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Profile update failed. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error logging out:", error);
      Alert.alert("Error", "Logout failed. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={30} color="#000000" />
      </TouchableOpacity>
      <Text style={styles.heading}>User Profile</Text>

      <Text style={styles.title3}>Full Names</Text>
      <TextInput
        style={styles.input1}
        placeholder="Name"
        value={name}
        cursorColor={"black"}
        editable={isEditing}
        onChangeText={(text) => setName(text)}
      />

      <Text style={styles.title3}>Phone No.</Text>
      <TextInput
        style={styles.input1}
        placeholder="Phone"
        value={phoneNumber}
        cursorColor={"black"}
        editable={isEditing}
        onChangeText={(text) => setPhoneNumber(text)}
      />

      {isEditing ? (
        <TouchableOpacity onPress={handleUpdateProfile}>
          <View style={styles.updateButton}>
            <Text style={styles.updateButtonText}>Update Profile</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => setIsEditing(true)}>
          <View style={styles.updateButton}>
            <Text style={styles.updateButtonText}>Edit Profile</Text>
          </View>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={handleLogout}>
        <View style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  title3: {
    marginTop: 20,
    marginBottom: 10,
  },
  input1: {
    height: 45,
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  updateButton: {
    backgroundColor: "#000000",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
  },
  updateButtonText: {
    fontSize: 18,
    color: "#FFFFFF",
  },
  logoutButton: {
    backgroundColor: "red",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    fontSize: 18,
    color: "#FFFFFF",
  },
});

export default Profile;
