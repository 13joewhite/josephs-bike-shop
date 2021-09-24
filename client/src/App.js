import React, { useContext } from "react"
import Header from "./components/Header"
import Auth from "./components/Auth"
import BikeData from "./components/BikeData"
import OneBikeInfo from "./components/OneBikeInfo"
import Footer from "./components/Footer"
import Cart from "./components/Cart"
import "./App.css"
import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthContext } from "./context/AuthProvider"
import { UserContext } from "./context/UserProvider"

function App() {

    const { cartItems, typeChange, addItem, bikes } = useContext(UserContext)

    const { token } = useContext(AuthContext)

    return (
        <div>
            { token && <Header 
                token={token} 
                typeChange={typeChange}
                cartTotal={cartItems.length}
            />}
            <Switch> 
                <Route
                    exact path="/"
                    render={() => token ? <Redirect to='/home'/> : <Auth />}
                />
                <Route 
                    path="/home"
                    render={() => !token ? 
                    <Redirect to='/'/> : 
                    <section id="body">
                        { bikes.map(bike => 
                            <BikeData 
                                {...bike} 
                                key={bike._id} 
                                addItem={addItem}
                            />)
                        }
                    </section>
                    }    
                />
                <Route 
                    path="/cart"
                    render={() => !token ? 
                    <Redirect to="/" /> : 
                    <section id="cart-body">
                        <Cart />
                    </section>}
                />
                <Route 
                    path="/:oneBike"
                    render={() => !token ? 
                    <Redirect to="/" /> : 
                    <OneBikeInfo 
                        addItem={addItem}
                    />}
                />
            </Switch>
            <div>
            { token && <Footer token={token} /> }
            </div>
        </div>
    ) 
}

export default App 