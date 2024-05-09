import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Music = new Schema({
    title: { type: String, default: '' },
    urlMedia: { type: String, default: '' },
    image: { type: String, default: '' },
    artist: {type: String, default: ''},

}, {
    timestamps: true
})

const MusicModel = mongoose.model('Music', Music, 'Music');

export default MusicModel;