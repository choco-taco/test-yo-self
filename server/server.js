const app = require('./app')
const db = require('./models')
const socket = require('socket.io')

db.sequelize.sync().then(() => {
    
    const PORT = process.env.PORT || 8080
    const server = app.listen(PORT, console.log(`Server started on port ${PORT}...`))
    const io = socket(server)

    io.on('connection', socket => {

        socket.on('room', data => {
            socket.join(data.room)
            socket.room = data.room
            socket.userId = data.userId
        })

        socket.on('chat', data => {
            io.to(socket.room).emit('chat', data)
        })

        socket.on('disconnect', () => {
            // If user that disconnected is session leader
            // Change session active = false
            console.log(`User ${socket.userId} disconnected from room ${socket.room}`)
            socket.room = undefined
        })

    })
})

