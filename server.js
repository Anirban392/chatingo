const express = require('express');

const app = express()
const http =require('http').createServer(app)

app.use('/public',express.static('public'));

const PORT = process.env.PORT || 7111

http.listen(PORT, ()=>{
    console.log(`listening on the ${PORT}`)
})




app.get('/',(req, res)=>{
    res.sendFile(__dirname + '/index.html')
})






//socket

const io =require('socket.io')(http)

io.on('connection',(socket)=>{
    console.log('connected on server side......')

    socket.on('message',(msg)=>{
       socket.broadcast.emit('message',msg)
    })



})


