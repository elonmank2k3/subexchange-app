import { View, Text, StyleSheet, Pressable, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import { GlobalStyles } from '../../constants/globalStyles'
import { ViewIcon, SubscribeIcon, LikeIcon, CommentIcon, AddIcon } from "../../components/SvgIcons"
import DeleteIcon from "../../assets/delete.png"
import Modal from "../../components/Modal"

const ManageCampaignScreen = ({ navigation }) => {
  const [videos, setVideos] = useState([
    {
      id: 1,
      videoId: 'Me_nS0T0qtg',
      expectedView: 1000,
      expectedSubscribe: 10,
      expectedLike: 0,
      expectedComment: 0,
      actualView: 1000,
      actualSubscribe: 0,
      actualLike: 5,
      actualComment: 0,
      status: 'running'
    },
    {
      id: 2,
      videoId: 'IbFYgeVC42I',
      expectedView: 20,
      expectedSubscribe: 0,
      expectedLike: 20,
      expectedComment: 0,
      actualView: 10,
      actualSubscribe: 0,
      actualLike: 20,
      actualComment: 0,
      status: 'completed'
    },
    {
      id: 3,
      videoId: 'IbFYgeVC42I',
      expectedView: 20,
      expectedSubscribe: 0,
      expectedLike: 0,
      expectedComment: 10,
      actualView: 3,
      actualSubscribe: 0,
      actualLike: 0,
      actualComment: 4,
      status: 'running'
    }
  ])
  const [isModalShown, setIsModalShown] = useState(false)
  const [selectedId, setSelectedId] = useState(0)

  function handleClickDeleteButton(id) {
    setSelectedId(id)
    toggleModal()
  }
  function toggleModal() {
    setIsModalShown(prevValue => !prevValue)
  }

  function deleteVideo() {
    setVideos(videos => videos.filter(video => video.id !== selectedId))
    toggleModal()
  }

  function navigateAddVideoScreen() {
    navigation.navigate('Add Video Screen')
  }

  return (
    <>
      <View style={styles.container}>
        <FlatList 
          data={videos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View style={styles.thumbnailWrapper}>
                <Image source={{uri: `https://i.ytimg.com/vi/${item.videoId}/hq720.jpg`}} style={{width: 1040/12, height: 585/12}}/>
              </View>
              <View style={[styles.statistic]}>
                <View style={{flexDirection: 'row'}}>
                  {
                    item.expectedView !== 0 &&
                    <View style={styles.statisticItem}>
                      <Text style={{fontSize: 16, marginRight: 5}}>{item.actualView}/{item.expectedView}</Text>
                      <ViewIcon width={16} height={16}/>
                    </View>
                  }
                  {
                    item.expectedSubscribe !== 0 &&
                    <View style={[styles.statisticItem, {marginLeft: 20}]}>
                      <Text style={{fontSize: 16, marginRight: 5}}>{item.actualSubscribe}/{item.expectedSubscribe}</Text>
                      <SubscribeIcon width={16} height={16}/>
                    </View>
                  }
                  {
                    item.expectedLike !== 0 &&
                    <View style={[styles.statisticItem, {marginLeft: 20}]}>
                      <Text style={{fontSize: 16, marginRight: 5}}>{item.actualLike}/{item.expectedLike}</Text>
                      <LikeIcon width={16} height={16}/>
                    </View>
                  }
                  {
                    item.actualComment !== 0 && 
                    <View style={[styles.statisticItem, {marginLeft: 20}]}>
                      <Text style={{fontSize: 16, marginRight: 5}}>{item.actualComment}/{item.expectedComment}</Text>
                      <CommentIcon width={16} height={16}/>
                    </View>
                  }
                </View>
                <Text style={{color: "red"}}>Running...</Text>
                {/* <Text style={{color: "green"}}>Completed</Text> */}
              </View>
              <Pressable style={{justifyContent: 'center'}} onPress={() => handleClickDeleteButton(item.id)}>
                <Image source={DeleteIcon} style={{width: 118/7, height: 151/7}}/>
              </Pressable>
            </View>
          )}
        />
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
          title={'Delete Campaign'} 
          message="Your campaign is not completed. We return unused coin for you"
          rewardCoin={200}
          buttonTitle01={'Cancel'}
          buttonTitle02={'Delete'}
          onPress01={toggleModal}
          onPress02={deleteVideo}
          messageWidthPerLine={220}
          messageAlign={'center'}
        />
      }
    </>
  )
}

export default ManageCampaignScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
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