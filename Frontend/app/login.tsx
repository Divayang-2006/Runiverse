import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import CustomInput from '@/components/CustomInput';
// import { authService } from '../services/AuthService'; // Assuming this service exists

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // A simple mock of authService.login
    // In a real app, you would call your actual auth service here.
    if (email && password) {
        // const result = await authService.login(email, password);
        // if (result.success) {
            Alert.alert("Login Successful", "Welcome back!");
            // This is the key part: replace the auth stack with the main app (tabs).
            router.replace('/(tabs)');
        // } else {
        //     Alert.alert("Login Failed", result.message);
        // }
    } else {
        Alert.alert("Login Failed", "Please enter email and password.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background-dark p-6">
      <Text className="text-text-primary text-3xl font-bold mt-10">
        Welcome Back!
      </Text>
      <Text className="text-text-secondary text-lg mt-2">
        Sign in to continue
      </Text>

      <View className="mt-12">
        <CustomInput
          iconName="email-outline"
          placeholder="Enter Email Id"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <CustomInput
          iconName="lock-outline"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity onPress={handleLogin} className="bg-primary-green rounded-xl p-4 mt-8 items-center">
        <Text className="text-background-dark font-bold text-lg">LOGIN</Text>
      </TouchableOpacity>

      <View className="flex-row justify-center mt-6">
        <Text className="text-text-secondary">Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text className="text-primary-yellow font-bold">Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}