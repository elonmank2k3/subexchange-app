import { View, Text, StyleSheet, Pressable, TextInput, Image, ScrollView, ActivityIndicator } from 'react-native'
import getVideoId from 'get-video-id';
import React, { useContext, useEffect, useState } from 'react'
import { GlobalStyles } from '../../constants/globalStyles'
import { Picker } from '@react-native-picker/picker';
import { uploadVideo } from '../../utils/http';
import { UserContext } from '../../store/user-context';
import Alert from '../../components/Alert';

const AddVideoScreen = () => {
    const [ytVideoId, setYtVideoId] = useState("")
    const [desiredView, setDesiredView] = useState(10)
    const [timePerView, setTimePerView] = useState(60)
    const [additionalActivity, setAdditionalActivity] = useState('')
    const [additionalActivityAmount, setAdditionalActivityAmount] = useState(0)
    const [expense, setExpense] = useState(0)
    const [isExpenseError, setIsExpenseError] = useState(false)
    const [isImageLoading, setIsImageLoading] = useState(true)
    const [alertMessage, setAlertMessage] = useState("")
    const [isAlertShown, setIsAlertShown] = useState(false)
    const userContext = useContext(UserContext)

    function handleInputVideoLink(videoURL) {
        const { id } = getVideoId(videoURL)
        setYtVideoId(id)
    }

    function handleSelectedAdditionalOption(option) {
        if (option == 'no option') {
            setAdditionalActivity(option)
            setAdditionalActivityAmount(0)            
        } else {
            setAdditionalActivity(option)
        }
    }

    function handleSelectAdditionalOptionAmount(amount) {
        // Check if a value is NaN
        for (let i = 0; i < String(amount).length; i++) {
            if (isNaN(String(amount).charAt(i)) || String(amount).charAt(i) == ' ') {
                setAdditionalActivityAmount("")
                return
            }
        }
        // Check if a value is in range
        if (Number(amount) < 0 || Number(amount) > desiredView) {
            setAdditionalActivityAmount("")
            return
        }
        setAdditionalActivityAmount(amount)
    }

    useEffect(() => {
        let calExpense = desiredView * timePerView + additionalActivityAmount * 60
        setExpense(calExpense)

        if (calExpense > userContext.code)
            setIsExpenseError(true)
        else
            setIsExpenseError(false)
    }, [desiredView, timePerView, additionalActivityAmount])

    async function addVideo() {
        try {
            const data = await uploadVideo(userContext.googleUserId, ytVideoId, desiredView, additionalActivity, additionalActivityAmount, timePerView);
            if (String(data['message']).includes("success")) {
                setAlertMessage('Add video successfully')
                setIsAlertShown(true)
                setTimeout(() => setIsAlertShown(false), 3000)

                userContext.minusCoin(expense)
                handleInputVideoLink("")
                setDesiredView(10)
                setAdditionalActivity("no option")
                setAdditionalActivityAmount(0)
                setTimePerView(60)
                setExpense(0)
                setIsImageLoading(true)
            } else {
                setAlertMessage('Add video failed')
                setIsAlertShown(true)
                setTimeout(() => setIsAlertShown(false), 2000)

            }
        } catch (error) {
            setAlertMessage('Add video failed due to server error')
            setIsAlertShown(true)
            setTimeout(() => setIsAlertShown(false), 2000)
        }
    }

    return (
        <>
            <ScrollView style={styles.container}>
                <View style={styles.thumbnailWrapper}>
                    {isImageLoading && <ActivityIndicator style={styles.loader} size="large" color="white" />}
                    <Image 
                        source={{uri: `https://i.ytimg.com/vi/${ytVideoId}/hq720.jpg`}} 
                        style={{width: '100%', height: '100%'}} 
                        onLoad={() => setIsImageLoading(false)}
                    />
                </View>
                <View style={styles.requiredSetting}>
                    <Text style={styles.title}>Required setting</Text>
                    <View style={styles.content}>
                        <TextInput 
                            style={styles.videoInput}
                            placeholder='Input video link'
                            onChangeText={(value) => handleInputVideoLink(value)}
                        />
                        <View style={[styles.option]}>
                            <Text style={styles.label}>Desired View</Text>
                            <View style={styles.pickerWrapper}>
                                <Picker
                                    selectedValue={desiredView}
                                    style={styles.picker}
                                    onValueChange={(itemValue) => setDesiredView(itemValue)}
                                >
                                    <Picker.Item label="10" value="10" />
                                    <Picker.Item label="30" value="30" />
                                    <Picker.Item label="50" value="50" />
                                    <Picker.Item label="100" value="100" />
                                    <Picker.Item label="200" value="200" />
                                    <Picker.Item label="500" value="500" />
                                    <Picker.Item label="1000" value="1000" />
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.option}>
                            <Text style={styles.label}>Time Per View</Text>
                            <View style={styles.pickerWrapper}>
                                <Picker
                                    selectedValue={timePerView}
                                    style={styles.picker}
                                    onValueChange={(itemValue) => setTimePerView(itemValue)}
                                >
                                    <Picker.Item label="60" value="60" />
                                    <Picker.Item label="90" value="90" />
                                    <Picker.Item label="120" value="120" />
                                    <Picker.Item label="180" value="180" />
                                    <Picker.Item label="240" value="240" />
                                    <Picker.Item label="300" value="300" />
                                    <Picker.Item label="360" value="360" />
                                </Picker>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.optionalSetting}>
                    <Text style={styles.title}>Optional setting</Text>
                    <View style={styles.content}>
                        <View style={[styles.option]}>
                            <Text style={styles.label}>Additional option</Text>
                            <View style={styles.pickerWrapper}>
                                <Picker
                                    selectedValue={additionalActivity}
                                    style={styles.picker}
                                    onValueChange={(itemValue) => handleSelectedAdditionalOption(itemValue)}
                                >
                                    <Picker.Item label="-- Select --" value="no option" />
                                    <Picker.Item label="Subscribe" value="subscribe" />
                                    <Picker.Item label="Like" value="like" />
                                    <Picker.Item label="Comment" value="comment" />
                                </Picker>
                            </View>
                        </View>
                        <View style={styles.option}>
                            <Text style={styles.label}>Desired Subscribe</Text>
                            <View style={styles.pickerWrapper}>
                                <TextInput
                                    value={additionalActivityAmount}
                                    placeholder={`MIN: 0 - MAX: ${desiredView}`}
                                    keyboardType='numeric'
                                    style={[{textAlign: 'center'}]}
                                    onChangeText={(value) => handleSelectAdditionalOptionAmount(value)}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.horizontalBar}>
                    <View style={{width: '100%', backgroundColor: 'black', height: 2}}></View>
                </View>
                <View style={styles.calculationCoin}>
                    <View style={styles.content}>
                        <View style={[styles.option]}>
                            <Text style={styles.label}>Your current coin</Text>
                            <View style={styles.pickerWrapper}>
                                <Text style={{fontWeight: 'bold'}}>{userContext.coin}</Text>
                            </View>
                        </View>
                        <View style={styles.option}>
                            <Text style={styles.label}>Total expense</Text>
                            <View style={styles.pickerWrapper}>
                                <Text style={[{fontWeight: 'bold'}, isExpenseError && {color: 'red'}]}>{expense}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.buttonWrapper}>
                    <Pressable style={
                        [{width: '100%', backgroundColor: GlobalStyles.primaryColor, height: 50, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderRadius: 10},
                        (isExpenseError || ytVideoId == "" || ytVideoId == undefined) && {backgroundColor: GlobalStyles.secondaryColor}]}
                        disabled={isExpenseError || ytVideoId == "" || ytVideoId == undefined}
                        onPress={addVideo}
                    >
                        <Text 
                            style={[{color: 'white', fontSize: 20, fontWeight: 'bold'}]}>
                                Add video
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
            {   
                isAlertShown && <Alert message={alertMessage}/>
            }
        </>
        
    )
}

