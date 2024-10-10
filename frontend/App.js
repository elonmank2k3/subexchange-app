import { StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import UserContextProvider from './store/user-context';
import DialogContextProvider from './store/dialog-context';
import NotificationContextProvider from './store/notification-context';
import MainNavigation from './navigations/MainNavigation';
import React from 'react';
// import 'expo-dev-client'

export default function App() {
  return (
    <UserContextProvider>
      <DialogContextProvider>
        <NotificationContextProvider>
          <NavigationContainer>
            <SafeAreaView style={[styles.container]}>
              <MainNavigation />
            </SafeAreaView>
          </NavigationContainer>
        </NotificationContextProvider>
      </DialogContextProvider>
    </UserContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },
});
