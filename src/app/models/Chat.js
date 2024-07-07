import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
const Schema = mongoose.Schema;
const{SchemaTypes} = mongoose
const Chat = new Schema({
    userIdSent: { type: String, default: '' },
    userIdReceived: { type: String, default: '' },
    message: { type: SchemaTypes.Mixed, default: '' },
    timeChat: {type: String, default: ''},

}, {
    timestamps: true
})

Chat.plugin(paginate)
const ChatModel = mongoose.model('Chat', Chat, 'Chat');

export default ChatModel;