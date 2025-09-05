import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import CustomInput from '../components/CustomInput';
import { User } from '../lib/models/User';
import { authService } from '../services/AuthService';

export default function RegisterScreen() {
  const router = useRouter();
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const handleRegister = async () => {
    const newUser = new User(lastName, username, email, mobile);
    const result = await authService.register(newUser);
    alert(result.message);
    if (result.success) {
      router.push('/login');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background-dark p-6">
      <Text className="text-text-primary text-3xl font-bold mt-10">
        Create Your{'\n'}New Account
      </Text>

      {/* Profile Picture */}
      <View className="items-center my-8">
        <TouchableOpacity>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61' }}
            className="h-24 w-24 rounded-full"
          />
        </TouchableOpacity>
      </View>

      {/* Form */}
      <CustomInput iconName="account-outline" placeholder="Enter Your Last Name" value={lastName} onChangeText={setLastName} />
      <CustomInput iconName="account-circle-outline" placeholder="Enter Username" value={username} onChangeText={setUsername} />
      <CustomInput iconName="email-outline" placeholder="Enter Email Id" value={email} onChangeText={setEmail} />
      <CustomInput iconName="phone-outline" placeholder="Mobile Number" value={mobile} onChangeText={setMobile} />

      <TouchableOpacity onPress={handleRegister} className="bg-primary-green rounded-xl p-4 mt-8 items-center">
        <Text className="text-background-dark font-bold text-lg">NEXT</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}