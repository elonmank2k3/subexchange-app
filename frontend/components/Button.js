import { StyleSheet, Text, View, Pressable } from 'react-native';
import { GlobalStyles } from '../constants/globalStyles';

const Button = ({ title, titleColor="white", onPress, buttonColor=GlobalStyles.primaryColor, borderColor, paddingHorizontal=10, paddingVertical=5 }) => {

    return (
    <Pressable 
        style={[styles.container, {backgroundColor: buttonColor, paddingHorizontal: paddingHorizontal, paddingVertical: paddingVertical}]}
        onPress={onPress}    
    >
        <Text style={[GlobalStyles.titleStyle, {textAlign: "center", color: titleColor}]}>{title}</Text>
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