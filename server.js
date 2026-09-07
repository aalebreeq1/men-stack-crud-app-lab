const ejs = require('ejs')  
const express = require('express') 
const app = express()   
const port = 3000  
const Car = require('./models/Car')
const connectToDB = require('./db') 
const dotenv = require('dotenv').config()
connectToDB()

app.set('view engine', 'ejs')  
app.use(express.static('public')) 
app.use(express.urlencoded({ extended: true }))



//? Routes

//* root route for home page
app.get('/',(req,res) =>{
    res.render('homepage')
})

// * route for displaying all cars
app.get( '/cars', async (req,res) =>{
    try{
        const cars = await Car.find()
        res.render('cars', { cars })
    }
    catch(err){
        console.log(err)
    }

})

// * route for creating a new car
app.post('/cars/new', async (req,res) =>{
    try{
        const createdCar = await Car.create(req.body)
        res.redirect('/cars')
    }
    catch(err){
        console.log(err)
    }
})



app.listen(port, () =>{
    console.log('Server is running on port 3000')
})