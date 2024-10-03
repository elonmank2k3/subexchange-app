import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Thumbnail from "../../../assets/dummy-thumbnail.png"
import { GlobalStyles } from '../../../constants/globalStyles'
import CoinIcon from "../../../assets/coin.png"
import { TimeIcon } from '../../../components/SvgIcons'
import Button from '../../../components/Button'
import TemplateScreen from './TemplateScreen'
import Modal from '../../../components/Modal'
import { UserContext } from '../../../store/user-context'
import { skipVideo, getVideo } from '../../../utils/http'

const ViewScreen = () => {
    const userContext = useContext(UserContext)
    const [video, setVideo] = useState({id: 1, coinPerView: 0, timePerView: 0})
    const [thumbnailURL, setThumbnailURL] = useState("")

    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getVideo(userContext.googleUserId, "no option");
            setVideo(data['videoInfo'])
            setThumbnailURL(`https://i.ytimg.com/vi/mSLuJYtl89Y/hq720.jpg`)
          } catch (error) {
            console.error("Error fetching earning histories: ", error);
          }
        };
      
        fetchData();
    }, [userContext.googleUserId]);

    async function skipOtherVideo() {
        try {
            const data = await skipVideo(userContext.googleUserId, video.id, "watch");
            setVideo(data['videoInfo'])
            setThumbnailURL(`https://i.ytimg.com/vi/${data['videoInfo']['ytVideoId']}/hq720.jpg`)
          } catch (error) {
            console.error("Error fetching earning histories: ", error);
          }
    }

    function watchVideo() {
        alert("Watch")
    }

    return (
        <View style={styles.container}>
            <TemplateScreen reward={video.coinPerView} time={video.timePerView} buttonTitle={"Watch"} onPressed01={skipOtherVideo} onPressed02={watchVideo} thumbnailURL={thumbnailURL}/>
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