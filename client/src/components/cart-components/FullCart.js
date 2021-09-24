import React, { useContext } from "react"
import "./FullCart.css"
import { UserContext } from "../../context/UserProvider"


function FullCart(props) {
    const { cartItems, increaseQuantity, decreaseQuantity } = useContext(UserContext)

    const currentCart = cartItems.map(item => {
    const { bikeName, bikeImage, price, quantity, bikeType, _id } = item 

        return (
            <div id="body" key={item._id}> 
                <div className="cart-text">
                    <img src={bikeImage} alt="bike"/>
                    <h1>{bikeName}</h1>
                    <h3>Type: {bikeType}</h3>
                    <h2>Price: ${price}</h2> 
                    <div className="btn-flex">
                        <button onClick={()=>increaseQuantity(_id)}>+</button> 
                        <h4>{quantity}</h4>       
                        <button onClick={()=>decreaseQuantity(_id)}>-</button>        
                    </div>  
                </div>
            </div>
        )
    })
    return (
       <> 
            <div className="currentCart">
                {currentCart}
            </div>
        </>
    )
}

export default FullCart