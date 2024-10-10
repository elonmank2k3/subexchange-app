import { StyleSheet, Text, View } from 'react-native';
import Coin from './Coin';
import Button from './Button';
import { GlobalStyles } from '../constants/globalStyles';
import { useContext } from 'react';
import { DialogContext } from '../store/dialog-context';

const Dialog = () => {
    const dialogContext = useContext(DialogContext)

    return (
        <View style={styles.container}>
            <View style = {[styles.content]}>
                <Text style={GlobalStyles.titleStyle}>{dialogContext.title}</Text>
                <Text style={[styles.message, {textAlign: dialogContext.messageAlign}]}>{dialogContext.message}</Text>
                {dialogContext.rewardCoin != 0 && <View style={{marginTop: 15}}></View>}
                {dialogContext.rewardCoin != 0 && <Coin amount={dialogContext.rewardCoin}/>}
                <View style={[styles.buttonGroup, dialogContext.rewardCoin != 0 && {marginTop: 15}]}> 
                    <Button title={dialogContext.buttonTitle01} onPress={dialogContext.onPress01} paddingVertical={5}/>
                    <Button title={dialogContext.buttonTitle02} onPress={dialogContext.onPress02} paddingVertical={5}/>
                </View>
            </View>
        </View>
    );
}
 
export default Dialog;

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