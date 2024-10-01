import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import Logo from '../../assets/logo.png'
import GoogleLogo from '../../assets/google.jpg'
import { GlobalStyles } from '../../constants/globalStyles'

const AuthScreen = () => {
  return (
    <View style={styles.container}>
        <View style={styles.containerTop}>
            <Image source={Logo} style={{width: 100, height: 100, marginTop: 100}}/>
            <Text style={styles.logoName}>SubExchange</Text>
            <View style={styles.textGroup}>
                <Text>Free to promote your channel</Text>
                <Text>Real people from all countries</Text>
                <Text>Exchange Youtube Subs, Like View</Text>
            </View>
        </View>
        <View style={styles.containerBottom}>
            <Pressable style={styles.button}>
                <Image source={GoogleLogo} style={{width: 50, height: 50, borderRadius: 10}}/>
                <Text style={styles.buttonTitle}>Sign In With Google</Text>
            </Pressable>
        </View>
    </View>
  )
}

export default AuthScreen

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    
    textGroup: {
        alignItems: 'center',
        marginTop: 30,
    },
    containerTop: {
        flex: 1,
        alignItems: 'center'
    }, 
    logoName: {
        fontWeight: "bold", fontSize: 35,
        color: GlobalStyles.primaryColor
    },
    containerBottom: {
        flex: 1,
        justifyContent: 'center'
    }, 
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: GlobalStyles.primaryColor,
        padding: 5,
        borderRadius: 10
    },
    buttonTitle: {
        fontSize: 20, fontWeight: 'bold',
        color: 'white',
        marginLeft: 20,
    }
})