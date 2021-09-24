import React, { useState, useContext } from "react" 
import axios from "axios"
import { UserContext} from "./UserProvider"

export const AuthContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function AuthProvider(props) {
    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        posts: [],
        errMsg: ''
    }
    
    const { getBikes } = useContext(UserContext)


    const [userState, setUserState] = useState(initState)

    function signup(credentials) {
        axios.post("/auth/signup", credentials)
        .then(res => {
            const { user, token } = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }))
            getBikes()
        })
        .catch(err => handleAuthErr(err.response.data.errMsg))
    }
    
    function login(credentials) {
        axios.post("/auth/login", credentials)
        .then(res => {
            const { user, token } = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }))
            getBikes()
        })
        .catch(err => handleAuthErr(err.response.data.errMsg))
    }
    
    function logout(){
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUserState({
            user: {},
            token: '',
            posts: []
        })
    }

    function handleAuthErr(errMsg) {
        setUserState(prevUserState => ({
            ...prevUserState,
            errMsg: errMsg
        }))
    }

    function resetAuthErr(){
        setUserState(prevState => ({
            ...prevState,
            errMsg: ""
        }))
    }
    return (
       <AuthContext.Provider
            value={{
                ...userState,
                signup,
                login,
                logout,
                resetAuthErr
            }}
       >
           { props.children }
       </AuthContext.Provider> 
    )
}