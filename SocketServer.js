let users = []

const SocketServer = (socket) =>{

    //Connect -Disconnect
    socket.on('joinUser', user=>{
        users.push({id:user._id, socketId:socket.id, followers:user.followers})
        // console.log({users})
    } )

    socket.on('disconnect', ()=>{
        const data = users.find(user=>user.socketId === socket.id)
        if(data){
            const clients = users.filter(user=>data.followers.find(item=>item._id ===user.id))
            if(clients.length>0){
                clients.forEach(client=>{
                    socket.to(`${client.socketId}`).emit('checkUserOffline', data.id)
                })
            }
            if(data.call){
                const callUser = users.find(user=>user.id===data.call)
                if(callUser){
                    // console.log({callUser})
                    users = users.map(user=>user.id ===callUser.id ? {...user, call:null}:user)
                    socket.to(`${callUser.socketId}`).emit('callerDisconnect')
                }
            }
        }
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
        const user = users.find(user=>user.id ===data._id)
        // console.log(user)
        // console.log(data)
        user &&  socket.to(`${user.socketId}`).emit('followToClient', data)
    })

    socket.on('unfollow', data=>{
        const user = users.find(user=>user.id ===data._id)
        // console.log(data)
        user &&  socket.to(`${user.socketId}`).emit('unfollowToClient', data)
    })

    // Notification
    socket.on('createNotify', msg=>{
        const client = users.find(user=>msg.recipients.includes(user.id))
        // console.log(msg)
        client && socket.to(`${client.socketId}`).emit('createNotifyToClient', msg)
    })

    socket.on('removeNotify', msg=>{
        const client = users.find(user=>msg.recipients.includes(user.id))
        // console.log(client)
        client && socket.to(`${client.socketId}`).emit('removeNotifyToClient', msg)
    })


    //Message
    socket.on('addMessage', msg=>{
        const user = users.find(user=>msg.recipient === user.id)
        user && socket.to(`${user.socketId}`).emit('addMessageToClient', msg)
    })

    //Check User Online/Offline
    socket.on('checkUserOnline', data=>{
        // console.log(user)
        const following = users.filter(user=>data.following.find(item=>item._id ===user.id))

        socket.emit('checkUserOnlineToMe', following)

        const clients = users.filter(user=>data.followers.find(item => item._id ===user.id))
        if(clients.length >0){
            clients.forEach(client=>{
                socket.to(`${client.socketId}`).emit('checkUserOnlineToClient', data._id)
            })
        }
    })

    //Call
    socket.on('callUser', data=>{
        users = users.map(user=>user.id===data.sender? {...user, call:data.recipient} : user )
        const client = users.find(user=>user.id ===data.recipient)

        // console.log('oldUsers:' + users)
        if(client){
            if(client.call){
                socket.emit('userBusy',data)
                users=users.map(user=>user.id===data.sender?{...user, call:null }: user )
            }else{
                users = users.map(user=>user.id===data.recipient? {...user, call:data.sender}: user)
                socket.to(`${client.socketId}`).emit('callUserToClient', data)
            }
        }

    })

    socket.on('endCall', data=>{
        const client = users.find(user=>user.id===data.sender)
        // console.log({sender:client})
        if(client){
            socket.to(`${client.socketId}`).emit('endCallToClient', data)
            users=users.map(user=>user.id===client.id?{...user, call:null }: user )
            if(client.call){
                const clientCall = users.find(user=>user.id===client.call)
                // console.log({receiver:clientCall})
                clientCall && socket.to(`${clientCall.socketId}`).emit('endCallToClient', data)
                users=users.map(user=>user.id===data.recipient?{...user, call:null }: user )
            }
        }

        // console.log({endUser:users})
    })

    
}

module.exports=SocketServer