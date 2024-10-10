import { Alert, Linking, StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import DrawerNavigation from './DrawerNavigation';
import WatchVideoScreen from '../screens/main/WatchVideoScreen';
import { UserContext } from '../store/user-context';
import { checkVideoCompletion, getCurrentVersion } from '../utils/http';
import { ACTIVITY_STATUS } from '../constants/globalVariables';
import AuthScreen from "../screens/start/AuthScreen";
import IntroScreen from "../screens/start/IntroScreen";
import CodeInputScreen from "../screens/start/CodeInputScreen";
import { START_STEP } from '../constants/globalVariables';
import LogoShownScreen from '../screens/start/LogoShownScreen';
import { DialogContext } from '../store/dialog-context';
import Dialog from '../components/Dialog';
import { NotificationContext } from '../store/notification-context';
import Notification from '../components/Notification';
import { GlobalStyles } from '../constants/globalStyles';

const MainNavigation = () => {
  const userContext = useContext(UserContext)
  const dialogContext = useContext(DialogContext)
  const notificationContext = useContext(NotificationContext)
  const [startStep, setStartStep] = useState(START_STEP.LOGO_SHOW)
  const [isVersionMatched, setIsVersionMatched] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setStartStep(START_STEP.AUTH)
    }, 2000)

    async function fetchData() {
      try {
        const data = await getCurrentVersion()
        if (data['versionInfo']['currentVersion'] !== "1.0") {
          setIsVersionMatched(false)
          Alert.alert(
            "Failed", 
            "You are using the old version. Update new version for new features",
            [
              { text: "Update", onPress: () => Linking.openURL("https://play.google.com/store/apps/details?id=com.buee.mutupipe&hl=en") }
            ]
            )
        }
      } catch (error) {
        Alert.alert("Error", error.message)
      }
    }
    fetchData();
  }, [])

  return (
    <>
      {
        startStep === START_STEP.LOGO_SHOW ?
        <LogoShownScreen />:
        !isVersionMatched ?
        <LogoShownScreen />:
        startStep === START_STEP.AUTH ?
        <AuthScreen setStartStep={setStartStep}/>:
        startStep === START_STEP.INPUT_CODE ?
        <CodeInputScreen setStartStep={setStartStep}/> :
        // startStep === START_STEP.WATCH_INTRO ?
        // <IntroScreen /> :
        <DrawerNavigation />
      }
      {
        userContext.activityTracking['activityStatus'] === ACTIVITY_STATUS.IN_PROGRESS &&
        <WatchVideoScreen />
      }
      {
        dialogContext.isShown &&
         <Dialog />
      }
      {
        notificationContext.isShown && 
        <Notification />
      }
      {
        userContext.activityTracking['activityStatus'] === ACTIVITY_STATUS.COMPLETED &&
        <CheckingVideoCompletion />
      }
    </>
  )
}

export default MainNavigation

const CheckingVideoCompletion = () => {
  const userContext = useContext(UserContext)
  const dialogContext = useContext(DialogContext)
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await checkVideoCompletion(userContext.googleUserId)

        if (data['status'] === "fail") {
          Alert.alert(
            "Fail", 
            data['message'], 
            [
              {
                text: "OK", 
                onPress: () => {
                  userContext.setActivityTracking((prevData) => ({...prevData, activityStatus: ACTIVITY_STATUS.NOT_STARTED}));
                }
              }
            ]
          )
          return
        }
        
        userContext.setActivityTracking((prevData) => ({...prevData, activityStatus: ACTIVITY_STATUS.NOT_STARTED}))
        dialogContext.openDialog()
      } catch (error) {
        userContext.setActivityTracking((prevData) => ({...prevData, activityStatus: ACTIVITY_STATUS.NOT_STARTED}))
        Alert.alert("Error", error.message)
      }
    }
    fetchData()
  }, [])

  return (
    <View style={styles.container}>
      <View style = {[styles.content]}>
          <ActivityIndicator size={40} />
          <Text style={[styles.message]}>
            Checking your completion...
          </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "'rgba(0, 0, 0, 0.7)'",
    zIndex: 1,
    paddingHorizontal: GlobalStyles.spacing
  },
  content: {
      borderRadius: 10, 
      backgroundColor: "white",
      paddingTop: 10,
      paddingBottom: 10,
      alignItems: "center",
      paddingHorizontal: GlobalStyles.spacing,
  },
  message: {
      marginTop: 10,
      width: '100%',
      textAlign: 'justify',
      fontSize: 20,
      fontWeight: 'bold'
  },
})