import { View, Text, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { NotificationContext } from '../store/notification-context'

const Notification = () => {
    const notificationContext = useContext(NotificationContext)
    return (
        <View style={styles.container}>
            <View style={styles.messageWrapper}>
                <Text style={{fontWeight: 'bold'}}>{notificationContext.message}</Text>
            </View>
        </View>
    )
}

export default Notification

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: "100%",
        top: 100,
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