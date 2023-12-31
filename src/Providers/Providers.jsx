import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";



export const AuthContext = createContext(null)
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const Providers = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    const signUpUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }
    const signInOutUser = () => {
        return signOut(auth)
    }

    // Social 
    const loginWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }



    // Display User And Photo URL

    const displayUserInfo = (name, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoURL
        })
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)

            // console.log(currentUser);
            // if(currentUser){
            //     axios.post('https://final-assaignment-project-server.vercel.app/jwt',{email: currentUser.email})
            //     .then(data=>{
            //         const jwtToken=data.data.token
            //         localStorage.setItem('access-token', jwtToken)
            //         setLoading(false)
            //     })
            // }else{
            //     return localStorage.removeItem('access-token')
            // }
            setLoading(false)
        })
        return () => {
            return unSubscribe;
        }

    }, [])


    const authInfo = {
        user,
        loading,
        signInUser,
        signUpUser,
        signInOutUser,
        displayUserInfo,
        loginWithGoogle
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default Providers;