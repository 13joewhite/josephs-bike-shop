import React, { useState, useEffect } from "react" 
import axios from "axios"


export const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function UserProvider(props) {
    const [bikeInfo, setBikeInfo] = useState([])
    const [bikes, setBikes] = useState([])
    const [orginalBikes, setOriginalBikes] = useState([])
    const [cartItems, setCartItems] = useState([])
    

    function getBikes(){
        userAxios.get("/api/bikes")
            .then(res => {
                setBikes(res.data)
                setOriginalBikes(res.data)
            })
            .catch(err => console.log(err))       
        } 
    
        useEffect(() => {
            getBikes()
        }, [])

        function typeChange(type) {
            setBikes(orginalBikes.filter(bike => type === "All" ? bike : bike.bikeType === type))
        }

        function addItem(product) {
            let newCartItems = [...cartItems, product]
            setCartItems(newCartItems)
        }

        function increaseQuantity(id) {
           const newCartItems = [...cartItems].map(item => {
               let newItem = {...item}
                if(newItem._id === id) newItem.quantity+=1
                return newItem
            })
            setCartItems(newCartItems)
        }

        function decreaseQuantity(id) {
            const newCartItems = [...cartItems].map(item => {
                let newItem= {...item}
                if(newItem._id === id && newItem.quantity >= 1) newItem.quantity-=1
                return newItem
            })
            setCartItems(newCartItems)
        }

        function getOneBike(oneBike){
            userAxios.get(`/api/bikes/${oneBike}`)
                .then(res => { 
                    setBikeInfo(res.data)})
                .catch(err => console.log(err))                    
            }

            console.log(cartItems)
    return (
       <UserContext.Provider
            value={{
                getBikes,
                bikes,
                addItem,
                typeChange,
                cartItems,
                increaseQuantity,
                decreaseQuantity,
                getOneBike,
                bikeInfo
            }}
       >
           { props.children }
       </UserContext.Provider> 
    )
}