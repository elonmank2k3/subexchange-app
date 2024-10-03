import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import CoinLogo from '../assets/coin.png'
import { GlobalStyles } from '../constants/globalStyles'

const Coin = ({ amount, size=30, marginRight=0, marginLeft=0 }) => {
  return (
    <View style={[styles.container, {marginRight: marginRight, marginLeft: marginLeft}]}>
        <Text style={[styles.amount, {fontSize: size}]}>{amount}</Text>
        <Image source={CoinLogo} style={[styles.logo, {width: size, height: size}]}/>
    </View>
  )
}

export default Coin

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        // justifyContent: "center",
        alignItems: "center"
    },
    amount: {
        color: "#FFC000",
        fontWeight: "bold"
    },
    logo: {
        marginLeft: 10,
    },
})