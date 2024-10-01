import { View, Text, StyleSheet, FlatList, Pressable, TouchableOpacity } from 'react-native'
import { GlobalStyles } from '../../constants/globalStyles'
import React from 'react'
import Coin from '../../components/Coin'

const EarningHistoryScreen = () => {
  const earningHistories = [
    {
      id: 1, 
      activity: 'Watch Ads',
      rewardCoin: 60,
      time: "2024-09-23T21:04:12"
    },
    {
      id: 2, 
      activity: 'Comment Video',
      rewardCoin: 120,
      time: "2024-09-23T21:05:15"
    },
    {
      id: 3, 
      activity: 'Like Video',
      rewardCoin: 600,
      time: "2024-09-23T21:06:20"
    },
  ]

  return (
    <View style={styles.container}>
      <FlatList 
        data={earningHistories}
        keyExtractor={item => item.id.toString()}  
        renderItem={({ item }) => (
          <View style={[styles.item]}>
            <View>
              <Text style={styles.activity}>{item.activity}</Text>
              <Text style={styles.time}>{item.time.replace("T", "")}</Text>
            </View>
            <Coin amount={item.rewardCoin} size={25}/>
          </View>
        )}
      />
    </View>
  )
}

export default EarningHistoryScreen

const styles = StyleSheet.create({
  container: {
      width: '100%',
      paddingHorizontal: GlobalStyles.spacing,
      alignItems: 'center',
      flex: 1
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
    flexWrap: 'wrap'
  },
  activity: {
    fontSize: 18, 
    fontWeight: 'bold',
    color: 'white'
  },
  time: {
    color: "white"
  }
})