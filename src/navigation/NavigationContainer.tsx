import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer as RNNavigationContainer } from '@react-navigation/native';
import { MyTheme } from './MyTheme';
export const NavigationContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <SafeAreaProvider>
    <StatusBar />
    <RNNavigationContainer theme={MyTheme}>{children}</RNNavigationContainer>
  </SafeAreaProvider>
);
