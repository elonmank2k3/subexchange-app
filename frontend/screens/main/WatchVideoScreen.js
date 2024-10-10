import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { WebView } from 'react-native-webview';
import { GlobalStyles } from '../../constants/globalStyles';
import { UserContext } from '../../store/user-context';
import { ACTIVITY_STATUS } from '../../constants/globalVariables';
import { trackWatchedVideoStatistic } from '../../utils/http';

const WatchVideoScreen = () => {
  const userContext = useContext(UserContext)
  const [timeCounter, setTimeCounter] = useState(userContext.activityTracking['timePerView'])
  const [isCountDownStart, setIsCountDownStart] = useState(false)
  const [intervalId, setIntervalId] = useState(null)

  useEffect(() => {
    trackWatchedVideoStatistic(userContext.googleUserId);

    const timerId = setTimeout(() => {
      if (!isCountDownStart) {
        const id = setInterval(() => {
          setTimeCounter(prevValue => {
            if (prevValue <= 1) {
              clearInterval(id); 
              return 0; 
            }
            return prevValue - 1;
          });
        }, 1000);
  
        setIntervalId(id); 
        setIsCountDownStart(true);
      }
    }, 3000);
  
    return () => {
      clearTimeout(timerId);
      clearInterval(intervalId)
    };
  }, []);
  
  function closeWatchVideoScreen() {
    userContext.setActivityTracking((prevData) => 
      ({...prevData, activityStatus: ACTIVITY_STATUS.COMPLETED}))
  }

  return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
            {
                timeCounter > 0 ?
                <Text style={styles.timeCounter}>{timeCounter}</Text>:
                <Pressable style={{paddingVertical: 5, paddingHorizontal: 10, backgroundColor: 'white'}}
                    onPress={closeWatchVideoScreen}
                >
                    <Text style={{fontSize: 18, fontWeight: 'bold', color: GlobalStyles.primaryColor}}>Go Back</Text>
                </Pressable>
            }
        </View>
        <WebView
            source={{ uri: `https://m.youtube.com/watch?v=${userContext.activityTracking['ytVideoId']}` }}
            style={styles.webview}
        />
      </View>
  );
}

export default WatchVideoScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: "absolute",
    bottom: 0, left: 0,
    zIndex: 1,
  },
  textContainer: {
    padding: 10, 
    height: 50,
    alignItems: 'center',
    backgroundColor: 'blue'
  },
  timeCounter: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  webview: {
    flex: 1,
  },
});