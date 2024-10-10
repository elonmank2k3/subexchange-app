import { createContext, useState } from "react";

export const UserContext = createContext({
    coin: 0,
    addCoin: (amount, description) => {},
    minusCoin: (amount, description) => {},
    googleUserId: "",
    setGoogleUserId: () => {},
    name: "",
    setName: () => {},
    email: "",
    setEmail: () => {},
    picture: "",
    setPicture: () => {},
    premiumTime: "",
    setPremiumTime: () => {},
    code: "",
    setCode: () => {},
    watchToBonusCount: 0,
    setWatchToBonusCount: () => {},
    didRate: false,
    setDidRate: () => {},
    activityTracking: {},
    setActivityTracking: () => {},
    modalControl: {},
    setModalControl: {}
});

function UserContextProvider({ children }) {
    const [coin, setCoin] = useState(0);
    const [googleUserId, setGoogleUserId] = useState(null)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [picture, setPicture] = useState("")
    const [premiumTime, setPremiumTime] = useState("")
    const [code, setCode] = useState("")
    const [watchToBonusCount, setWatchToBonusCount] = useState(0)
    const [didRate, setDidRate] = useState(false)
    const [activityTracking, setActivityTracking] = useState({
        activityStatus: 'no activity',
        ytVideoId: "",
        rewardCoin: 0,
        timePerView: 0,
    })

    function addCoin(amount, description) {
        setCoin((prevCoin) => (prevCoin += amount));
    }

    function minusCoin(amount) {
        setCoin((prevCoin) => (prevCoin -= amount));
    }

    const value = {
        coin,
        addCoin,
        minusCoin,
        googleUserId,
        setGoogleUserId,
        name,
        setName,
        coin,
        setCoin,
        email,
        setEmail,
        picture,
        setPicture,
        premiumTime,
        setPremiumTime,
        code,
        setCode,
        watchToBonusCount,
        setWatchToBonusCount,
        didRate,
        setDidRate,
        activityTracking,
        setActivityTracking,
    };

    return (
        <UserContext.Provider value={value}>
        {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
