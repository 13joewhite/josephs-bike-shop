//const mongoose = require("mongoose")
const express = require("express")
const bikesRoute = express.Router()
const Bikes = require("../models/bikes")

//  Get All 
bikesRoute.get("/", async (req, res, next) => {
    try {
        let bikes = await Bikes.find() 
        return res.status(200).send(bikes)
    } catch (error) {
        console.log(error.message)
        res.status(500)
    }
})

//  Get One 
bikesRoute.get("/:bikeId", async (req, res, next) => {
    try {
        let bike = await Bikes.findById({ _id: req.params.bikeId })
        return res.status(200).send(bike)
    } catch (error) {
        console.log(error.message)
        res.status(500)   
    }
}) 
 
// bikesRoute.post("/", async (req, res, next) => {
//     const newBike = new Bikes(req.body)
//     newBike.save((err, savedBike) => {
//         if(err){
//             res.status(500)
//             return next(err)
//         }
//         return res.status(201).send(savedBike)
//     }) 
// })

// bikesRoute.delete("/:bikeId", async (req, res, next) => {
//     Bikes.findOneAndDelete({ _id: req.params.bikeId}, (err, deleteBike) => {
//         if(err){
//             res.status(500)
//             return next(err)
//         }
//         return res.status(200).send(`Successfully deleted ${deleteBike.bikeName} `)
//     })
// })

 

module.exports = bikesRoute