import mongoose from "mongoose";
const Schema = mongoose.Schema;
import paginate from "mongoose-paginate-v2";
const Post = new Schema({
    userId: { type: String, default: '' },
    images: { type: Array , default: []},
    music: { type: String, default: '' },
    type: { type: String, default: '' },
    timeCreated: { type: String, default: '' },
    description: { type: String, default: '' },
}, {
    timestamps: true
})
Post.plugin(paginate)
const PostModel = mongoose.model('Post', Post, 'Post');

export default PostModel;