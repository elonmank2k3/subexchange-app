import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import CoinIcon from "../../assets/coin.png"
import FriendIcon from "../../assets/friend.png"
import { GlobalStyles } from '../../constants/globalStyles'

const InvitationRecordScreen = () => {
  const [invitees, setInvitees] = useState([
    {id: 1, email: "invitee01@gmail.com", created_at: "2024-09-31T21:22:04"},
    {id: 2, email: "invitee02@gmail.com", created_at: "2024-09-31T22:11:16"},
    {id: 3, email: "invitee03@gmail.com", created_at: "2024-09-31T23:41:51"}
  ])

  return (
    <View style={styles.container}>
      <View style={styles.statistics}>
        <View style={{flex: 1, alignItems: 'center', }}>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Image source={CoinIcon} style={{width: 23, height: 23}}/>
            <Text style={[{color: '#FFC000', fontSize: 23, marginLeft: 10, fontWeight: 'bold'}]}>Coin</Text>
          </View>
          <View>
            <Text style={[{color: '#FFC000', fontSize: 23, marginLeft: 10, fontWeight: 'bold'}]}>600000</Text>
          </View>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Image source={FriendIcon} style={{width: 30, height: 22}}/>
            <Text style={[{color: GlobalStyles.primaryColor, fontSize: 23, marginLeft: 10, fontWeight: 'bold'}]}>Friends</Text>
          </View>
          <View>
            <Text style={[{color: GlobalStyles.primaryColor, fontSize: 23, marginLeft: 10, fontWeight: 'bold'}]}>0h</Text>
          </View>
        </View>
      </View>
      {
        invitees.length == 0 ?
        <View style={{marginTop: GlobalStyles.sp}}>
          <Text>No friends. Invite to earn more</Text>
        </View>:
        <FlatList 
          data={invitees}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>{item.email}</Text>            
              <Text style={{color: 'white'}}>{String(item.created_at).replace("T", " ")}</Text>            
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