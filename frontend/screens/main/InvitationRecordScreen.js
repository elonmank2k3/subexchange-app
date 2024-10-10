import { View, Text, StyleSheet, Image, FlatList, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import CoinIcon from "../../assets/coin.png"
import FriendIcon from "../../assets/friend.png"
import { GlobalStyles } from '../../constants/globalStyles'
import { UserContext } from '../../store/user-context'
import { fetchInvitationRecords } from '../../utils/http'

const InvitationRecordScreen = () => {
  const [invitees, setInvitees] = useState([])
  const userContext = useContext(UserContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchInvitationRecords(userContext.googleUserId);
        if (data['stats'] === 'fail') {
          Alert.alert("Fail", data['message'])
          return
        }
        setInvitees(data['invitationRecords'] || [])
      } catch (error) {
        Alert.alert("Error", error.message)
      }
    };
  
    fetchData();
  }, [userContext.googleUserId]);

  return (
    <View style={styles.container}>
      <View style={styles.statistics}>
        <View style={{flex: 1, alignItems: 'center', }}>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Image source={CoinIcon} style={{width: 23, height: 23}}/>
            <Text style={[{color: '#FFC000', fontSize: 23, marginLeft: 10, fontWeight: 'bold'}]}>Coin</Text>
          </View>
          <View>
            <Text style={[{color: '#FFC000', fontSize: 23, marginLeft: 10, fontWeight: 'bold'}]}>{userContext.coin}</Text>
          </View>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Image source={FriendIcon} style={{width: 30, height: 22}}/>
            <Text style={[{color: GlobalStyles.primaryColor, fontSize: 23, marginLeft: 10, fontWeight: 'bold'}]}>Friends</Text>
          </View>
          <View>
            <Text style={[{color: GlobalStyles.primaryColor, fontSize: 23, marginLeft: 10, fontWeight: 'bold'}]}>{invitees.length}</Text>
          </View>
        </View>
      </View>
      {
        invitees.length == 0 ?
        <View style={{marginTop: GlobalStyles.sp, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 18}}>No friends. Invite to earn more</Text>
        </View>:
        <FlatList 
          data={invitees}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>{item.inviteeEmail}</Text>            
              <Text style={{color: 'white'}}>{String(item.time).replace("T", " ")}</Text>            
            </View>
          )}
          style={{width: '100%'}}
        />
      }
    </View>
  )
}

export default InvitationRecordScreen

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingHorizontal: GlobalStyles.spacing
  },
  statistics: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyles.secondaryColor,
    paddingVertical: 10,
    borderRadius: 10
  },
  item: {
    marginTop: GlobalStyles.spacing,
    width: '100%',
    paddingVertical: GlobalStyles.spacing,
    paddingHorizontal: GlobalStyles.spacing,
    backgroundColor: GlobalStyles.primaryColor,
    borderRadius: 10
  }
})