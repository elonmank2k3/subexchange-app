import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Alert = ({ message }) => {
  return (
    <View style={styles.container}>
        <View style={styles.messageWrapper}>
            <Text style={{fontWeight: 'bold'}}>{message}</Text>
        </View>
    </View>
  )
}

export default Alert

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: "100%",
        top: 10,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    messageWrapper: {
        backgroundColor: "white",
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    }
})