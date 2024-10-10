import { View, Text, StyleSheet, Image, Pressable, TextInput, Alert} from 'react-native'
import React, { useContext, useState } from 'react'
import Logo from '../../assets/logo.png'
import SkipIcon from '../../assets/skip.png'
import { GlobalStyles } from '../../constants/globalStyles'
import { inputReferralCode } from '../../utils/http'
import { UserContext } from '../../store/user-context'
import { START_STEP } from '../../constants/globalVariables'
import Button from '../../components/Button'

const CodeInputScreen = ({ setStartStep }) => {
    const userContext = useContext(UserContext)
    const [inputCode, setInputCode] = useState("")

    async function handleInputCode() {
        try {
            const data = await inputReferralCode(userContext.googleUserId, inputCode)
            if (data['status'] === 'fail') {
                Alert.alert("Fail", data['message'])
                return
            }

            setStartStep(START_STEP.WATCH_INTRO)
        } catch (error) {
            Alert.alert("Error", error.message)
        }
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.containerTop}>
                <View style={styles.logoWrapper}>
                    <Image source={Logo} style={{width: 100, height: 100}}/>
                    <Text style={styles.logoName}>SubExchange</Text>
                </View>
                <View style={[styles.promptWrapper]}>
                    <Text style={styles.prompt}>
                        Enter your friends referral code to get free {'\n'}
                        <Text style={{fontWeight: 'bold'}}>300 coins </Text> 
                        and
                        <Text style={{fontWeight: 'bold'}}> 1 day Premium Account</Text>
                    </Text>
                </View>
            </View>
            <View style={styles.containerBottom}>
                <TextInput 
                    style={[styles.input, GlobalStyles.titleStyle]}
                    placeholder='Enter referral code'
                    cursorColor={"transparent"}
                    value={inputCode}
                    onChangeText={(value) => setInputCode(value)}
                />
                <Button title={"Submit"} onPress={handleInputCode}/>
                <View style={styles.buttonWrapper}>
                    <Pressable style={[styles.button]} onPress={() => setStartStep(START_STEP.WATCH_INTRO)}>
                        <Text style={styles.buttonTitle}>Skip</Text>
                        <Image source={SkipIcon} style={{width: 20, height: 20, marginLeft: 20}}/>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default CodeInputScreen

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    containerTop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    logoName: {
        fontWeight: "bold", fontSize: 30,
        color: GlobalStyles.primaryColor,
    },
    logoWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    prompt: {
        paddingHorizontal: 40,
        textAlign: 'center',
        marginBottom: GlobalStyles.spacing
    },
    containerBottom: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: 'center',
        width: '100%',
        backgroundColor: GlobalStyles.secondaryColor
    }, 
    input: {
        padding: GlobalStyles.spacing - 5,
        textAlign: 'center',
        color: GlobalStyles.primaryColor,
        marginTop: GlobalStyles.spacing,
        width: '70%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'black',
        borderRadius: 10
    },
    buttonWrapper: {
        alignSelf: 'flex-end'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderRadius: 10,
        marginBottom: 30,
        marginRight: 30
    },
    buttonTitle: {
        fontSize: 20, fontWeight: 'bold',
        color: 'black',
        marginLeft: 20,
    }
})