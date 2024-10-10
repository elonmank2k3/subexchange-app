import { createContext, useState } from "react";
import { ALIGNMENT } from "../constants/globalVariables";
import React from "react";

export const DialogContext = createContext({
    isShown: false,
    setIsShown: () => {},
    message: "",
    setMessage: "",
    title: "",
    setTitle: () => {},
    rewardCoin: 0,
    setRewardCoin: () => {},
    buttonTitle01: "",
    setButtonTitle01: () => {},
    buttonTitle02: "",
    setButtonTitle02: () => {},
    onPress01: null,
    setOnPress01: () => {},
    onPress02: null,
    setOnPress02: () => {},
    messageAlign: "",
    setMessageAlign: () => {},
    closeDialog: () => {},
    initialize: (title, message, rewardCoin, buttonTitle01 = "Cancel", buttonTitle02 = "", onPress01, onPress02, messageAlign = ALIGNMENT.CENTER) => {},
    openDialog: () => {}
});

export default DialogContextProvider = ({ children }) => {
    const [isShown, setIsShown] = useState(false)
    const [message, setMessage] = useState("")
    const [title, setTitle] = useState("")
    const [rewardCoin, setRewardCoin] = useState(0)
    const [buttonTitle01, setButtonTitle01] = useState("Cancel")
    const [buttonTitle02, setButtonTitle02] = useState("")
    const [onPress01, setOnPress01] = useState(null)
    const [onPress02, setOnPress02] = useState(null)
    const [messageAlign, setMessageAlign] = useState(ALIGNMENT.CENTER)

    function closeDialog() {
        setIsShown(false)
        setMessage("")
        setTitle("")
        setRewardCoin(0)
        setButtonTitle01("")
        setButtonTitle02("")
        setOnPress01(null)
        setOnPress02(null)
        setMessageAlign(ALIGNMENT.CENTER)
    }

    function initialize(title, message, rewardCoin, buttonTitle01 = "Cancel", buttonTitle02 = "", onPress01, onPress02, messageAlign = ALIGNMENT.CENTER) {
        setTitle(title);
        setMessage(message);
        setRewardCoin(rewardCoin);
        setButtonTitle01(buttonTitle01);
        setButtonTitle02(buttonTitle02);
        setOnPress01(onPress01)
        setOnPress02(onPress02)
        setMessageAlign(messageAlign);
    }

    function openDialog() {
        setIsShown(true)
    }
    value = {
        isShown,
        setIsShown,
        message,
        setMessage,
        title,
        setTitle,
        rewardCoin,
        setRewardCoin,
        buttonTitle01,
        setButtonTitle01,
        buttonTitle02,
        setButtonTitle02,
        onPress01,
        setOnPress01,
        onPress02,
        setOnPress02,
        messageAlign,
        setMessageAlign,
        closeDialog,
        initialize,
        openDialog
    }

    return (
        <DialogContext.Provider value={value}>
            {children}
        </DialogContext.Provider>
    );
};
 
