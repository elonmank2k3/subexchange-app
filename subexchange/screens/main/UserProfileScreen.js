import { View, Text, StyleSheet, Switch, Image } from 'react-native'
import React, { useState } from 'react'
import { GlobalStyles } from '../../constants/globalStyles'
import CoinIcon from "../../assets/coin.png"
import PremiumIcon from "../../assets/premium.png"
import Button from '../../components/Button'

const UserProfileScreen = () => {
  const [isLight, setIsLight] = useState('true')

  function toggleThemColor() {
    setIsLight(prevValue => !prevValue)
  }

  return (
    <View style={[styles.container]}>
      <View style={[styles.subContainer]}>
        <View style={styles.titleWrapper}><Text style={[styles.title, styles.bold]}>Information</Text></View>
        <View style={styles.body}>
          <View style={[styles.bodyTop]}>
            <Text 
              style={{textAlign: 'center', color: GlobalStyles.primaryColor, fontSize: 20, fontWeight: 'bold'}}>
                elonmank2k3@gmail.com
            </Text>
          </View>
          <View style={styles.bodyBottom}>
            <View style={{flex: 1, alignItems: 'center', }}>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Image source={CoinIcon} style={{width: 23, height: 23}}/>
                <Text style={[styles.bold, {color: '#FFC000', fontSize: 23, marginLeft: 10}]}>Coin</Text>
              </View>
              <View>
                <Text style={[styles.bold, {color: '#FFC000', fontSize: 23, marginLeft: 10}]}>600000</Text>
              </View>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Image source={PremiumIcon} style={{width: 30, height: 30}}/>
                <Text style={[styles.bold, {color: GlobalStyles.primaryColor, fontSize: 23, marginLeft: 10}]}>Premium</Text>
              </View>
              <View>
                <Text style={[styles.bold, {color: GlobalStyles.primaryColor, fontSize: 23, marginLeft: 10}]}>0h</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.subContainer]}>
        <View style={styles.titleWrapper}><Text style={[styles.title, styles.bold]}>Setting</Text></View>
        <View style={[styles.body]}>
          <View style={[styles.bodyTop]}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={[{color: GlobalStyles.primaryColor, fontSize: 17, fontWeight: 'bold'}]}>Theme color</Text>
            </View>
            <View style={[styles.switchWrapper, {flex: 1}]}>
              <Text style={[styles.textColor]}>Light</Text>
              <Switch 
                trackColor={{ false: "white", true: 'black' }}
                thumbColor={'#FFC000'}
                onValueChange={toggleThemColor}
                value={isLight}
                style={[{height: 20}]}
              />
              <Text style={[styles.textColor]}>Dark</Text>
            </View>
          </View>
          <View style={[styles.bodyBottom]}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={[{color: GlobalStyles.primaryColor, fontSize: 17, fontWeight: 'bold'}]}>Language</Text>
            </View>
            <View style={[{flex: 1, justifyContent: 'center', alignItems: 'center'}]}>
              <Text style={[styles.textColor]}>English</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.subContainer}>
        <View style={styles.titleWrapper}><Text style={[styles.title, styles.bold]}>Contact Us</Text></View>
        <View style={[styles.body, {paddingHorizontal: GlobalStyles.spacing}]}>
          <Text style={styles.textColor}>If you have any problems, please feel free to contact us by email</Text>
          <Text style={styles.textColor}><Text style={styles.bold}>Email</Text>:  subexchange@gmail.com</Text>
        </View>
      </View>
      <View style={[styles.subContainer, {justifyContent: 'center', flex: 1}]}>
        <Button title={"Log out"} />
      </View>
    </View>
  )
}

export default UserProfileScreen

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: GlobalStyles.spacing,
    alignItems: 'center'
  }, 
  subContainer: {
    marginTop: 30,
    alignItems: 'center',
    width: '100%',
  },
  body: {
    backgroundColor: GlobalStyles.secondaryColor,
    borderRadius: 10,
    paddingVertical: 10
  },
  bodyTop: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyBottom: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  grayBg: {
    backgroundColor: GlobalStyles.secondaryColor
  },
  switchWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textColor: {
    color: GlobalStyles.primaryColor
  },
  titleWrapper: {
    width: 150,
    backgroundColor: GlobalStyles.secondaryColor,
    borderTopLeftRadius: 10, borderTopRightRadius: 10
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    color: GlobalStyles.primaryColor
  },
  bold: {
    fontWeight: 'bold'
  },
  fullWidth: {
    width: '100%'
  }
})