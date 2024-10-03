import { StyleSheet, Text, View, Pressable } from 'react-native';
import Coin from './Coin';
import Button from './Button';
import { GlobalStyles } from '../constants/globalStyles';

const Modal = ({ title, message, rewardCoin = 0, buttonTitle01, buttonTitle02, onPress01, onPress02, messageWidthPerLine=null, messageAlign='auto'}) => {
    return (
        <View style={styles.container}>
            <View style = {[styles.content]}>
                <Text style={GlobalStyles.titleStyle}>{title}</Text>
                <Text style={[styles.message, {width: messageWidthPerLine, textAlign: messageAlign}]}>{message}</Text>
                {rewardCoin != 0 && <View style={{marginTop: 15}}></View>}
                {rewardCoin != 0 && <Coin amount={rewardCoin}/>}
                <View style={[styles.buttonGroup, rewardCoin != 0 && {marginTop: 15}]}> 
                    <Button title={buttonTitle01} onPress={onPress01} paddingVertical={5}/>
                    <Button title={buttonTitle02} onPress={onPress02} paddingVertical={5}/>
                </View>
            </View>
        </View>
    );
}
 
export default Modal;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "'rgba(0, 0, 0, 0.7)'",
        zIndex: 1,
        paddingHorizontal: GlobalStyles.spacing
    },
    content: {
        width: "100%",
        borderRadius: 10, 
        backgroundColor: "white",
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: "center",
        paddingHorizontal: GlobalStyles.spacing,
        // height: 'auto', 
    },
    message: {
        marginTop: 10,
        width: '100%',
        textAlign: 'justify'
    },
    buttonGroup: {
        width: '100%',
        flexDirection: 'row', // Arrange buttons in a row
        justifyContent: 'space-around', // Space buttons evenly
        alignItems: 'center'
    }
})