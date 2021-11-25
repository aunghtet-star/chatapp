let express = require('express');
let socket = require('socket.io');
// --------------- app set up --------------------

let app = express()

// --------------- server set up --------------------

let server = app.listen(4000,()=>{
    console.log("project is running on localhost:4000");
})

// --------------- Route set up --------------------

app.get('/',(res,req)=>{
    req.sendFile(__dirname + "/public/index.html");
})

// --------------- Socket set up --------------------

let io = socket(server);
io.on('connection',(socket)=>{
    socket.on('chat',(data)=>{
        io.sockets.emit('chat',data);
    });

    socket.on('typing',(name)=>{
        socket.broadcast.emit('typing',name);
    })
})