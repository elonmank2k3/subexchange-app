import { View, Text, StyleSheet, Pressable, Image, FlatList, Alert } from 'react-native'
import React, { useContext, useState, useCallback } from 'react'
import { GlobalStyles } from '../../constants/globalStyles'
import { ViewIcon, SubscribeIcon, LikeIcon, CommentIcon, AddIcon } from "../../components/SvgIcons"
import DeleteIcon from "../../assets/delete.png"
import { UserContext } from '../../store/user-context'
import { fetchUploadedVideos, deleteVideo } from '../../utils/http'
import { useFocusEffect } from '@react-navigation/native';
import { NotificationContext } from '../../store/notification-context'
import { DialogContext } from '../../store/dialog-context'

const ManageVideoScreen = ({ navigation }) => {
  const [videos, setVideos] = useState([])
  const [unusedCoin, setUnusedCoin] = useState(0)
  const userContext = useContext(UserContext)
  const notificationContext = useContext(NotificationContext)
  const dialogContext = useContext(DialogContext)

  useFocusEffect( // To trigger a function each time a user navigates to a new screen in React Navigation
    useCallback(() => {
      const fetchData = async () => {
        try {
          const data = await fetchUploadedVideos(userContext.googleUserId);
          if (data['stats'] === 'fail') {
            Alert.alert("Fail", data['message'])
            return
          }
          setVideos(data['uploadedVideos'].reverse() || [])
        } catch (error) {
          Alert.alert("Error", error.message)
        }
      };
    
      fetchData();
    }, [userContext.googleUserId])
  );
  
  async function handleClickDeleteButton(id) {
    let unusedCoin = videos.find((video) => video.id == id).unusedCoin
    if (unusedCoin <= 0) {
      try {
        const data = await deleteVideo(userContext.googleUserId, id)
        if (data['status'] === "fail") {
          Alert.alert("Fail", data['message'])
          return
        }
       setVideos(videos => videos.filter(video => video.id !== id))
      } catch (error) {
        Alert.alert("Error", error.message)
      }
    
      notificationContext.initialize("Delete video successfully")
    } else {
      setUnusedCoin(videos.find((video) => video.id == id).unusedCoin)

      dialogContext.initialize(
        "Delete video",
        `Your video is not completed. ${"\n"} We return unused coin for you`,
        unusedCoin,
        "Cancel",
        "Delete",
        () => () => dialogContext.closeDialog(),
        () => () => confirmDeleteVideo(id)
      )
      dialogContext.openDialog()
    }
  }

  async function confirmDeleteVideo(id) {
    dialogContext.closeDialog()
    try {
      const data = await deleteVideo(userContext.googleUserId, id)
      if (data['status'] === "fail") {
        Alert.alert("Fail", data['message'])
        return
      }
      setVideos(videos => videos.filter(video => video.id !== id))
    } catch (error) {
      Alert.alert("Error", error.message)
    }
    notificationContext.initialize("Delete video successfully")
    userContext.addCoin(unusedCoin)
  }

  function navigateAddVideoScreen() {
    navigation.navigate('Add Video Screen')
  }

  return (
    <>
      <View style={styles.container}>
        {
          videos.length == 0 ?
          <View style={{flex: 1, justifyContent: "center"}}>
            <Text style={{fontSize: 18}}>No uploaded video</Text>
          </View>:
          <FlatList 
            data={videos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View style={styles.thumbnailWrapper}>
                  <Image source={{uri: `https://i.ytimg.com/vi/${item.ytVideoId}/0.jpg`}} style={{width: "100%", height: '100%', resizeMode: 'contain'}}/>
                </View>
                <View style={[styles.statistic]}>
                  <View style={{flexDirection: 'row'}}>
                    {
                      <View style={styles.statisticItem}>
                        <ViewIcon width={16} height={16}/>
                        <Text style={{fontSize: 16, marginLeft: 5}}>{item.actualView + item.actualAdditionalActivityAmount}/{item.desiredView + item.desiredAdditionalActivityAmount}</Text>
                      </View>
                    }
                    {
                      item.additionalActivity !== "no option" && 
                      <View style={[styles.statisticItem, {marginLeft: 20}]}>
                        {item.additionalActivity === "subscribe" && <SubscribeIcon width={16} height={16} />}
                        {item.additionalActivity === "like" && <LikeIcon width={16} height={16} />}
                        {item.additionalActivity === "comment" && <CommentIcon width={16} height={16} />}
                        <Text style={{fontSize: 16, marginLeft: 5}}>{item.actualAdditionalActivityAmount}/{item.desiredAdditionalActivityAmount}</Text>
                      </View>
                    }
                  </View>
                  {
                    item.completed ?
                    <Text style={{color: "green"}}>Completed</Text>:
                    <Text style={{color: "red"}}>Running...</Text>
                  }
                </View>
                <Pressable style={{justifyContent: 'center'}} onPress={() => handleClickDeleteButton(item.id)}>
                  <Image source={DeleteIcon} style={{width: 118/7, height: 151/7}}/>
                </Pressable>
              </View>
            )}
          />
        }
        
        <Pressable 
          style={{width: '100%', alignItems: 'flex-end', position: 'absolute', bottom: 20, right: 20}}
          onPress={navigateAddVideoScreen}
        >
          <AddIcon width={50} height={50} color={GlobalStyles.primaryColor}/>
        </Pressable>
      </View>
    </>
  )
}

export default ManageVideoScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: GlobalStyles.spacing
  },
  thumbnailWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 480/6,
    height: 360/6, 
  },
  item: {
    backgroundColor: GlobalStyles.secondaryColor,
    borderRadius: 10,
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: GlobalStyles.spacing,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: GlobalStyles.spacing
  },
  statistic: {
    flex: 1,
    marginLeft: GlobalStyles.spacing,
    justifyContent: 'space-evenly',
  },
  statisticItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    justifyContent: 'flex-start'
  }
})