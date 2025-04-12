import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import MainTabNavigator from './MainTabNavigator';
import AuthNavigator from './AuthNavigator';
import { StatusBar } from 'react-native';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  // TODO: Add auth state check
  const isAuthenticated = true; // Set to true temporarily for testing

  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.background}
      />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={MainTabNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
