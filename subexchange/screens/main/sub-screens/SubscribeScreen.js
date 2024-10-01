import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import TemplateScreen from './TemplateScreen'

const SubscribeScreen = () => {
  function skipOtherVideo() {
    alert("Skip")
  }
  function subscribeVideo() {
      alert("subscribeVideo")
  }

  return (
      <View style={styles.container}>
          <TemplateScreen reward={120} time={60} buttonTitle={"Subscribe"} onPressed01={skipOtherVideo} onPressed02={subscribeVideo}/>
      </View>
  )
}

export default SubscribeScreen

const styles = StyleSheet.create({
  container: {
      height: '100%',
      width: '100%',
      alignItems: 'center'
  },
})