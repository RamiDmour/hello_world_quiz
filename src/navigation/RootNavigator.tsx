import React from 'react';
import { GameScreen } from '../screens/game';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from './NavigationContainer';
import { MenuScreen } from '../screens/menu';
import { RatingsScreen } from '../screens/ratings';

export type RootStackParamList = {
  MainScreen: undefined;
  GameScreen: undefined;
  RatingsScreen: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

export const Root = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainScreen" component={MenuScreen} />
      <Stack.Screen name="GameScreen" component={GameScreen} />
      <Stack.Screen name="RatingsScreen" component={RatingsScreen} />
    </Stack.Navigator>
  );
};

export const RootNavigator = () => (
  <NavigationContainer>
    <Root />
  </NavigationContainer>
);
