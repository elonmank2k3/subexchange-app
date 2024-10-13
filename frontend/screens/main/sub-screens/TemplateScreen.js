import { View, Text, StyleSheet, Image, Pressable, Alert, ActivityIndicator, Switch } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import CoinIcon from "../../../assets/coin.png"
import { TimeIcon } from '../../../components/SvgIcons'
import Button from '../../../components/Button'
import GiftOneThirdOutlinePng from '../../../assets/gift_one-third-outline.png'
import GiftTwoThirdOutlinePng from '../../../assets/gift_two-third-outline.png'
import GiftOutlinePng from '../../../assets/gift_outline.png'
import GiftNoOutlinePng from '../../../assets/gift_no-outline.png'
import { UserContext } from '../../../store/user-context'
import { skipVideo, loadVideo, getVideoReward, interactVideo, getVideoBonus } from '../../../utils/http'
import { DialogContext } from '../../../store/dialog-context'
import { ACTIVITY_STATUS, ACTIVITY_TYPE, ADDITIONAL_ACTIVITY, ALIGNMENT } from '../../../constants/globalVariables'
import { NotificationContext } from '../../../store/notification-context'
import { RewardedAd, RewardedAdEventType } from 'react-native-google-mobile-ads';
import { REWARD_UNIT_ID } from "@env"

const rewarded = RewardedAd.createForAdRequest(REWARD_UNIT_ID, {
    keywords: ['fashion', 'clothing'],
  });

