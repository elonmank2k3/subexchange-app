import { View, Text, StyleSheet, Pressable, TextInput, Image, ScrollView } from 'react-native'
import getVideoId from 'get-video-id';
import React, { useEffect, useState } from 'react'
import { GlobalStyles } from '../../constants/globalStyles'
import { Picker } from '@react-native-picker/picker';

const AddVideoScreen = () => {
    const [currentCoin, setCurrentCoin] = useState(3000)
    const [videoId, setVideoId] = useState("")
    const [desiredView, setDesiredView] = useState(10)
    const [timePerView, setTimePerView] = useState(60)
    const [additionalOption, setAdditionalOption] = useState('')
    const [additionalOptionAmount, setAdditionalOptionAmount] = useState(0)
    const [expense, setExpense] = useState(0)
    const [isExpenseError, setIsExpenseError] = useState(false)

    function handleInputVideoLink(videoURL) {
        const { id } = getVideoId(videoURL)
        setVideoId(id)
        console.log(id)
    }

    function handleSelectedAdditionalOption(option) {
        if (option == 'null') {
            setAdditionalOption(option)
            setAdditionalOptionAmount('')            
        } else {
            setAdditionalOption(option)
        }
    }

    function handleSelectAdditionalOptionAmount(amount) {
        // Check if a value is NaN
        for (let i = 0; i < String(amount).length; i++) {
            if (isNaN(String(amount).charAt(i)) || String(amount).charAt(i) == ' ') {
                setAdditionalOptionAmount("")
                return
            }
        }
        // Check if a value is in range
        if (Number(amount) < 0 || Number(amount) > desiredView) {
            setAdditionalOptionAmount("")
            return
        }
        setAdditionalOptionAmount(amount)
    }

    useEffect(() => {
        let calExpense = desiredView * timePerView + additionalOptionAmount * 60
        setExpense(calExpense)

        if (calExpense > currentCoin)
            setIsExpenseError(true)
        else
            setIsExpenseError(false)
    }, [desiredView, timePerView, additionalOptionAmount])

    // function 
    return (
        <ScrollView style={styles.container}>
            <View style={styles.thumbnailWrapper}>
                <Image source={{uri: `https://i.ytimg.com/vi/${videoId}/hq720.jpg`}} style={{width: '100%', height: '100%'}}/>
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
                                selectedValue={additionalOption}
                                style={styles.picker}
                                onValueChange={(itemValue) => handleSelectedAdditionalOption(itemValue)}
                            >
                                <Picker.Item label="-- Select --" value="null" />
                                <Picker.Item label="Subscribe" value="Subscribe" />
                                <Picker.Item label="Like" value="Like" />
                                <Picker.Item label="Comment" value="Comment" />
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.option}>
                        <Text style={styles.label}>Desired Subscribe</Text>
                        <View style={styles.pickerWrapper}>
                            <TextInput
                                value={additionalOptionAmount}
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
                            <Text style={{fontWeight: 'bold'}}>{currentCoin}</Text>
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
                    (isExpenseError || videoId == "" || videoId == undefined) && {backgroundColor: GlobalStyles.secondaryColor}]}
                    disabled={isExpenseError || !!videoId}
                >
                    <Text 
                        style={[{color: 'white', fontSize: 20, fontWeight: 'bold'}]}>
                            Add video
                    </Text>
                </Pressable>
            </View>
        </ScrollView>
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
    }
})
