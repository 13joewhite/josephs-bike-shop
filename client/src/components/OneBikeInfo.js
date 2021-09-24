import React, { useContext, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { UserContext } from "../context/UserProvider"
import "./OneBikeInfo.css"


function OneBikeInfo(props) {
    const { oneBike } = useParams()
    const { addItem } = props

    const { getOneBike, bikeInfo } = useContext(UserContext)


    useEffect(() => {
        getOneBike(oneBike)
    }, [])

    const { bikeName, bikeImage, bikeType, bikeDescription, price } = bikeInfo

    return (
        <div id="selected-bike">
            <img src={bikeImage} alt="bike"/>
            <div className="bike-details"> 
                <div className="content">
                    <h1>{bikeName}</h1>
                    <h3>Type: {bikeType}</h3>
                    <p>Bike Info: {bikeDescription}</p>
                    <h2>Price: ${price}</h2>
                    <button 
                        onClick={() => addItem(bikeInfo)}
                        >Add To Cart
                    </button>    
                    <Link to="/">
                        <button>Back to shopping!</button>
                    </Link>              
                </div>
            </div>
        </div>
    )
}
 
export default OneBikeInfo