import { View, Text, Image } from 'react-native'
import React from 'react'
import Logo from "../../assets/logo.png"
import tw from 'tailwind-react-native-classnames'
import { GlobalStyles } from '../../constants/globalStyles'

const LogoShownScreen = () => {
  return (
    <View style={tw`h-full w-full justify-center items-center`}>
        <Image source={Logo} style={{width: 100, height: 100, marginTop: 100}}/>
        <Text style={{fontWeight: "bold", fontSize: 30, color: GlobalStyles.primaryColor}}>SubExchange</Text>
    </View>
  )
}

export default LogoShownScreen