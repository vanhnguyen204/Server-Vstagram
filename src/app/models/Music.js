import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
const Schema = mongoose.Schema;

const Music = new Schema({
    title: { type: String, default: '' },
    urlMedia: { type: String, default: '' },
    image: { type: String, default: '' },
    artist: {type: String, default: ''},

}, {
    timestamps: true
})

Music.plugin(paginate)
const MusicModel = mongoose.model('Music', Music, 'Music');

export default MusicModel;