export default AddVideoScreen

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    thumbnailWrapper: {
        width: '100%',
        height: 250,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        padding: 5,
    },
    requiredSetting: {
        alignItems: 'center',
        paddingHorizontal: GlobalStyles.spacing,
        width: '100%',
        marginTop: 10,
    },
    optionalSetting: {
        alignItems: 'center',
        paddingHorizontal: GlobalStyles.spacing,
        width: '100%',
        marginTop: 20,
    },
    calculationCoin: {
        alignItems: 'center',
        paddingHorizontal: GlobalStyles.spacing,
        width: '100%',
        marginTop: GlobalStyles.spacing
    },
    videoInput: {
        width: '100%',
        backgroundColor: GlobalStyles.secondaryColor,
        fontSize: 17,
        paddingHorizontal: GlobalStyles.spacing,
        paddingVertical: 5,
        borderRadius: 10,
        marginTop: 10
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%",
        marginTop: 10
    },
    title: {
        fontSize: 19,
        fontWeight: 'bold',
    },
    content: {
        width: '100%',
    },
    label: {
        fontSize: 17,
    },
    pickerWrapper: {
        backgroundColor: GlobalStyles.secondaryColor,
        width: 155,
        height: 30,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 10,
    },
    picker: {
        width: '100%',
    },
    selected: {
        fontSize: 16,
    },
    horizontalBar: {
        width: '100%',
        marginTop: GlobalStyles.spacing + 10,
        paddingHorizontal: GlobalStyles.spacing
    },
    buttonWrapper: {
        marginTop: 20,
        width: '100%', height: 50, 
        justifyContent: 'flex-end', 'alignItems': 'center', 
        paddingHorizontal: 10,
    },
    loader: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -25 }, { translateY: -25 }],
    },
})
