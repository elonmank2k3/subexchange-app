import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, } from 'react-native';
import Button from './components/Button';
import Modal from './components/Modal';
import { GlobalStyles } from './constants/globalStyles';
import AuthScreen from './screens/start/AuthScreen';
import CodeInputScreen from './screens/start/CodeInputScreen';
import IntroScreen from './screens/start/IntroScreen';
import UserProfileScreen from './screens/main/UserProfileScreen';
import DrawerNavigation from './navigations/DrawerNavigation';
import AddVideoScreen from './screens/main/AddVideoScreen';
import InviteFriendScreen from './screens/main/InviteFriendScreen';
import InvitationRecordScreen from './screens/main/InvitationRecordScreen';

export default function App() {
  return (
    <View style={[styles.container]}>
      {/* <AuthScreen /> */}
      {/* <CodeInputScreen /> */}
      {/* <IntroScreen /> */}
      {/* <UserProfileScreen /> */}
      <DrawerNavigation />
      {/* <AddVideoScreen /> */}
      {/* <InvitationRecordScreen /> */}
      {/* <Modal title="Collect Reward Coin" 
        message={"Watch video successfully. Here is your reward. You can get double coin."}
        rewardCoin={400}
        buttonTitle01={"Cancel"}
        buttonTitle02={"Collect"}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
});
