
// const io = require('socket.io')(3000);
// const cors = require('cors');

// const io = require('socket.io')(3000, {
//   cors: {
//     origin: '*',
//   }
// });

const port = process.env.PORT || 3000;
const io = require('socket.io')(port, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  }
});



const users = {};

io.on('connection', socket =>{ // everything will be in this 
    socket.on('new-user-joined',nameofuser=>{  // when a new user joins the chat
        // console.log('new user joined',nameofuser)
        users[socket.id] = nameofuser; 
        socket.broadcast.emit('user-joined',nameofuser);  // telling everyone that a new user have joined
    });

    socket.on('send',message=>{  // when  a user send any message
      socket.broadcast.emit('receive',{message:message , nameofuser:users[socket.id]})  // this is what others will recieve
    });

    socket.on('disconnect',message=>{  // when  a user leaves
      socket.broadcast.emit('left',users[socket.id])  // this is what others will recieve
      delete users[socket.id];  // deleting the user when he left
    });
})




// http.listen(3000, () => {
//     console.log('listening on *:3000');
//   });




