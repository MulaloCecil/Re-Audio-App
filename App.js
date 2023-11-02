import { StyleSheet } from "react-native";
import { ProfileProvider } from "./components/Profile/Profile";
import Login from "./components/auth/Login";
import Home from "./components/screens/Home";
import Register from "./components/auth/Register";
import Profile from "./components/screens/Prof";
import Prof from "./components/screens/Prof";
import Recordings from "./components/screens/Recordings";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Forgotpassword from "./components/auth/ForgotPassword";

const Stack = createStackNavigator();
const options = { title: "", headerShown: false };
export default function App() {
  return (
    <ProfileProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={options} />
          <Stack.Screen name="Home" component={Home} options={options} />
          <Stack.Screen
            name="ForgotPassword"
            component={Forgotpassword}
            options={options}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={options}
          />
          <Stack.Screen name="Profile" component={Profile} options={options} />
          <Stack.Screen
            name="Recordings"
            component={Recordings}
            options={options}
          />

          <Stack.Screen name="Prof" component={Prof} options={options} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProfileProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});
