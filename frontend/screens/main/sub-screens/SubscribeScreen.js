import { View, StyleSheet, Alert } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import TemplateScreen from './TemplateScreen'
import { UserContext } from '../../../store/user-context'
import { ACTIVITY_STATUS, ADDITIONAL_ACTIVITY, ACTIVITY_TYPE } from '../../../constants/globalVariables'
import { skipVideo, loadVideo, getVideoReward, interactVideo } from '../../../utils/http'
import { DialogContext } from '../../../store/dialog-context'

const SubscribeScreen = () => {
  const userContext = useContext(UserContext)
  const dialogContext = useContext(DialogContext)
  // const [video, setVideo] = useState({id: 0, coinPerView: -60, timePerView: 0, ytVideoId: ""})

  // async function fetchVideo() {
  //   try {
  //     const data = await loadVideo(userContext.googleUserId, ADDITIONAL_ACTIVITY.SUBSCRIBE);
  //     if (data['status'] == 'fail') {
  //       Alert.alert('Fail', data['message'])
  //       setVideo({id: 0, coinPerView: -60, timePerView: 0, ytVideoId: ""});
  //       return
  //     }
      
  //     setVideo(data['videoInfo']);
  //   } catch (error) {
  //     Alert.alert("Error", error.message)
  //   }
  // }

  // async function skipOtherVideo() {
  //   try {
  //       const data = await skipVideo(userContext.googleUserId, video.id, ACTIVITY_TYPE.SUBSCRIBE);
  //       if (data['status'] == 'fail') {
  //         Alert.alert("Fail", data["message"])
  //         setVideo({id: 0, coinPerView: -60, timePerView: 0, ytVideoId: ""});
  //         return
  //       }
  //       setVideo(data['videoInfo']);
  //     } catch (error) {
  //       Alert.alert("Error", error.message)
  //     }
  // }

  // async function clickWatchVideo() {
  //   try {
  //     const data = await interactVideo(userContext.googleUserId, video['id'], ACTIVITY_TYPE.SUBSCRIBE)
  //     if (data['status'] == "fail") {
  //       Alert.alert("Fail", data.message)
  //       return
  //     }
  //   } catch(error) {
  //     Alert.alert("Error", error.message)
  //   }
   
  //   userContext.setActivityTracking({
  //     ytVideoId: video['ytVideoId'], 
  //     timePerView: video['timePerView'],
  //     activityStatus: ACTIVITY_STATUS.IN_PROGRESS
  //   })

  //   dialogContext.initialize(
  //     "Get Reward Coin",
  //     `Subscribe video successfully ${"\n"} Here is your reward`,
  //     video['coinPerView'] + 60, 
  //     "Get now", 
  //     "Get x2", 
  //     () => () => handleGetVideoReward(false), 
  //     () => () => handleGetVideoReward(true),
  //   )
  // }

  // async function handleGetVideoReward(didGetDoubleCoin) {
  //   try {
  //     const data = await getVideoReward(userContext.googleUserId, ACTIVITY_TYPE.SUBSCRIBE, didGetDoubleCoin);
  //     if (data['status'] == "fail") {
  //       Alert.alert("Fail", data['message'])
  //       return
  //     }
      
  //     userContext.addCoin(didGetDoubleCoin ? (video['coinPerView'] + 60) * 2 : (video['coinPerView'] + 60));
  //     userContext.setWatchToBonusCount(prevValue => prevValue += 1)

  //     fetchVideo()
  //   } catch (error) {
  //     Alert.alert("Error", error.message)
  //   } finally {
  //     dialogContext.closeDialog()
  //   }
  // }

  // useEffect(() => {
  //   fetchVideo()
  // }, [userContext.googleUserId]);

  return (
      <>
        <View className="h-full w-full items-center">
          <TemplateScreen activityType={ACTIVITY_TYPE.SUBSCRIBE}/>
        </View>
      </>
  )
}

export default SubscribeScreen