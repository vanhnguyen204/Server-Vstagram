import ChatModel from "../models/Chat.js";
import UserModel from "../models/User.js";

class ChatController {
    async getConversationDetails(req, res, next) {
        try {
            const limit = parseInt(req.query.limit) || 20;
            const page = parseInt(req.query.page) || 1;
            const {userIdSent, userIdReceived} = req.query;
            const conversations = await ChatModel.paginate({
                $or: [
                    { userIdSent: userIdSent, userIdReceived: userIdReceived },
                    { userIdSent: userIdReceived, userIdReceived: userIdSent }
                ]
            }, { limit: limit, page: page });
            const data = {
            
                data: conversations.docs,
                totalDocs: conversations.totalDocs,
                totalPages: conversations.totalPages,
                limit,
                page,
                nextPage: conversations.nextPage,
                prevPage: conversations.prevPage,
            };
            return res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    async getConversations(req, res, next) {
        console.log('Get conversations');
        try {
            const limit = parseInt(req.query.limit) || 20;
            const page = parseInt(req.query.page) || 1;
            const { userIdSent, userIdReceived } = req.query
            console.log('query: ', req.query);

            const conversationDeatails = await Promise.all(userIdReceived.map(async item => {
                const conversations = await ChatModel.paginate({
                    $or: [
                        { userIdSent: userIdSent, userIdReceived: item },
                        { userIdSent: item, userIdReceived: userIdSent }
                    ]
                }, { limit: limit, page: page });
                const data = {
                    userIdSent: userIdSent,
                    userIdReceived: item,
                    data: conversations.docs,
                    totalDocs: conversations.totalDocs,
                    totalPages: conversations.totalPages,
                    limit,
                    page,
                    nextPage: conversations.nextPage,
                    prevPage: conversations.prevPage,
                };
                console.log('data: ', data);
                return data;
            }));
            return res.status(200).json(conversationDeatails);
        } catch (error) {
            next(error)
        }
    }
    async getOnlineUsers() {
        try {
            const onlineUsers = await UserModel.find({ activity: 'online' })

            const responseInfors = onlineUsers.map(item => {
                return {
                    userId: item._id.toString(),
                    avatar: item.avatar,
                    name: item.fullName
                }
            })
            return responseInfors;
        } catch (error) {
            console.log(error);
        }
    }
    async getNewUserConnected(userId) {
        try {
            const getUserInfor = await UserModel.findOne({ _id: userId });
            return {
                userId: getUserInfor._id.toString(),
                avatar: getUserInfor.avatar,
                name: getUserInfor.fullName
            }
        } catch (error) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
        }
    }

    async sendMessage(io, data, recipientSocketId) {
        try {
            const now = new Date();
            const timeNowFormatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

            const newChat = new ChatModel({
                userIdSent: data.userIdSent,
                userIdReceived: data.userIdReceived,
                message: data.message,
                timeChat: timeNowFormatted,
            });
            await newChat.save()
            io.to(recipientSocketId).emit('newMessage', newChat);
        } catch (error) {
            console.log(error)
        }
    }
}

export default new ChatController();