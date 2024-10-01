import { StyleSheet, Text, View, Pressable } from 'react-native';
import { GlobalStyles } from '../constants/globalStyles';

const Button = ({ title, titleColor="white", onPress, buttonColor=GlobalStyles.primaryColor, borderColor, paddingHorizontal=0, paddingVertical=0 }) => {
    const buttonColorStyle = 
        (!!borderColor) 
        ? {
            backgroundColor: buttonColor,
            borderColor: borderColor,
        } 
        : {
            backgroundColor: buttonColor,
            borderBottomWidth: 0,
            borderRightWidth: 0, borderLeftWidth: 0,
        }
    return (
    <Pressable 
        style={[styles.container, buttonColorStyle, {paddingHorizontal: paddingHorizontal, paddingVertical: paddingVertical}]}
        onPress={onPress}    
    >
        <Text style={[GlobalStyles.titleStyle, {textAlign: "center", color: "white"}]}>{title}</Text>
    </Pressable>
    )
}
 
export default Button;

const styles = StyleSheet.create({
    container: {
        minWidth: 120, 
        borderRadius: 10, 
    },
})