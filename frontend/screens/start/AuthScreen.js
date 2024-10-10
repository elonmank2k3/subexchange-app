import { View, Text, StyleSheet, Image, Pressable, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Logo from '../../assets/logo.png'
import GoogleLogo from '../../assets/google.jpg'
import { GlobalStyles } from '../../constants/globalStyles'
import { START_STEP } from '../../constants/globalVariables'
import { handleSignIn } from '../../utils/http'
import { UserContext } from '../../store/user-context'
import {
    GoogleSignin,
  } from '@react-native-google-signin/google-signin';
    
  GoogleSignin.configure({
    webClientId: '949745649970-mkfqmsnafmakofqvs3ruqrilb3b2hgno.apps.googleusercontent.com',
    scopes: [],
  });

const AuthScreen = ({ setStartStep }) => {
    const userContext = useContext(UserContext)
    
    const signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const { data } = await GoogleSignin.signIn();
          const authorization = data['idToken']
          try {
            const data = await handleSignIn(authorization)
            if (data['status'] === 'fail') {
              Alert.alert("Error", data['message'])
            }
            if (data['message'] === "Sign in successfully") {
              setStartStep(START_STEP.DASHBOARD)
              userContext.setGoogleUserId(data['userInfo']['googleUserId'])
            } else {
              setStartStep(START_STEP.INPUT_CODE)
              userContext.setGoogleUserId(data['userInfo']['googleUserId'])
            }
          } catch (error){
            Alert.alert("Error", error.message);
          }
        } catch (error) {
          Alert.alert("Fail", error.message)
        }
    };

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
                <Pressable style={styles.button} onPress={signIn}>
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
        fontWeight: "bold", fontSize: 30,
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