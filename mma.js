//model file
//install mongos, npm i mongoose

let mongoose = require('mongoose')

//setup schema
let youtubeSchema = mongoose.Schema

//setup collection configuration
let mmaCollection = new youtubeSchema({

    "title":String,
    "vid":String,
    "likes":Number,
    "dislikes":Number

}, {collection:"mma"})

module.exports=mongoose.model('mma', mmaCollection)
