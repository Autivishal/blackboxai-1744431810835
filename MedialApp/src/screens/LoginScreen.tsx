import React from 'react';
import { View, Text, Button } from 'react-native';
import { colors } from '../theme/colors';

const LoginScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>Login Screen</Text>
      <Button title="Login with Google" onPress={() => {}} />
      <Button title="Login with OTP" onPress={() => {}} />
    </View>
  );
};

export default LoginScreen;
