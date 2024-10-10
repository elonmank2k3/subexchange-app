import { createContext, useState } from "react";

export const NotificationContext = createContext({
    isShown: false,
    setIsShown: () => {},
    message: "",
    setMessage: () => {},
    initialize: () => {}
});

export default NotificationContextProvider = ({ children }) => {
    const [isShown, setIsShown] = useState(false)
    const [message, setMessage] = useState("")

    function initialize(message) {
        setMessage(message)
        setIsShown(true)
        setTimeout(() => {
            setIsShown(false)
        }, 3000)
    }

    value = {
        isShown,
        setIsShown,
        message,
        setMessage,
        initialize
    }

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};
 
