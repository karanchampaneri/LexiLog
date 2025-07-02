import { useState } from "react";
import {
  YStack,
  XStack,
  Input,
  Button,
  Text,
  Separator,
  Spinner,
  prevent,
} from "tamagui";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase"; // Adjust the import path as needed

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // true for login, false for signup
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleAuth = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      }

      // Authentication state will be automatically handled by onAuthStateChanged
    } catch (err) {
      setErrorMsg(err.message);
    }
    setLoading(false);
  };

  return (
    <YStack
      f={1}
      justifyContent="center"
      alignItems="center"
      px="$4"
      backgroundColor="#fefaf4"
      gap="$4"
    >
      <Text fontSize="$8" fontWeight="800" textAlign="center" color="$color">
        {isLogin ? "Welcome to LexiLog!" : "Create an account"}
      </Text>

      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        size="$5"
        width="100%"
        borderRadius="$6"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        size="$5"
        width="100%"
        borderRadius="$6"
        secureTextEntry
      />

      {errorMsg ? (
        <Text color="$red10" fontSize="$3" textAlign="center">
          {errorMsg}
        </Text>
      ) : null}

      <Button
        onPress={handleAuth}
        theme="active"
        size="$5"
        borderRadius="$10"
        width="100%"
        fontWeight="700"
        disabled={loading}
      >
        {loading ? <Spinner color="white" /> : isLogin ? "Log in" : "Sign up"}
      </Button>

      <XStack gap="$2" justifyContent="center">
        <Text fontSize="$3" color="$color">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
        </Text>
        <Text
          fontSize="$3"
          color="$blue10"
          fontWeight="bold"
          onPress={() => setIsLogin((prev) => !prev)}
          cursor="pointer"
        >
          {isLogin ? "Sign up" : "Log in"}
        </Text>
      </XStack>
    </YStack>
  );
}
