import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigation = useNavigation();

  const register = async () => {
    if (email === "" || password === "" || phone === "") {
      Alert.alert(
        "Invalid Details",
        "Please fill all the details",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("user credential", userCredential);
      
      const user = userCredential.user;
      const myUserUid = user.uid;

      await setDoc(doc(db, "users", myUserUid), {
        email: user.email,
        phone: phone,
      });

      Alert.alert("Success", "Account created successfully");
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error("Error during registration:", error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <View style={styles.header}>
          <Text style={styles.title}>Register</Text>
          <Text style={styles.subtitle}>Create a new Account</Text>
        </View>

        <View style={styles.inputContainer}>
          <InputField
            icon={<MaterialCommunityIcons name="email-outline" size={24} color="black" />}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <InputField
            icon={<Ionicons name="key-outline" size={24} color="black" />}
            placeholder="Password"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
          />
          <InputField
            icon={<Feather name="phone" size={24} color="black" />}
            placeholder="Phone No"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        <Pressable onPress={register} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>

        <Pressable onPress={() => navigation.goBack()} style={styles.loginLink}>
          <Text style={styles.loginText}>Already have an account? Sign in</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const InputField = ({ icon, ...props }) => (
  <View style={styles.inputWrapper}>
    {icon}
    <TextInput {...props} style={styles.input} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    padding: 10,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  title: {
    fontSize: 20,
    color: "#662d91",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    marginTop: 8,
    fontWeight: "600",
  },
  inputContainer: {
    marginTop: 50,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginVertical: 10,
  },
  input: {
    fontSize: 18,
    marginLeft: 13,
    width: 300,
  },
  button: {
    width: 200,
    backgroundColor: "#318CE7",
    padding: 15,
    borderRadius: 7,
    marginTop: 50,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },
  loginLink: {
    marginTop: 20,
  },
  loginText: {
    textAlign: "center",
    fontSize: 17,
    color: "gray",
    fontWeight: "500",
  },
});

export default RegisterScreen;
