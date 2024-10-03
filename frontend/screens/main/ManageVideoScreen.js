import { View, Text, StyleSheet, Pressable, Image, FlatList } from 'react-native'
import React, { useContext, useEffect, useState, useCallback } from 'react'
import { GlobalStyles } from '../../constants/globalStyles'
import { ViewIcon, SubscribeIcon, LikeIcon, CommentIcon, AddIcon } from "../../components/SvgIcons"
import DeleteIcon from "../../assets/delete.png"
import Modal from "../../components/Modal"
import { UserContext } from '../../store/user-context'
import { fetchUploadedVideos, deleteVideo } from '../../utils/http'
import { useFocusEffect } from '@react-navigation/native';
import Alert from '../../components/Alert'

const ManageVideoScreen = ({ navigation }) => {
  const [videos, setVideos] = useState([])
  const [isModalShown, setIsModalShown] = useState(false)
  const [selectedId, setSelectedId] = useState(0)
  const [unusedCoin, setUnusedCoin] = useState(0)
  const [alertMessage, setAlertMessage] = useState("")
  const [isAlertShown, setIsAlertShown] = useState(false)
  const userContext = useContext(UserContext)

  useFocusEffect( // To trigger a function each time a user navigates to a new screen in React Navigation
    useCallback(() => {
      const fetchData = async () => {
        try {
          const data = await fetchUploadedVideos(userContext.googleUserId);
          setVideos(data['uploadedVideos'].reverse() || [])
        } catch (error) {
          console.error("Error fetching earning histories: ", error);
        }
      };
    
      fetchData();
    }, [userContext.googleUserId])
  );
  
  function handleClickDeleteButton(id) {
    let unusedCoin = videos.find((video) => video.id == id).unusedCoin
    if (unusedCoin <= 0) {
      setVideos(videos => videos.filter(video => video.id !== selectedId))
      deleteVideo(userContext.googleUserId, selectedId)
      setAlertMessage("Delete video successfully")
      setIsAlertShown(true)
      setTimeout(() => setIsAlertShown(false), 2000)
    } else {
      setSelectedId(id)
      setUnusedCoin(videos.find((video) => video.id == id).unusedCoin)
      toggleConfirmDeleteModal()
    }
  }

  function toggleConfirmDeleteModal() {
    setIsModalShown(prevValue => !prevValue)
  }

  function confirmDeleteVideo() {
    setVideos(videos => videos.filter(video => video.id !== selectedId))
    deleteVideo(userContext.googleUserId, selectedId)
    setAlertMessage("Delete video successfully")
    setIsAlertShown(true)
    setTimeout(() => setIsAlertShown(false), 2000)
    userContext.addCoin(unusedCoin)
    toggleConfirmDeleteModal()
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
            <Text style={{fontSize: 17}}>No earning history</Text>
          </View>:
          <FlatList 
            data={videos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View style={styles.thumbnailWrapper}>
                  <Image source={{uri: `https://i.ytimg.com/vi/${item.ytVideoId}/hq720.jpg`}} style={{width: 1040/12, height: 585/12}}/>
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
      {
        isModalShown &&
        <Modal 
          title={'Delete Video'} 
          message={`Your video is not completed. ${"\n"} We return unused coin for you`}
          rewardCoin={unusedCoin}
          buttonTitle01={'Cancel'}
          buttonTitle02={'Delete'}
          onPress01={toggleConfirmDeleteModal}
          onPress02={confirmDeleteVideo}
          messageAlign={'center'}
        />
      }
      {
        isAlertShown &&
        <Alert
          message={alertMessage}
        />
      }
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
    alignItems: 'center'
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