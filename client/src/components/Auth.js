import React, { useState, useContext } from 'react'
import AuthForm from './AuthForm.js'
import { AuthContext } from "../context/AuthProvider"
import { faBiking } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./Auth.css"

const initInputs = { username: "", password: "" }

export default function Auth(){ 
  const [inputs, setInputs] = useState(initInputs)
  const [toggle, setToggle] = useState(false)
  
  const { signup, login, errMsg, resetAuthErr } = useContext(AuthContext)

  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSignup(e){
    e.preventDefault()
    signup(inputs)
  }

  function handleLogin(e){
    e.preventDefault()
    login(inputs)
  }

  function toggleForm() {
    setToggle(prev => !prev)
    resetAuthErr()
  }

  return (
    <div className="auth-container">
      <div className="logoName"> 
          <div className="container">
                <FontAwesomeIcon className="icon" icon={faBiking}/>
                <h3 className="companyName">The Bike Shop</h3>
          </div>
        </div>

      { !toggle ?
        <React.Fragment>
          <AuthForm 
            handleChange={handleChange}
            handleSubmit={handleSignup}
            inputs={inputs}
            btnText="Sign up"
            errMsg={errMsg}
          />
          <p onClick={ toggleForm }>Already a member?</p>
        </React.Fragment>
      :
        <React.Fragment>
          <AuthForm 
            handleChange={handleChange}
            handleSubmit={handleLogin}
            inputs={inputs}
            btnText="Login"
            errMsg={errMsg}
          />
          <p onClick={ toggleForm }>Not a member?</p>
        </React.Fragment>
      }
    </div>
  )
}