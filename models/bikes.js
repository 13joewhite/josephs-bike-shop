const mongoose = require("mongoose")
const { Schema } = mongoose

// BluePrint  
 
const bikeSchema = new Schema({
    bikeName: {
        type: String,
        required: true
    },
    bikeType: {
        type: String,
        required: true
    },
    bikeImage: {
        type: String,
        required: true
    },
    bikeDescription: {
        type: String, 
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        writeable: true
    } 
})

module.exports = mongoose.model("Bikes", bikeSchema)