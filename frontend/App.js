import { Platform, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import UserContextProvider from './store/user-context';
import DialogContextProvider from './store/dialog-context';
import NotificationContextProvider from './store/notification-context';
import MainNavigation from './navigations/MainNavigation';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import 'expo-dev-client'

export default function App() {
  if (Platform.OS === 'ios') {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>This app is not supported on iOS devices.</Text>
      </View>
    );
  }

  return (
    <UserContextProvider>
      <DialogContextProvider>
        <NotificationContextProvider>
          <NavigationContainer>
            <StatusBar style="auto"/>
            <SafeAreaView className="w-full flex-1">
              <MainNavigation />
            </SafeAreaView>
          </NavigationContainer>
        </NotificationContextProvider>
      </DialogContextProvider>
    </UserContextProvider>
  );
}