import { createContext, useState } from "react";

export const CharacterContext = createContext({
    coin: 0,
    addCoin: (amount, description) => {},
    minusCoin: (amount, description) => {},
});

function CharacterContextProvider({ children }) {
    const [coin, setCoin] = useState(0);

    function addCoin(amount, description) {
        setCoin((prevCoin) => (prevCoin += amount));
    }

    function minusCoin(amount) {
        setCoin((prevCoin) => (prevCoin -= amount));
    }

    const value = {
        coin: coin,
        addCoin: addCoin,
        minusCoin: minusCoin
    };

    return (
        <CharacterContext.Provider value={value}>
        {children}
        </CharacterContext.Provider>
    );
}

export default CharacterContextProvider;
