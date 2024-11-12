import { Children, createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { setDoc, getDoc, addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig"
import { useRole } from "../app/inicial";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);
    const { setRole, role } = useRole();

    
    
    useEffect (() =>{
        const unsub = onAuthStateChanged(auth, (user) =>{
            if (user){
                setIsAuthenticated(true)
                setUser(user)
                //updateUserData(user.uid)
                
        }else{
            setIsAuthenticated(false)
            setUser(null)
        }
       })

       return unsub
    }, [])

    const login = async (email, password) =>{
        
        try{

            // Agora você pode usar o uid do usuário para buscar seus dados no Firestore
            
            const response = await signInWithEmailAndPassword(auth, email, password)
            return {sucess: true}
            
        }catch(e){
            let msg = e.message
            if(msg.includes('(auth/invalid-email)')) msg ='invalid email'
            if(msg.includes('(auth/invalid-password)')) msg ='Wrong password'
            return {sucess: false, msg}

        }
    }

    //registro

    const studentRegister = async (userId, grade, classgroup, coursetype) => {

        try {
            const studantData = await setDoc(doc(db, 'student', userId), {
                grade,
                classgroup,
                coursetype,
            });
            return { success: true };
        } catch (error) {
            console.error("Erro ao registrar o aluno: ", error);
            return { success: false, msg: 'Ocorreu um erro ao registrar. Tente novamente.' };
        }
    };
    

    const register = async (username, email, password, role) => {
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password)
            await setDoc(doc(db, 'user', response?.user?.uid), {
                username,
                userId: response?.user?.uid,
                role
            });
            return {sucess: true}
        }catch(e){
            let msg = e.message;
            if(msg.includes('auth/invalid-email)')) msg ='invalid email'
            return {success: false, msg}
        }
    }

    // const updateUserData = async (userId, role, newData) => {

    //     try {
    //       const userDoc = doc(db, 'users', userId);
      
    //       if (role === 'Aluno') {
    //         await updateDoc(userDoc, { studentData: newData });
    //       } else {
    //         await updateDoc(userDoc, { staffData: newData });
    //       }
      
    //       console.log('Dados do usuário atualizados com sucesso!');
    //     } catch (error) {
    //       console.error('Erro ao atualizar dados do usuário:', error);
    //     }
    //   };

    //deslogar

    const logout = async () =>{
        try{
            await signOut(auth)
            await AsyncStorage.removeItem('userRole')
            setRole(null)
            return {success: true}
        }catch(e){
            return{sucess: false, msg: e.message, error: e}

        }
    }

    
    return(
        <AuthContext.Provider value={{user, isAuthenticated, login, logout, register, studentRegister}}>
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
