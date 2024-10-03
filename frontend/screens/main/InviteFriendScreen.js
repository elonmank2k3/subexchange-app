import { View, Text, StyleSheet, Pressable, Image, Share } from 'react-native'
import * as Clipboard from 'expo-clipboard';
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { GlobalStyles } from '../../constants/globalStyles'
import CopyIcon from '../../assets/copy.png'
import ReferralNetworkImage from '../../assets/referral-network.png'
import Button from '../../components/Button'
import { UserContext } from '../../store/user-context';

const InviteFriendScreen = ({ navigation }) => {
  const [isCodeCopied, setIsCodeCopied] = useState(false)
  const userContext = useContext(UserContext)

  const onCopyReferralCode = async  () => {
    await Clipboard.setStringAsync(userContext.code);
    setIsCodeCopied(true)
    setTimeout(() => {
      setIsCodeCopied(false)
    }, 3000)
  };

  const onShare = () => {
    Share.share({
      title: 'SubExchange',
      message: '',
      url: 'https://play.google.com/store/apps/details?id=com.sub.exchange'
    })
  }

  function navigateToInvitationRecordScreen() {
    navigation.navigate('Invitation Record Screen')
  }

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Image source={ReferralNetworkImage} style={{width: 3693/25, height: 3024/25}}/>
      </View>
      <View style={styles.subContainer}>
       <Text style={{textAlign: 'justify', fontSize: 18}}>When your friend enters your referral code, both you and your friend will receive 300 coins and 1 day VIP account for trial.
       </Text>
      </View>
      <View style={[styles.subContainer]}>
       <View>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>Ways to invite friends:</Text>
          <Text style={{fontSize: 16}}>    1. Share app link to your friend or on social media group</Text>
          <Text style={{fontSize: 16}}>    2. Friend enters your referral code then both of you will receive bonus</Text>
       </View>
      </View>
      <View 
        style={[styles.subContainer, 
          {backgroundColor: GlobalStyles.secondaryColor, borderRadius: 10, width: '100%', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10}]}
      >
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Your referral code</Text>
        <View style={[{position: 'relative', alignItems: 'center', marginTop: 10}]}> 
          <Text style={{fontSize: 25, fontWeight: 'bold', color: GlobalStyles.primaryColor}}>{userContext.code}</Text>
          {
            isCodeCopied ? 
            <View style={[{position: 'absolute', right: -50, height: '100%', justifyContent: 'center'}]}>
              <Text style={{textAlign: 'center', transform: [{translateX: 10}]}}>Copied</Text>
            </View>:
            <Pressable style={[{position: 'absolute', right: -50, height: '100%', justifyContent: 'center'}]} onPress={onCopyReferralCode}>
              <Image source={CopyIcon} style={{width: 20, height: 20}}/>
            </Pressable>
          }
        </View>
      </View>
      <View style={styles.subContainer}>
        <Button title={"Invite"} paddingHorizontal={10} paddingVertical={5} onPress={() => onShare()}/>
      </View>
      <Pressable style={styles.subContainer} onPress={navigateToInvitationRecordScreen}>
        <Text style={{color: GlobalStyles.primaryColor, textDecorationLine: 'underline'}}>View invitation records</Text>
      </Pressable>
    </View>
  )
}

export default InviteFriendScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    paddingHorizontal: GlobalStyles.spacing
  },
  subContainer: {
    marginTop: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
})