const TemplateScreen = ({ activityType }) => {
    const userContext = useContext(UserContext)
    const dialogContext = useContext(DialogContext)
    const [isVideoLoading, setIsVideoLoading] = useState(true)
    const notificationContext = useContext(NotificationContext)
    const [additionalActivity, setAdditionalActivity] = useState()
    const [video, setVideo] = useState({id: 0, coinPerView: 0, timePerView: 0})

    async function fetchVideo(additionalActivity) {
        try {
          const data = await loadVideo(userContext.googleUserId, additionalActivity);
          if (data['status'] == 'fail') {
            Alert.alert('Fail', data['message'])
            return
          }
          
          setVideo(data['videoInfo']);
        } catch (error) {
          Alert.alert("Error", error.message)
        }
    }

    async function skipOtherVideo() {
    try {
        const data = await skipVideo(userContext.googleUserId, video.id, activityType);
        if (data['status'] == 'fail') {
            Alert.alert("Error", data["message"])
            return
        }
        setVideo(data['videoInfo']);
        } catch (error) {
        Alert.alert("Error", error.message)
        }
    }

    async function clickWatchVideo() {
    try {
        const data = await interactVideo(userContext.googleUserId, video['id'], activityType)
        if (data['status'] == "fail") {
        Alert.alert("Fail", data.message)
        return
        }
    } catch (error) {
        Alert.alert("Error", error.message)
    }

    userContext.setActivityTracking({
        ytVideoId: video['ytVideoId'], 
        timePerView: video['timePerView'],
        activityStatus: ACTIVITY_STATUS.IN_PROGRESS
    })

    let rewardCoin = activityType === ACTIVITY_TYPE.WATCH ? video['coinPerView'] : video['coinPerView'] + 60
    dialogContext.initialize(
        "Get Reward Coin",
        `${activityType} video successfully ${"\n"} Here is your reward`,
        rewardCoin, 
        "Get now", 
        "Get x2", 
        () => () => handleGetVideoReward(false),
        () => () => handleGetVideoReward(true)
    )
    }

    function showRewardedAd() {
        if (rewarded.loaded) {
            rewarded.show()
            setTimeout(() => {
                rewarded.load()
            }, 15000)
        } else {
            notificationContext.initialize("Get coin successfully")
            rewarded.load()
        }
    }

    async function handleGetVideoReward(didGetDoubleCoin) {
        if (didGetDoubleCoin) {
            showRewardedAd()
        }

        try {
            const data = await getVideoReward(userContext.googleUserId, activityType, didGetDoubleCoin);
            if (data['status'] == "fail") {
            Alert.alert("Fail", data['message'])
            return
            }
            
            let rewardCoin = activityType === ACTIVITY_TYPE.WATCH ? video['coinPerView'] : video['coinPerView'] + 60
            userContext.addCoin(didGetDoubleCoin ? rewardCoin * 2 : rewardCoin);
            userContext.setWatchToBonusCount(prevValue => prevValue += 1)

            fetchVideo(additionalActivity)
        } catch (error) {
            Alert.alert("Error", error.message)
        } finally {
            dialogContext.closeDialog()
        }
    }
    
    useEffect(() => {
        var unsubscribeEarned = rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {
            notificationContext.initialize("Get coin successfully")
        });
    
        rewarded.load();

        return () => {
            unsubscribeEarned();
        };
    }, [])
    
    useEffect(() => {
        if (userContext.googleUserId != null) {
            if (activityType == ACTIVITY_TYPE.WATCH) {
                setAdditionalActivity(ADDITIONAL_ACTIVITY.NO_OPTION)
                fetchVideo(ADDITIONAL_ACTIVITY.NO_OPTION)
            } else if (activityType == ACTIVITY_TYPE.SUBSCRIBE) {
                setAdditionalActivity(ADDITIONAL_ACTIVITY.SUBSCRIBE)
                fetchVideo( ADDITIONAL_ACTIVITY.SUBSCRIBE)
            } else if (activityType == ACTIVITY_TYPE.LIKE) {
                setAdditionalActivity(ADDITIONAL_ACTIVITY.LIKE)
                fetchVideo(ADDITIONAL_ACTIVITY.LIKE)
            } else {
                setAdditionalActivity(ADDITIONAL_ACTIVITY.COMMENT)
                fetchVideo(ADDITIONAL_ACTIVITY.COMMENT)
            }
        }
    }, [userContext.googleUserId])

    function clickGetVideoBonus() {
        dialogContext.initialize(
            "Get Video Bonus",
            `Here is your reward ${'\n'} You can get double coin`,
            60, 
            "Get now", 
            "Get x2", 
            () => () => handleGetVideoBonus(false),
            () => () => handleGetVideoBonus(true),
            ALIGNMENT.CENTER
        )
        dialogContext.openDialog()
    }
  
    async function handleGetVideoBonus(didGetDoubleCoin) {
        if (didGetDoubleCoin) {
            showRewardedAd()
        }

        try {
            dialogContext.closeDialog()
            const data = await getVideoBonus(userContext.googleUserId, didGetDoubleCoin);
            if (data['status'] == "fail") {
                Alert.alert("Fail", data['message'])
                return
            }
            userContext.addCoin(didGetDoubleCoin ? 120 : 60)
            userContext.setWatchToBonusCount(0)
        } catch (error) {
            dialogContext.closeDialog()
            Alert.alert("Error", error.message)
        }
    }

    return (
        <>
            <View className="relative bg-black flex-2 w-full justify-center items-center">
                {
                    isVideoLoading && <ActivityIndicator size={50}/>
                }
                <Image source={{uri: `https://i.ytimg.com/vi/${video['ytVideoId']}/0.jpg`}} 
                    style={!isVideoLoading && {width: "100%", height: '100%', objectFit: 'contain'}}
                    onLoad={() => setIsVideoLoading(false)}
                />
                <View className="absolute left-0 bottom-0 w-full items-center py-primary">
                    <Pressable onPress={clickGetVideoBonus}>
                        {
                            userContext.watchToBonusCount == 0 ?
                            <Image source={GiftNoOutlinePng} style={{width: 50, height: 50}}/>:
                            userContext.watchToBonusCount == 1 ?
                            <Image source={GiftOneThirdOutlinePng} style={{width: 50, height: 50}}/>:
                            userContext.watchToBonusCount == 2 ?
                            <Image source={GiftTwoThirdOutlinePng} style={{width: 50, height: 50}}/>:
                            <Image source={GiftOutlinePng} style={{width: 50, height: 50}}/>
                        }
                    </Pressable>
                </View>
                <View className="absolute right-0 bottom-0 flex-row justify-end items-center py-primary">
                    <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>Auto play</Text>
                    <Switch 
                        trackColor={{ false: "white", true: 'black' }}
                        thumbColor={'#FFC000'}
                        onValueChange={() => Alert.alert("Updating", "Updating soon")}
                        style={[{height: 50}]}
                    />
                </View>
            </View>
            <View style={styles.containerBottom}>
                <View className="flex-row flex-1 justify-evenly items-center">
                    <View className="flex-1">
                        <View className="flex-row justify-center items-center">
                            <Image source={CoinIcon} style={{width: 30, height: 30}}/>
                            <Text style={{color: "#FFC000", fontWeight: 'bold', fontSize: 30, marginLeft: 10}}>Coin</Text>
                        </View>
                        <Text style={{textAlign: 'center', color: "#FFC000", fontWeight: 'bold', fontSize: 30}}>
                            {activityType === ACTIVITY_TYPE.WATCH ? video['coinPerView'] : video['coinPerView']+60}
                        </Text>
                    </View>
                    <View className="verticalBar w-1 h-4/5 bg-primary"></View>
                    <View className="flex-1">
                        <View className="flex-row justify-center items-center">
                            <TimeIcon color='black' width={30} height={30}/>
                            <Text style={{color: "black", fontWeight: 'bold', fontSize: 30, marginLeft: 10}}>Time</Text>
                        </View>
                        <Text className="text-center text-black font-bold text-30">{video['timePerView']}</Text>
                    </View>
                </View>
                <View className="horizontalBar w-5/6 h-1 bg-primary"></View>
                <View className="flex-1 flex-row justify-evenly items-center w-full">
                    <Button title={"Other"} onPress={skipOtherVideo} paddingHorizontal={10} paddingVertical={5}/>
                    <Button title={activityType} onPress={clickWatchVideo} paddingHorizontal={10} paddingVertical={5}/>
                </View>
            </View>
        </>
    )
}

export default TemplateScreen

const styles = StyleSheet.create({
    containerTop: {
        position: 'relative',
        backgroundColor: 'black',
        flex: 2,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerBottom: {
        flex: 1,
        width: "100%",
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
})