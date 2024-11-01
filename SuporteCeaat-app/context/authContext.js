import { Children, createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig"
import { useRouter } from "expo-router";
import  { useNavigation } from "@react-navigation/native";


export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
    
    const navigation = useNavigation();
    const router = useRouter();
    const  [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);
    
    
    
    useEffect (() =>{
        const unsub = onAuthStateChanged(auth, (user) =>{
            if (user){
                setIsAuthenticated(true)
                setUser(user)
                
        }else{
            setIsAuthenticated(false)
            setUser(null)
        }
       })

       return unsub
    }, [])

    const login = async (email, password) =>{
        
        try{

            const response = await signInWithEmailAndPassword(auth, email, password)
            return {sucess: true}
            
            
        }catch(e){
            let msg = e.message
            if(msg.includes('(auth/invalid-email)')) msg ='invalid email'
            if(msg.includes('(auth/invalid-password)')) msg ='Wrong password'
            return {sucess: false, msg}

        }
    }


    //deslogar

    const logout = async () =>{
        try{
            await signOut(auth)
            return {sucess: true}
        }catch(e){
            return{sucess: false, msg: e.message, error: e}

        }
    }

    return(
        <AuthContext.Provider value={{user, isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>

    )

}

export const useAuth = () => {
    const value = useContext(AuthContext);

    if(!value){
        throw new Error("useAuth must be wrapped inside AuthContextProvider")
    }

    return value;
}
