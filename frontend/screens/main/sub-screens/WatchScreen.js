import { View, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
import TemplateScreen from './TemplateScreen'
import { UserContext } from '../../../store/user-context'
import { ACTIVITY_TYPE } from '../../../constants/globalVariables'
import { DialogContext } from '../../../store/dialog-context'

const WatchScreen = () => {
    const userContext = useContext(UserContext)
    const dialogContext = useContext(DialogContext)
    const [video, setVideo] = useState({id: 0, coinPerView: 0, timePerView: 0})

    // async function fetchVideo() {
    //   try {
    //     const data = await loadVideo(userContext.googleUserId, ADDITIONAL_ACTIVITY.NO_OPTION);
    //     if (data['status'] == 'fail') {
    //       Alert.alert('Fail', data['message'])
    //       return
    //     }
        
    //     setVideo(data['videoInfo']);
    //   } catch (error) {
    //     Alert.alert("Error", error.message)
    //   }
    // }

    // async function skipOtherVideo() {
    //   try {
    //       const data = await skipVideo(userContext.googleUserId, video.id, ACTIVITY_TYPE.WATCH);
    //       if (data['status'] == 'fail') {
    //         Alert.alert("Error", data["message"])
    //         return
    //       }
    //       setVideo(data['videoInfo']);
    //     } catch (error) {
    //       Alert.alert("Error", error.message)
    //     }
    // }

    // async function clickWatchVideo() {
    //   try {
    //     const data = await interactVideo(userContext.googleUserId, video['id'], ACTIVITY_TYPE.WATCH)
    //     if (data['status'] == "fail") {
    //       Alert.alert("Fail", data.message)
    //       return
    //     }
    //   } catch (error) {
    //     Alert.alert("Error", error.message)
    //   }
     
    //   userContext.setActivityTracking({
    //     ytVideoId: video['ytVideoId'], 
    //     timePerView: video['timePerView'],
    //     activityStatus: ACTIVITY_STATUS.IN_PROGRESS
    //   })

    //   dialogContext.initialize(
    //     "Get Reward Coin",
    //     `Watch video successfully ${"\n"} Here is your reward`,
    //     video['coinPerView'], 
    //     "Get now", 
    //     "Get x2", 
    //     () => () => handleGetVideoReward(false),
    //     () => () => handleGetVideoReward(true)
    //   )
    // }

    // async function handleGetVideoReward(didGetDoubleCoin) {
    //   try {
    //     const data = await getVideoReward(userContext.googleUserId, ACTIVITY_TYPE.WATCH, didGetDoubleCoin);
    //     if (data['status'] == "fail") {
    //       Alert.alert("Fail", data['message'])
    //       return
    //     }
        
    //     userContext.addCoin(didGetDoubleCoin ? video['coinPerView'] * 2 : video['coinPerView']);
    //     userContext.setWatchToBonusCount(prevValue => prevValue += 1)

    //     fetchVideo()
    //   } catch (error) {
    //     Alert.alert("Error", error.message)
    //   } finally {
    //     dialogContext.closeDialog()
    //   }
    // }

    // useEffect(() => {
    //   if (userContext.googleUserId != null) {
    //     console.log("googleUserId: " + userContext.googleUserId)
    //     fetchVideo()
    //   }
    // }, [userContext.googleUserId]);

    return (
        <>
          <View style={styles.container}>
            <TemplateScreen activityType={ACTIVITY_TYPE.WATCH}
            />
          </View>
        </>
    )
}

export default WatchScreen

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '100%',
        width: '100%',
        alignItems: 'center'
    },
})