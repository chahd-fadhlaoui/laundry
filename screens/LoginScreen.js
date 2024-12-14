import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  ScrollView,
  ImageBackground,
  Platform,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        setLoading(false);
      }
      if (authUser) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  const login = () => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      console.log("user credential", userCredential);
      const user = userCredential.user;
      console.log("user details", user);
    });
  };

  // Handling the keyboard show and hide events
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        // Handle any action when keyboard appears (optional)
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        // Handle any action when keyboard hides (optional)
      }
    );

    // Clean up listeners on unmount
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <ImageBackground
      source={require("../assets/login.jpg")} // Ensure this path is correct
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          keyboardShouldPersistTaps="handled"
        >
          {loading ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                flex: 1,
              }}
            >
              <Text style={{ marginRight: 10 }}>Loading</Text>
              <ActivityIndicator size="large" color={"red"} />
            </View>
          ) : (
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 60}
            >
              <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Sign In</Text>
                <Text style={styles.subHeader}>Sign In to your account</Text>
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.inputRow}>
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={24}
                    color="black"
                  />
                  <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor="black"
                    style={styles.inputField}
                  />
                </View>

                <View style={styles.inputRow}>
                  <Ionicons name="key-outline" size={24} color="black" />
                  <TextInput
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                    placeholder="Password"
                    placeholderTextColor="black"
                    style={styles.inputField}
                  />
                </View>

                <Pressable style={styles.loginButton} onPress={login}>
                  <Text style={styles.loginButtonText}>Login</Text>
                </Pressable>

                <Pressable
                  onPress={() => navigation.navigate("Register")}
                  style={styles.registerLink}
                >
                  <Text style={styles.registerText}>
                    Don't have an account? Sign Up
                  </Text>
                </Pressable>
              </View>
            </KeyboardAvoidingView>
          )}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "flex-start",
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
  },
  headerTitle: {
    fontSize: 35,
    color: "white",
    fontWeight: "600",
  },
  subHeader: {
    fontSize: 25,
    color: "black",
    fontWeight: "900",
  },
  inputContainer: {
    marginTop: 50,
    alignItems: "center",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  inputField: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginLeft: 13,
    width: 300,
    paddingVertical: 5,
  },
  loginButton: {
    width: 200,
    backgroundColor: "#318CE7",
    padding: 15,
    borderRadius: 7,
    marginTop: 50,
    alignSelf: "center",
  },
  loginButtonText: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },
  registerLink: {
    marginTop: 20,
  },
  registerText: {
    textAlign: "center",
    fontSize: 17,
    color: "gray",
    fontWeight: "500",
  },
});
