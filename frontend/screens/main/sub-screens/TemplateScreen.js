import { View, Text, StyleSheet, Image, Pressable, Alert, ActivityIndicator, Switch } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { GlobalStyles } from '../../../constants/globalStyles'
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
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = "ca-app-pub-3940256099942544/5224354917";

const rewarded = RewardedAd.createForAdRequest(adUnitId);

const TemplateScreen = ({ activityType=ACTIVITY_TYPE.WATCH }) => {
    const userContext = useContext(UserContext)
    const dialogContext = useContext(DialogContext)
    const [isVideoLoading, setIsVideoLoading] = useState(true)
    const notificationContext = useContext(NotificationContext)
    const [isAdsLoaded, setIsAdsLoaded] = useState(false);
    const [additionalActivity, setAdditionalActivity] = useState()
    const [video, setVideo] = useState({id: 0, coinPerView: 0, timePerView: 0})

    async function fetchVideo(googleUserId, additionalActivity) {
        try {
          const data = await loadVideo(googleUserId, additionalActivity);
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

    async function handleGetVideoReward(didGetDoubleCoin) {
        if (didGetDoubleCoin) {
            rewarded.show()
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

            fetchVideo(userContext.googleUserId, additionalActivity)
        } catch (error) {
            Alert.alert("Error", error.message)
        } finally {
            dialogContext.closeDialog()
        }
    }
    
    function setupFirstScreenRender() {
        if (activityType === ACTIVITY_TYPE.WATCH) {
            setAdditionalActivity(ADDITIONAL_ACTIVITY.NO_OPTION)
            fetchVideo(userContext.googleUserId, ADDITIONAL_ACTIVITY.NO_OPTION)
        } else if (activityType === ACTIVITY_TYPE.SUBSCRIBE) {
            setAdditionalActivity(ADDITIONAL_ACTIVITY.SUBSCRIBE)
            fetchVideo(userContext.googleUserId, ADDITIONAL_ACTIVITY.SUBSCRIBE)
        } else if (activityType === ACTIVITY_TYPE.LIKE) {
            setAdditionalActivity(ADDITIONAL_ACTIVITY.LIKE)
            fetchVideo(userContext.googleUserId, ADDITIONAL_ACTIVITY.LIKE)
        } else {
            setAdditionalActivity(ADDITIONAL_ACTIVITY.COMMENT)
            fetchVideo(userContext.googleUserId, ADDITIONAL_ACTIVITY.COMMENT)
        }
    }

    useEffect(() => {
        setupFirstScreenRender()

        // Load ads
        const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
          setIsAdsLoaded(true);
        });
        const unsubscribeEarned = rewarded.addAdEventListener(
          RewardedAdEventType.EARNED_REWARD,
          reward => {
            notificationContext.initialize("Get coin successfully")
          },
        );
    
        // Start loading the rewarded ad straight away
        rewarded.load();
    
        // Unsubscribe from events on unmount
        return () => {
          unsubscribeLoaded();
          unsubscribeEarned();
        };
    }, []);

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
            try {
                rewarded.show()
            } catch (error) {
                console.log(error.message)
            }
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
            <View style={styles.containerTop}>
                {
                    isVideoLoading && <ActivityIndicator size={50}/>
                }
                <Image source={{uri: `https://i.ytimg.com/vi/${video['ytVideoId']}/0.jpg`}} 
                    style={!isVideoLoading && {width: "100%", height: '100%', resizeMode: 'contain'}}
                    onLoad={() => setIsVideoLoading(false)}
                />
                <View style={{position: 'absolute', left: 0, bottom: 0, width: '100%', alignItems: 'center', paddingVertical: 10}}>
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
                <View style={{position: 'absolute', right: 0, bottom: 0, flexDirection: "row", justifyContent: 'flex-end' ,alignItems: 'center', paddingVertical: 10}}>
                    <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>Auto play</Text>
                    <Switch 
                        trackColor={{ false: "white", true: 'black' }}
                        thumbColor={'#FFC000'}
                        onValueChange={() => Alert.alert("Updating", "Updating soon")}
                        style={[{height: 40}]}
                    />
                </View>
            </View>
            <View style={styles.containerBottom}>
                <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <View style={[styles.leftSide, {flex: 1}]}>
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={CoinIcon} style={{width: 30, height: 30}}/>
                            <Text style={{color: "#FFC000", fontWeight: 'bold', fontSize: 30, marginLeft: 10}}>Coin</Text>
                        </View>
                        <Text style={{textAlign: 'center', color: "#FFC000", fontWeight: 'bold', fontSize: 30}}>
                            {activityType === ACTIVITY_TYPE.WATCH ? video['coinPerView'] : video['coinPerView']+60}
                        </Text>
                    </View>
                    <View style={styles.verticalBar}></View>
                    <View style={[ styles.rightSide, {flex: 1}]}>
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <TimeIcon color='black' width={30} height={30}/>
                            <Text style={{color: "black", fontWeight: 'bold', fontSize: 30, marginLeft: 10}}>Time</Text>
                        </View>
                        <Text style={{textAlign: 'center', color: "black", fontWeight: 'bold', fontSize: 30}}>{video['timePerView']}</Text>
                    </View>
                </View>
                <View style={styles.horizontalBar}></View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: "100%"}}>
                    <Button title={"Other"} onPress={skipOtherVideo} paddingHorizontal={10} paddingVertical={5}/>
                    <Button title={activityType} onPress={clickWatchVideo} paddingHorizontal={10} paddingVertical={5}/>
                </View>
            </View>
        </>
    )
}

export default TemplateScreen

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center'
    },
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
    horizontalBar: {
        width: '90%',
        height: 2,
        backgroundColor: GlobalStyles.primaryColor
    },
    verticalBar: {
        width: 2,
        height: '80%',
        backgroundColor: GlobalStyles.primaryColor
    },
})