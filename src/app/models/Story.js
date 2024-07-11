import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Story = new Schema({
    userId: {type: String, default: ''},
    image: {type: String, default: ''},
    video: {type: String, default: ''},
    musicId:{type: String, default: ''},
    type: {type: String, default: ''},
    duration: {type: Number, default: 15},
    timeCreated: {type: String, default: ''}

}, {
    timestamps: true
})

const StoryModel = mongoose.model('Story', Story, 'Story');

export default StoryModel;