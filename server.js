const express = require("express");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const path = require("path");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const app = express();

// Body-Parser 
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))

// Mongodb Setup
mongoose.set('useCreateIndex', true)
mongoose.connect("mongodb://localhost:27017",{useNewUrlParser : true})
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const data = new Schema({
        firstname : String,
        lastname : String,
        firstnamef : String,
        lastnamef : String,
        age : Number,
        course : Number,
        section : String 
}) 
const Student = mongoose.model("Student",data)

//Set view Engine
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

// Set static path
app.set(express.static(path.join(__dirname,"public")))

app.get("/",(req,res)=>{
    res.render("enter.ejs")
})
app.post("/data",(req,res)=>{
const Student1 = new Student({
    firstname : req.body.firstname,
    lastname : req.body.lastname,
    firstnamef : req.body.firstnamef,
    lastnamef : req.body.lastnamef,
    age : req.body.age,
    course : req.body.course,
    section : req.body.section
})
Student1.save(function(err,result){
    if(err){
        console.log(err)
    }
    else{
        console.log(result)
        res.redirect("/")
    }
})
})
app.get("/search",(req,res)=>{
    res.render("search.ejs")
})
app.post('/search',(req,res)=>{
    console.log(req.body.value)
    Student.find({firstname : req.body.value},(err,result)=>{
        if(err){
             res.send(err)
        }
        else{
             res.json(result)
        }
    })
})
app.listen(1000,()=>{
    console.log("Server Started")
})