import { View, Text, Image } from 'react-native'
import React from 'react'
import CoinLogo from '../assets/coin.png'

const Coin = ({ amount, size=30, marginRight=0, marginLeft=0 }) => {
  return (
    <View style={{flexDirection: "row", alignItems: "center", marginRight: marginRight, marginLeft: marginLeft}}>
        <Text style={{fontSize: size, color: "#FFC000", fontWeight: "bold"}}>{amount}</Text>
        <Image source={CoinLogo} style={{width: size, height: size, marginLeft: 20}}/>
    </View>
  )
}

export default Coin