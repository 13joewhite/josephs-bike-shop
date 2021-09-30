import React, { useContext } from "react"
import {useLocation, useHistory, Link} from 'react-router-dom'
import { faCartPlus, faBiking } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AuthContext } from "../context/AuthProvider"

import "./Header.css"

function Header(props) {
    function handleClick(){
        setTimeout(() => {
            history.push("/")
        }, 50)
    }

    const { logout } = useContext(AuthContext)

    const location = useLocation();
    const history = useHistory()

    const { typeChange } = props
    return (
        <div id="head">
            <div className="logoName"> 
                <div className="container">
                    <Link to="/">
                        <FontAwesomeIcon className="icon" icon={faBiking}/>
                        <h3 className="companyName">The Bike Shop</h3>
                    </Link>
                </div>
            </div>

            <div id="nav">
                {
                    location.pathname === '/home' ? (
                        <select className="selectbtn" onChange={(e) => typeChange(e.target.value)}>
                            <option value="" disabled hidden>Bike Menu</option>
                            <option value="All">All Bikes</option>
                            <option value="Mountain">Mountain Bikes</option>
                            <option value="Road">Road Bikes</option>
                        </select>
                    ) : 
                    (
                        <button className="selectbtn" onClick={handleClick}>Back</button>
                    )
                }
                <Link to='/cart'> 
                    <div className="cart-container">
                        <FontAwesomeIcon className="icon" icon={faCartPlus} />   
                        <h4>Cart ({props.cartTotal})</h4>
                    </div>
                </Link>
                <Link to="/">
                    <button className="logout" onClick={logout}>Logout</button>
                </Link>
            </div>
        </div>
    )
}

export default Header