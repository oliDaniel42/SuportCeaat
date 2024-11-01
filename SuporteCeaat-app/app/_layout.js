import{ View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Slot, useRouter, useSegments } from "expo-router"


// Import your global CSS file
import "../global.css"
import { AuthContextProvider, useAuth } from '../context/authContext'


export const MainLayout= () =>{
    const{isAuthenticated} = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        //checar se o usuário está logado ou não
        if(typeof isAuthenticated=="undefined") return;
        const inApp = segments[0]=="(app)";
        
        if(isAuthenticated && !inApp){
            //redirecionar para home
            router.replace('home')
        }else if(isAuthenticated==false){
            //redirecionar para signIn
            router.replace("loginScreen")
        }


    }, [isAuthenticated])

    return <Slot/>

}

export default function RootLayout() {
    
    return(
        <AuthContextProvider>
            <MainLayout/>
        </AuthContextProvider>
   )
}
