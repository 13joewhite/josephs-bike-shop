//const mongoose = require("mongoose")
const express = require("express")
const bikesRoute = express.Router()
const Bikes = require("../models/bikes")

//  Get All 
bikesRoute.get("/", (req, res, next) => {
    console.log('is this working post')
        Bikes.find((err, bikes) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(bikes)
        })
})

//  Get One 
bikesRoute.get("/:bikeId", (req, res, next) => {
    Bikes.findById({ _id: req.params.bikeId }, (err, findBike) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(findBike)
    } )
}) 
 
bikesRoute.post("/", (req, res, next) => {
    const newBike = new Bikes(req.body)
    newBike.save((err, savedBike) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedBike)
    }) 
})

bikesRoute.delete("/:bikeId", (req, res, next) => {
    Bikes.findOneAndDelete({ _id: req.params.bikeId}, (err, deleteBike) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted ${deleteBike.bikeName} `)
    })
})

 

module.exports = bikesRoute