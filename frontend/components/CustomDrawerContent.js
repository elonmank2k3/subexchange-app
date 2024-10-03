import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { GlobalStyles } from '../constants/globalStyles'; 
import Logo from '../assets/logo.png'; 

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.appName}>SubExchange</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  appName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: GlobalStyles.primaryColor,
  },
});

export default CustomDrawerContent;
