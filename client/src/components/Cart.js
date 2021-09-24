import React, { useContext } from "react"
import "./Cart.css"
import EmptyCart from "./cart-components/EmptyCart"
import FullCart from "./cart-components/FullCart"
import { UserContext } from "../context/UserProvider"

function Cart() {
    const { cartItems } = useContext(UserContext)
    const cartTotal = cartItems.length 
    console.log(cartTotal)
    if(cartTotal === 0) {
        return (
            <EmptyCart />
        )
    } else {
        return(
            <FullCart
                cartTotal={cartItems.length}
            />
        )
    }

}

export default Cart