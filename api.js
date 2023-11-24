let express = require('express')
const { request } = require('http')
let mongoose = require('mongoose')
const mma = require('./mma')
const { log } = require('console')

//create express app
let app = express()

//configure express app to encode/decode JSON
app.use (express.json())



//connect to mongodb database
let dbString = "mongodb+srv://username:password27@cluster0.vr2l9pv.mongodb.net/youtube"
mongoose.connect(dbString)
let db = mongoose.connection

//check if connection to db is success
db.on('open', ()=>{
    console.log("Connected to mongodb database in the cloud!");
})


//get the list of youtube videos
//GET http://localhost:1234/1.0/youtube/mma
app.get("/1.0/youtube/mma", (request, response)=>{
    //use model instanace to find all documents from db
    mma.find({})
        .then((data)=>{
            console.log("query sucess for /1.0/youtube/mma ")
            response.json(data)

        })
        .catch((error)=>{
            console.log("error for /1.0/youtube/mma")
            response.json (error)
        })
})



//GET http://localhost:1234/
app.get ("/", (request, response)=>{
    console.log("GET request received for / endpoint");
    response.send("Hello from express API, GET")
})

//GET http://localhost:1234/welcome
app.get ("/welcome", (request, response)=>{
    console.log("GET request received for /welcome endpoint");
    response.send("Hello from express API, GET")
})

//POST http://localhost:1234/welcome
app.post ("/welcome", (request, response)=>{
    console.log("POST request received for /welcome endpoint");
    response.send("Hello from express API, POST")
})

app.listen(1234, ()=>{
    console.log("Listening on port 1234");
})