import { View, Text, StyleSheet, FlatList, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../constants/globalStyles'
import Coin from '../../components/Coin'

const BuyCoinScreen = () => {
  const items = [
    { id: 1, amount: 6000, price: 1 },
    { id: 2, amount: 10000, price: 2 },
    { id: 3, amount: 30000, price: 6 },
    { id: 4, amount: 100000, price: 18 },
    { id: 5, amount: 200000, price: 35 },
  ]

  return (
    <View style={styles.container}>
      <FlatList 
        data={items}
        keyExtractor={item => item.id.toString()}  
        renderItem={({ item }) => (
          <Pressable 
            style={({ pressed }) => [styles.item, pressed && styles.hover]}
          >
            <Coin amount={item.amount} size={25}/>
            <Text style={{color: "white", fontSize: 25, fontWeight: 'bold'}}>${item.price}</Text>
          </Pressable>
        )}
      />
      <Text style={{marginTop: 20}}>
        For any purchase question or problem, free free to contact us through email <Text style={{fontWeight: "bold"}}>subexchange@gmail.com</Text>
      </Text>
    </View>
  )
}

export default BuyCoinScreen

const styles = StyleSheet.create({
  container: {
      width: '100%',
      paddingHorizontal: GlobalStyles.spacing,
      alignItems: 'center'
  },
  item: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: GlobalStyles.primaryColor, 
    width: '100%', 
    paddingVertical: 15, 
    marginTop: 20,
    borderRadius: 10, 
    paddingHorizontal: GlobalStyles.spacing,
  },
  hover: {
    backgroundColor: "#5A37FA"
  }
})