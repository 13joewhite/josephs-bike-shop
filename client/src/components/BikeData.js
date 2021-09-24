import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { UserContext } from "../context/UserProvider"
import "./BikeData.css"

function BikeDate(props) {
    const { bikeName, bikeImage, price, _id } = props

    const { addItem } = useContext(UserContext)

    return (
        <div id="bike-info">
            <div className="bike-card"> 
                <img src={bikeImage} alt="bike"/>
                <div className="card-text">
                    <h4>{bikeName}</h4>
                    <p>Type: {props.bikeType}</p>
                    <p>Price: ${price}</p>
                    <Link to={`/${_id}`}>
                        <button className="btn">More Info</button>
                    </Link>
                    <button 
                        className="btn"
                        onClick={() => addItem(props)}
                        >Add To Cart</button>             
                </div>
            </div>
        </div>
    )
}

export default BikeDate