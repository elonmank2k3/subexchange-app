import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import Thumbnail from "../../../assets/dummy-thumbnail.png"
import { GlobalStyles } from '../../../constants/globalStyles'
import CoinIcon from "../../../assets/coin.png"
import { TimeIcon } from '../../../components/SvgIcons'
import Button from '../../../components/Button'
import TemplateScreen from './TemplateScreen'
import Modal from '../../../components/Modal'

const ViewScreen = () => {
    function skipOtherVideo() {
        alert("Skip")
    }
    function watchVideo() {
        alert("Watch")
    }

    return (
        <View style={styles.container}>
            <TemplateScreen reward={120} time={60} buttonTitle={"Watch"} onPressed01={skipOtherVideo} onPressed02={watchVideo}/>
        </View>
        
    )
}

export default ViewScreen

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '100%',
        width: '100%',
        alignItems: 'center'
    },
})