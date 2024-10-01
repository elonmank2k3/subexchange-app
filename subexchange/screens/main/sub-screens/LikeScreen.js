import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import TemplateScreen from './TemplateScreen'

const LikeScreen = () => {
  function skipOtherVideo() {
    alert("Skip")
  }
  function likeVideo() {
      alert("likeVideo")
  }

  return (
      <View style={styles.container}>
          <TemplateScreen reward={120} time={60} buttonTitle={"Like"} onPressed01={skipOtherVideo} onPressed02={likeVideo}/>
      </View>
  )
}

export default LikeScreen

const styles = StyleSheet.create({
  container: {
      height: '100%',
      width: '100%',
      alignItems: 'center'
  },
})