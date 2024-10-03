import { View, Text, StyleSheet, FlatList, Pressable, TouchableOpacity } from 'react-native'
import { GlobalStyles } from '../../constants/globalStyles'
import React, { useEffect, useState, useContext } from 'react'
import Coin from '../../components/Coin'
import { UserContext } from '../../store/user-context'
import { capitalizeFirstLetter } from '../../utils/utilsFuncs'
import { fetchEarningHistories } from "../../utils/http"

const EarningHistoryScreen = () => {
  const [earningHistories, setEarningHistories] = useState([])
  const userContext = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEarningHistories(userContext.googleUserId);
        setEarningHistories(data['earningHistories'] || [])
      } catch (error) {
        console.error("Error fetching earning histories: ", error);
      }
    };
  
    fetchData();
  }, [userContext.googleUserId]);
  

  return (
    <View style={styles.container}>
      <View style={{marginTop: GlobalStyles.spacing}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>List 20 latest earning histories</Text>
      </View>
      {
        earningHistories.length == 0 ?
        <View style={{flex: 1, justifyContent: "center"}}>
          <Text style={{fontSize: 17}}>No earning history</Text>
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