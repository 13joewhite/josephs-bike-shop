import React from "react"
import { Link } from "react-router-dom"
import "./EmptyCart.css"

function EmptyCart() {
    return (
        <div className="cart-empty">
            <h2>No Items In Your Cart!</h2>
            <Link to="/">
                <button>Back to shopping!</button>
            </Link>
        </div>
    )
}

export default EmptyCart