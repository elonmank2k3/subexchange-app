import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import TemplateScreen from './TemplateScreen'

const CommentScreen = () => {
  function skipOtherVideo() {
    alert("Skip")
  }
  function commentVideo() {
      alert("commentVideo")
  }

  return (
      <View style={styles.container}>
          <TemplateScreen reward={120} time={60} buttonTitle={"Comment"} onPressed01={skipOtherVideo} onPressed02={commentVideo}/>
      </View>
  )
}

export default CommentScreen

const styles = StyleSheet.create({
  container: {
      height: '100%',
      width: '100%',
      alignItems: 'center'
  },
})