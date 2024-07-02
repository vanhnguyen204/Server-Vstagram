import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Comment = new Schema({
    userId: { type: String, default: '' },
    userAvatar: { type: String, default: '' },
    name: { type: String, default: '' },
    like: { type: Number, default: 0 },
    comment: { type: String, default: '' },
    timeCreated: { type: String, default: '' },
    mediaId: { type: String, default: '' },
}, {
    timestamps: true
})

const CommentModel = mongoose.model('Comment', Comment, 'Comment');

export default CommentModel;