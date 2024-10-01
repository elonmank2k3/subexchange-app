import { StyleSheet } from "react-native"

export const GlobalStyles = {
    primaryColor: "#0600B4",
    secondaryColor: "#E9E9E9",
    themeColor: "#FFFFFF",
    spacing: 15,
    headingSize: 20,
    bodySize: 15,
    titleStyle: StyleSheet.create({
        fontWeight: "bold", fontSize: 20,
    }),
    testBorderStyle: StyleSheet.create({
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "red",
    })
}