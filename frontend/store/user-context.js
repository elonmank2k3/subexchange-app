import { createContext, useState } from "react";

export const UserContext = createContext({
    coin: 0,
    googleUserId: "",
    name: "",
    email: "",
    picture: "",
    premiumTime: "",
    code: "",
    watchToBonusCount: 0,
    didRate: false,
    addCoin: (amount, description) => {},
    minusCoin: (amount, description) => {},
    setGoogleUserId: () => {},
    setName: () => {},
    setEmail: () => {},
    setPicture: () => {},
    setPremiumTime: () => {},
    setCode: () => {},
    setWatchToBonusCount: () => {},
    setDidRate: () => {},
});

function UserContextProvider({ children }) {
    const [coin, setCoin] = useState(0);
    const [googleUserId, setGoogleUserId] = useState("105151207478264632771")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [picture, setPicture] = useState("")
    const [premiumTime, setPremiumTime] = useState("")
    const [code, setCode] = useState("")
    const [watchToBonusCount, setWatchToBonusCount] = useState(0)
    const [didRate, setDidRate] = useState(false)

    function addCoin(amount, description) {
        setCoin((prevCoin) => (prevCoin += amount));
    }

    function minusCoin(amount) {
        setCoin((prevCoin) => (prevCoin -= amount));
    }

    const value = {
        coin: coin,
        addCoin: addCoin,
        minusCoin: minusCoin,
        googleUserId: googleUserId,
        setGoogleUserId: setGoogleUserId,
        name: name,
        setName: setName,
        coin: coin,
        setCoin: setCoin,
        email: email,
        setEmail: setEmail,
        picture: picture,
        setPicture: setPicture,
        premiumTime: premiumTime,
        setPremiumTime: setPremiumTime,
        code: code,
        setCode: setCode,
        watchToBonusCount: watchToBonusCount,
        setWatchToBonusCount: setWatchToBonusCount,
        didRate: didRate,
        setDidRate: setDidRate
    };

    return (
        <UserContext.Provider value={value}>
        {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
