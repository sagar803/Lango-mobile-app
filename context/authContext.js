import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useContext, createContext, useEffect} from "react";

const authContext = createContext({});

export const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(false);
    const [checkingLogged, setCheckingLogged] = useState(false);
    const [userData, setUserData] = useState({});
    const [token, setToken] = useState(null);
    const [practice, setPractice] = useState(null);

    
    const logout = async () => {
        await AsyncStorage.removeItem('lango-practice');
        await AsyncStorage.removeItem('lango-token');
        setToken(null);
    }

    const alreadyLoggedIn = async () => {
        try {
            setCheckingLogged(true)
            const userToken = await AsyncStorage.getItem('lango-token');
            setToken(userToken);
            const pract = await AsyncStorage.getItem('lango-practice');
            console.log(pract);
            setPractice(pract);
            setCheckingLogged(false)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        alreadyLoggedIn();
    }, [])

    return (
        <authContext.Provider value={{userData, setUserData, token, setToken, loading, setLoading, logout, checkingLogged , practice, setPractice}}>
            {children}
        </authContext.Provider>
    )
}

export default function useAuth(){
    return useContext(authContext);
}
