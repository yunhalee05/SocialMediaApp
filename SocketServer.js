let users = []

const SocketServer = (socket) =>{

    //Connect -Disconnect
    socket.on('joinUser', user=>{
        users.push({id:user._id, socketId:socket.id, followers:user.followers})
        // console.log({users})
        console.log({users})
    } )

    socket.on('disconnect', ()=>{
        users = users.filter(user=>user.socketId !== socket.id)
        // console.log({users})
    })

    //likes

    socket.on('likePost', likedpost =>{
        const ids = [...likedpost.user.followers, likedpost.user._id]
        const clients = users.filter(user=> ids.includes(user.id))

        if(clients.length>0){
            clients.forEach(client=>{
                socket.to(`${client.socketId}`).emit('likeToClient', likedpost)
            })
        }
    })

    socket.on('unlikePost', unlikedpost =>{
        const ids = [...unlikedpost.user.followers, unlikedpost.user._id]
        const clients = users.filter(user=>ids.includes(user.id))

        if(clients.length>0){
            clients.forEach(client=>{
                socket.to(`${client.socketId}`).emit('unlikeToClient', unlikedpost)
            })
        }
    })

    //Comments

    socket.on('createComment', newpost=>{
        const ids = [...newpost.user.followers, newpost.user._id]
        const clients = users.filter(user=>ids.includes(user.id))

        if(clients.length>0){
            clients.forEach(client=>{
                socket.to(`${client.socketId}`).emit('createCommentToClient', newpost)
            })
        }
    })
    socket.on('deleteComment', newpost=>{
        const ids = [...newpost.user.followers, newpost.user._id]
        const clients = users.filter(user=>ids.includes(user.id))

        if(clients.length>0){
            clients.forEach(client=>{
                socket.to(`${client.socketId}`).emit('deleteCommentToClient', newpost)
            })
        }
    })

    // Follow
    socket.on('follow', data=>{
        const user = users.find(user=>user.id ===data.user._id)
        // console.log(user)
        user &&  socket.to(`${user.socketId}`).emit('followToClient', data)
    })

    socket.on('unfollow', data=>{
        const user = users.find(user=>user.id ===data.user._id)
        user &&  socket.to(`${user.socketId}`).emit('unfollowToClient', data)
    })

    // Notification
    socket.on('createNotify', msg=>{
        const client = users.find(user=>msg.recipients.includes(user.id))
        console.log(msg)
        client && socket.to(`${client.socketId}`).emit('createNotifyToClient', msg)
    })

    socket.on('removeNotify', msg=>{
        const client = users.find(user=>msg.recipients.includes(user.id))
        // console.log(client)
        client && socket.to(`${client.socketId}`).emit('removeNotifyToClient', msg)
    })


    
}

module.exports=SocketServer