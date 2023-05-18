const fs = require('fs')
const server = require('http').createServer()

server.on('request',(req,res)=>{
    //solution 1
   /* fs.readFile('./test-file.txt',(err,data)=>{
        if(err) console.log('Encountered error')
        res.end(data)
    })*/

    //solution 2 --> streams --> but backpressure problem
    //(cannot give fast response as it receives request)
   /* const readable = fs.createReadStream("test-file.txt")
    readable.on("data",(chunk)=>{
        res.write(chunk)
    })
    readable.on("end",()=>{
        res.end()
    })
    readable.on("error",err=>{
        console.log(err)
        res.statusCode(500)
        res.end("File Not Found")
    })*/
    
    //Solution 3
    const readable = fs.createReadStream("test-file.txt")
    readable.pipe(res)
})

server.listen(8000,'127.0.0.1',()=>console.log('listening to port 8000'))