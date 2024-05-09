import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Story = new Schema({
    userId: {type: String, default: ''},
    imageStory: {type: String, default: ''},
    backgroundStory: {type: String, default: ''},
    audioStory:{type: String, default: ''},
    type: {type: String, default: ''},
    timePlay: {type: Number, default: 15},
    isExpiry: {type: Boolean, default: false}

}, {
    timestamps: true
})

const StoryModel = mongoose.model('Story', Story, 'Story');

export default StoryModel;