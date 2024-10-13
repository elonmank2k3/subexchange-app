import { View, Text, Image } from 'react-native'
import React from 'react'
import Logo from "../../assets/logo.png"
import { GlobalStyles } from '../../constants/globalStyles'

const LogoShownScreen = () => {
  return (
    <View className="h-full w-full justify-center items-center">
        <Image source={Logo} style={{width: 100, height: 100, borderRadius: 10}}/>
        <Text style={{fontWeight: "bold", fontSize: 30, color: GlobalStyles.primaryColor}}>SubExchange</Text>
    </View>
  )
}

export default LogoShownScreen