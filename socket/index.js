const io = require('socket.io')(8900,{
    cors:{},
})


let users=[]

const addUser = (userId,socketId)=>{
    !users.some(user=>user.userId===userId) &&users.push({userId,socketId})
}


const removeUser =(socketId)=>{
    users=users.filter((user)=>user.socketId!==socketId)
}

const getUser = (userId)=>{
    return users.find((user)=>user.userId===userId)
}

io.on('connection',(socket)=>{
    console.log(socket.id)

    socket.on('addUser',userId=>{
        addUser(userId,socket.id)
    })

    socket.on('sendMessage',({senderId,receiverId,text})=>{
        const user = getUser(receiverId);
        io.to(user.socketId).emit('getMessages',{
            senderId,
            text,
        })
    })
    socket.on('disconnect',()=>{
        removeUser(socket.id)
    })
})