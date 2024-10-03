import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View} from 'react-native';
import DrawerNavigation from './navigations/DrawerNavigation';
import { NavigationContainer } from '@react-navigation/native';
import UserContextProvider from './store/user-context';

export default function App() {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <View style={[styles.container]}>
          <DrawerNavigation />
        </View>
      </NavigationContainer>
    </UserContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
});
