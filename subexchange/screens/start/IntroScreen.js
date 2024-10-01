import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const IntroScreen = () => {
  return (
    <View style={styles.container}>
      <Text>IntroScreen</Text>
    </View>
  )
}

export default IntroScreen

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})