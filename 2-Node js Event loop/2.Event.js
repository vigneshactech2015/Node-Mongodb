//Eventemitter ---> event listener
const EventEmitter = require("events");

const myEmitter = new EventEmitter()

myEmitter.on("newSale",()=>{
    console.log("There was a new Sale")
})

myEmitter.on("newSale",()=>{
    console.log("Customer Name: Vignesh")
})

myEmitter.on("newSale",(stock)=>{
    console.log(`There are ${stock} items left in the stock!`)
})

myEmitter.emit("newSale",9)

/////////////////////Server

const http = require('http')

const server = http.createServer()

server.on("request",(req,res)=>{
    console.log("Request received")
    res.end("Request received")
})

server.on("request",(req,res)=>{
    console.log("Another request received")
})

server.on("close",()=>{
    console.log("Server Closed")
})

server.listen(8000,"127.0.0.1",()=>{console.log("server is listening to port 8000")})

