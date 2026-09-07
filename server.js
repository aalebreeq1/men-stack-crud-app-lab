const ejs = require('ejs')  
const express = require('express') 
const app = express()   
const port = 3000  
const connectToDB = require('./db') 
const dotenv = require('dotenv').config()
connectToDB()

app.set('view engine', 'ejs')  
app.use(express.static('public')) 
app.use(express.urlencoded({ extended: true }))

app.listen(port, () =>{
    console.log('Server is running on port 3000')
})