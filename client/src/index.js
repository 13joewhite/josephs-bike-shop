import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import {BrowserRouter as Router} from "react-router-dom"
import UserProvider from "./context/UserProvider"
import AuthProvider from "./context/AuthProvider"

ReactDOM.render(
    <React.StrictMode>
        <Router> 
            <UserProvider>
                <AuthProvider>
                    <App />        
                </AuthProvider>
            </UserProvider>    
        </Router>        
    </React.StrictMode>,  
 document.getElementById('root'))