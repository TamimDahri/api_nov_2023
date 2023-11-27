let express = require('express')
const { request } = require('http')
let mongoose = require('mongoose')
const mma = require('./mma')
const { log } = require('console')
const { title } = require('process')
let cors = require('cors')

//create express app
let app = express()

//configure express app to encode/decode JSON
app.use (express.json())
//configure cors to allow all incoming request
app.use(cors())



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
    //use model instance to find all documents from db
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

//add new video document to the database
//POST http://localhost:1234/1.0/youtube/add
app.post("/1.0/youtube/add", (request, response)=>{
    console.log("POST request for //1.0/youtube/add")
    //extract request body
    console.log(request.body)
    console.log(request.body.vid)
    console.log(request.body.likes)
    console.log(request.body.dislikes)
    console.log(request.body.title)
    //create instance of model -> mma
    let mmaNew = new mma({
        vid:request.body.vid,
        title:request.body.title,
        likes:request.body.likes,
        dislikes:request.body.dislikes

    })
    //save the model instance in database
    mmaNew.save()
        .then((data)=>{
            response.send({
                "status":"success",
                "saved":data
            })
        })
        .catch((error)=>{
            response.send(error)
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