const mongoose = require('mongoose')


const carSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
        trim: true
    },
    type:{
        type:String,
        enum: ['Sedan' ,"SUV" , "Truck" , "Coupe", "Crossover"]
    },
    make:{
        type:String,
        required: true,
        trim: true
    },
    year:{
        type:Number,
        required: true,
    },
    MSRP:{
        type:Number,
        required:true,
        min: 0 

    },
    dealer:{
        type:String,
        required: true,
        trim: true
    },
    engine_type:{
        type:String,
        enum:['Petrol', 'Diesel', 'Electric', 'Hybrid']
    },
    img_url:{
        type:String
    }

},{timestamps: true})

const Car = mongoose.model('Car', carSchema)
module.exports = Car