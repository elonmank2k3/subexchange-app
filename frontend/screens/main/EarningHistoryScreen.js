import { View, Text, StyleSheet, FlatList, Alert } from 'react-native'
import { GlobalStyles } from '../../constants/globalStyles'
import React, { useEffect, useState, useContext, useCallback } from 'react'
import Coin from '../../components/Coin'
import { UserContext } from '../../store/user-context'
import { capitalizeFirstLetter } from '../../utils/utilsFuncs'
import { fetchEarningHistories } from "../../utils/http"
import { useFocusEffect } from '@react-navigation/native'

const EarningHistoryScreen = () => {
  const [earningHistories, setEarningHistories] = useState([])
  const userContext = useContext(UserContext);

  useFocusEffect( // To trigger a function each time a user navigates to a new screen in React Navigation
    useCallback(() => {
      const fetchData = async () => {
        try {
          const data = await fetchEarningHistories(userContext.googleUserId);
          if (data['stats'] === 'fail') {
            Alert.alert("Fail", data['message'])
            return
          }
          setEarningHistories(data['earningHistories'] || [])
        } catch (error) {
          Alert.alert("Error", error.message)
        }
      };
    
      fetchData();
    }, [userContext.googleUserId])
  );

  return (
    <View style={styles.container}>
      <View style={{marginTop: GlobalStyles.spacing}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>List 20 latest earning histories</Text>
      </View>
      {
        earningHistories.length == 0 ?
        <View style={{flex: 1, justifyContent: "center"}}>
          <Text style={{fontSize: 18}}>No earning history</Text>
        </View>:
        <FlatList 
          data={earningHistories}
          keyExtractor={item => item.id.toString()}  
          renderItem={({ item }) => (
            <View style={[styles.item]}>
              <View>
                <Text style={styles.activity}>{capitalizeFirstLetter(item.activity)}</Text>
                <Text style={styles.time}>{item.time.replace("T", " ")}</Text>
              </View>
              <Coin amount={item.rewardCoin} size={25}/>
            </View>
          )}
        />
      }
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