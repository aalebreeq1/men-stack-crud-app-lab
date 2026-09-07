const ejs = require('ejs')
const express = require('express')
const app = express()
const port = 3000
const Car = require('./models/Car')
const connectToDB = require('./db')
const dotenv = require('dotenv').config()
connectToDB()
const methodOverride = require('method-override')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))



//? Routes

//* root route for home page
app.get('/', (req, res) => {
    res.render('homepage')
})

// * route for displaying all cars
app.get('/cars', async (req, res) => {
    try {
        const cars = await Car.find()
        res.render('all-cars', { cars })
    }
    catch (err) {
        console.log(err)
    }

})

// * route for creating a new car
app.get('/cars/new', (req, res) => {
    res.render('create-car')
})

app.post('/cars', async (req, res) => {
    try {
        const createdCar = await Car.create(req.body)
        res.redirect('/cars')
    }
    catch (err) {
        console.log(err)
    }
})

// * route for displaying a single car by ID
app.get('/cars/:id', async (req,res)=>{
    try{
        const car = await Car.findById(req.params.id)
        res.render('single-car', { car })

    }
    catch(err){
        console.log(err)
    }
})

// * route for showing form to edit existing car
app.get('/cars/:id/edit', async (req,res) =>{
    try{
        const car = await Car.findById(req.params.id)
        res.render("edit-car",{car})
    }
    catch(err){
        console.log(err)
    }
})

// * route for updating car by specific ID
app.put('/cars/:id' , async (req,res) =>{
    try{

        const car = await Car.findByIdAndUpdate(req.params.id, req.body)
        res.redirect(`/cars/${req.params.id}`)
    }
    catch(err){
        console.log(err)
    }
})

// * route for deleting a car by specific ID 

app.delete('/cars/:id', async (req,res) => {
    try{
        const deletedCar = await Car.findByIdAndDelete(req.params.id)
        res.redirect('/cars')

    }
    catch(err){
        console.log(err)
    }
})

app.listen(port, () => {
    console.log('Server is running on port 3000')
})