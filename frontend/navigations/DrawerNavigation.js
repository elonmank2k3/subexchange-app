import { Pressable, StyleSheet } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useContext } from 'react'
import UserProfileScreen from '../screens/main/UserProfileScreen';
import EarnCoinScreen from '../screens/main/EarnCoinScreen';
import ManageVideoScreen from '../screens/main/ManageVideoScreen';
import BuyCoinScreen from '../screens/main/BuyCoinScreen';
import FAQsScreen from '../screens/main/FAQsScreen';
import EarningHistoryScreen from '../screens/main/EarningHistoryScreen';
import InviteFriendScreen from '../screens/main/InviteFriendScreen';
import { GlobalStyles } from '../constants/globalStyles';
import { UserIcon, EarnIcon, BuyIcon, VideoIcon, CrownIcon, FaqIcon, ListIcon, AddFriendIcon } from '../components/SvgIcons';
import UpdateVipScreen from '../screens/main/UpdateVIPScreen';
import CustomDrawerContent from '../components/CustomDrawerContent';
import Coin from '../components/Coin';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddVideoScreen from '../screens/main/AddVideoScreen';
import { Ionicons } from '@expo/vector-icons';
import InvitationRecordScreen from '../screens/main/InvitationRecordScreen';
import { UserContext } from '../store/user-context';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const ManageVideoScreenStack = ({ navigation }) => {
    const userContext = useContext(UserContext)
    
    return (
        <Stack.Navigator
          screenOptions={{
            headerTintColor: "white",
            headerStyle: { backgroundColor: GlobalStyles.primaryColor }, 
          }}
        >
          <Stack.Screen
            name="Manage Video Screen"
            component={ManageVideoScreen}
            options={{
                title: "Manage Video", 
                headerLeft: () => (
                    <Pressable onPress={() => navigation.toggleDrawer()}>
                        <Ionicons name="menu" size={24} color="white" style={{ marginLeft: 0, marginRight: 20 }} />
                    </Pressable>
                ),
                headerRight: () => (
                    <Coin amount={userContext.coin} size={25} marginRight={GlobalStyles.spacing}/>
                ),
            }}
          />
          <Stack.Screen
            name="Add Video Screen"
            component={AddVideoScreen}
            options={{ 
                title: "Add Video",
            }}
          />
        </Stack.Navigator>
      );
};

const InviteFriendScreenStack = ({ navigation }) => {
    return (
        <Stack.Navigator
          screenOptions={{
            headerTintColor: "white",
            headerStyle: { backgroundColor: GlobalStyles.primaryColor }, // Customize your header here
          }}
        >
          <Stack.Screen
            name="Invite Friend Screen"
            component={InviteFriendScreen}
            options={{
                title: "Invite Friend", 
                headerLeft: () => (
                    <Pressable onPress={() => navigation.toggleDrawer()}>
                        <Ionicons name="menu" size={24} color="white" style={{ marginLeft: 0, marginRight: 20 }} />
                    </Pressable>
                ),
            }}
          />
          <Stack.Screen
            name="Invitation Record Screen"
            component={InvitationRecordScreen}
            options={{ 
                title: "Invitation Record",
            }}
          />
        </Stack.Navigator>
      );
};

const DrawerNavigation = () => {
    const userContext = useContext(UserContext)

    return (
        <Drawer.Navigator 
        initialRouteName="Earn Coin"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.primaryColor },
            headerTintColor: 'white',
            sceneContainerStyle: { backgroundColor: 'white' },
            drawerContentStyle: { backgroundColor: GlobalStyles.secondaryColor },
            drawerInactiveTintColor: 'black',
            drawerActiveTintColor: GlobalStyles.primaryColor,
        }}
        >
            <Drawer.Screen
                name="Earn Coin"
                component={EarnCoinScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <EarnIcon color={color} width={size} height={size}/>),
                    headerRight: () => (
                        <Coin amount={userContext.coin} size={25} marginRight={GlobalStyles.spacing}/>
                    ),
                }}
            />
            <Drawer.Screen 
                name="Manage Video" 
                component={ManageVideoScreenStack} 
                options={{
                    drawerIcon: ({ color, size }) => (
                        <VideoIcon color={color} width={size} height={size}/>),
                    headerShown: false,
                }}
            />
            <Drawer.Screen 
                name="Update VIP" 
                component={UpdateVipScreen} 
                options={{
                    drawerIcon: ({ color, size }) => (
                        <CrownIcon color={color} width={size} height={size}/>)
                }}
            />
            <Drawer.Screen 
                name="Buy Coin" 
                component={BuyCoinScreen} 
                options={{
                    drawerIcon: ({ color, size }) => (
                        <BuyIcon color={color} width={size} height={size}/>)
                }}
            />
            <Drawer.Screen 
                name="FAQs" 
                component={FAQsScreen} 
                options={{
                    drawerIcon: ({ color, size }) => (
                        <FaqIcon color={color} width={size} height={size}/>)
                }}
            />
            <Drawer.Screen 
                name="Earning History" 
                component={EarningHistoryScreen} 
                options={{
                    drawerIcon: ({ color, size }) => (
                        <ListIcon color={color} width={size} height={size}/>)
                }}
            />
            <Drawer.Screen 
                name="Invite Friend" 
                component={InviteFriendScreenStack} 
                options={{
                    drawerIcon: ({ color, size }) => (
                        <AddFriendIcon color={color} width={size} height={size}/>),
                    headerShown: false
                }}
            />
            <Drawer.Screen
                name="User Profile"
                component={UserProfileScreen}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <UserIcon color={color} width={size} height={size}/>),
                }}
            />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation

const styles = StyleSheet.create({
    drawerIcon: {
        width: 50,
        height: 50,
        color: 'black'
    }
})

