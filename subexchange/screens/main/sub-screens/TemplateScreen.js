import { View, Text, StyleSheet, Image, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import Thumbnail from "../../../assets/dummy-thumbnail.png"
import { GlobalStyles } from '../../../constants/globalStyles'
import CoinIcon from "../../../assets/coin.png"
import { TimeIcon } from '../../../components/SvgIcons'
import Button from '../../../components/Button'
import GiftOneThirdOutlinePng from '../../../assets/gift_one-third-outline.png'
import GiftTwoThirdOutlinePng from '../../../assets/gift_two-third-outline.png'
import GiftOutlinePng from '../../../assets/gift_outline.png'
import GiftNoOutlinePng from '../../../assets/gift_no-outline.png'
import Modal from '../../../components/Modal'

const TemplateScreen = ({ buttonTitle, onPressed01, onPressed02, reward, time}) => {
    const [watchToBonusCount, setWatchToBonusCount] = useState(3)
    const [isModalShown, setIsModalShown] = useState(true)

    function handleGetBonus() {
        if (watchToBonusCount >= 3) {
            setWatchToBonusCount(0)
        } else {
            let message = `Watch more ${3-watchToBonusCount} videos to get reward`
            if (watchToBonusCount == 1) {
                message = `Watch more ${3-watchToBonusCount} video to get reward`
            }
            Alert.alert(
                "Get Reward Failed",
                message
            )
        }
    }

    function handleClickGetX2Coin() {
        alert("Get successfully")
        setIsModalShown(false)
    }

    return (
        <>
            <View style={styles.containerTop}>
                <Image source={Thumbnail} style={{width: "100%", resizeMode: 'center'}}/>
                <View style={{position: 'absolute', left: 0, bottom: 0, width: '100%', alignItems: 'center', paddingVertical: 10}}>
                    <Pressable onPress={handleGetBonus}>
                        {
                            watchToBonusCount == 0 ?
                            <Image source={GiftNoOutlinePng} style={{width: 50, height: 50}}/>:
                            watchToBonusCount == 1 ?
                            <Image source={GiftOneThirdOutlinePng} style={{width: 50, height: 50}}/>:
                            watchToBonusCount == 2 ?
                            <Image source={GiftTwoThirdOutlinePng} style={{width: 50, height: 50}}/>:
                            <Image source={GiftOutlinePng} style={{width: 50, height: 50}}/>
                        }
                    </Pressable>
                </View>
            </View>
            <View style={styles.containerBottom}>
                <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <View style={[styles.leftSide, {flex: 1}]}>
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={CoinIcon} style={{width: 30, height: 30}}/>
                            <Text style={{color: "#FFC000", fontWeight: 'bold', fontSize: 30, marginLeft: 10}}>Coin</Text>
                        </View>
                        <Text style={{textAlign: 'center', color: "#FFC000", fontWeight: 'bold', fontSize: 30}}>{reward}</Text>
                    </View>
                    <View style={styles.verticalBar}></View>
                    <View style={[ styles.rightSide, {flex: 1}]}>
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <TimeIcon color='black' width={30} height={30}/>
                            <Text style={{color: "black", fontWeight: 'bold', fontSize: 30, marginLeft: 10}}>Time</Text>
                        </View>
                        <Text style={{textAlign: 'center', color: "black", fontWeight: 'bold', fontSize: 30}}>{time}</Text>
                    </View>
                </View>
                <View style={styles.horizontalBar}></View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: "100%"}}>
                    <Button title={"Other"} onPress={onPressed01} paddingHorizontal={10} paddingVertical={5}/>
                    <Button title={buttonTitle} onPress={onPressed02} paddingHorizontal={10} paddingVertical={5}/>
                </View>
            </View>
            {
                isModalShown && 
                <Modal 
                    title={'Get Reward Coin'}
                    message={'Watch video successfully. Here is your reward. You can get double coin.'}
                    rewardCoin={200}
                    buttonTitle01={"Cancel"}
                    buttonTitle02={"Get x2"}
                    onPress01={() => setIsModalShown(false)}
                    onPress02={handleClickGetX2Coin}
                />
            }
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