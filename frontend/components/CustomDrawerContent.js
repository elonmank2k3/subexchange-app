import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { GlobalStyles } from '../constants/globalStyles'; 
import CoinIcon from '../assets/coin.png'; 
import PremiumIcon from '../assets/premium.png'; 
import { UserContext } from '../store/user-context';
import { calculatePremiumTime } from '../utils/utilsFuncs';
import Button from './Button';
import tw from 'tailwind-react-native-classnames';

const CustomDrawerContent = (props) => {
  const userContext = useContext(UserContext)
  const [hours, setHours] = useState(0)

  useEffect(() => {
    const premiumTime = new Date(userContext.premiumTime)
    const timeNow = new Date()
    if (timeNow > premiumTime) {
      setHours(0)
    } else {
      const diffInMs = Math.abs(timeNow - premiumTime);
      const diffInHours = diffInMs / (1000 * 60 * 60);
      setHours(diffInHours.toFixed(0))
    }
  }, [userContext.premiumTime, userContext.googleUserId])

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        {
          !!userContext.picture && 
          <Image source={{uri: userContext.picture}} style={styles.picture} />
        }
        <Text style={styles.name}>{userContext.name}</Text>
        <View style={styles.iconGroup}>
          <View style={styles.iconWrapper}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={CoinIcon} style={styles.icon}/>
              <Text style={{color: "#FFC000", fontWeight: 'bold', fontSize: 20, marginLeft: 10}}>Coin</Text>
            </View>
            <View style={{marginRight: 10}}>
              <Text style={{color: "#FFC000", fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>{userContext.coin}</Text>
            </View>
          </View>
          <View style={[styles.iconWrapper, {marginTop: 10}]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={PremiumIcon} style={styles.icon}/>
              <Text style={{color: "white", fontWeight: 'bold', fontSize: 20, marginLeft: 10}}>Premium</Text>
            </View>
            <View style={{marginRight: 10}}>
              <Text style={{color: "white", fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>{hours}h</Text>
            </View>
          </View>
        </View>
      </View>
      <DrawerItemList {...props} />
      <View style={[tw`justify-center items-center mt-10`]}>
        <Button title={"Log out"}/>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    overflow: 'hidden'
  },
  iconGroup: {
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'black',
    width: '100%'
  },
  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  icon: {
    width: 30,
    height: 30
  },
  picture: {
    width: 60,
    height: 60,
    marginBottom: 10,
    borderRadius: 10
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: GlobalStyles.primaryColor,
  },
});

export default CustomDrawerContent;
