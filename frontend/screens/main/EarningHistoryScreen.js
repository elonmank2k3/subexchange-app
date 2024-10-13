import { View, Text, FlatList, Alert } from 'react-native'
import { GlobalStyles } from '../../constants/globalStyles'
import React, { useState, useContext, useCallback } from 'react'
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
    <View className="w-full px-primary items-center flex-1">
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
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}  
          renderItem={({ item }) => (
            <View className="flex-row justify-between bg-primary w-full py-primary mt-[10] rounded-lg px-primary flex-wrap">
              <View>
                <Text style={{fontSize: 20}} className="font-bold text-white">{capitalizeFirstLetter(item.activity)}</Text>
                <Text className="text-white">{item.time.replace("T", " ")}</Text>
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