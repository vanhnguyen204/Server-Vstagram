import ChatController from "../app/controllers/ChatController.js";
import Chat from "../app/models/Chat.js";
import User from "../app/models/User.js";



const setupSocket = async (io) => {
    try {
        const users = new Map();
        io.on('connection', (socket) => {
            console.log('++++++++ New client connected +++++');

            // Khi một người dùng kết nối, lưu userId và socketId
            socket.on('register', async (userId) => {
                users.set(userId, socket.id);
                console.log(`User registered: ${userId} with socketId: ${socket.id}`);
                console.log(users);
                ChatController.getOnlineUsers()
                    .then(res => {
                        socket.emit('onlineUsers', res)
                    })
                    .catch(e => {
                        console.log(e);
                    })
                const newUserConnect = await ChatController.getNewUserConnected(userId)
                io.emit('userConnected', newUserConnect);

            });

            socket.on('onlineUsers', () => {
            })
            socket.on('sendMessage', async (data) => {
                try {

                    const socketIdReceived = await users.get(data.userIdReceived)
                    const socketIdSent = await users.get(data.userIdSent)
                    await ChatController.sendMessage(io, data, socketIdReceived, socketIdSent);
                } catch (error) {
                    console.error(error);
                }
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
                // remove userId when disconnected
                for (let [userId, socketId] of users) {
                    if (socketId === socket.id) {
                        users.delete(userId);
                        ChatController.getOnlineUsers(users)
                            .then(res => {
                                socket.emit('onlineUsers', res)
                            })
                            .catch(e => {
                                console.log(e);
                            })
                        ChatController.getNewUserConnected(userId)
                            .then(res => {

                                io.emit('userConnected', res);
                            })

                        break;
                    }
                }
            });
        });
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
};

export default setupSocket
