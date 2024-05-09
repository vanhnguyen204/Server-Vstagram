import auth from "./auth.js";
import story from './story.js'
import music from "./music.js";

const route = (app) => {
    app.use('/api/auth', auth);
    app.use('/api/media/story', story);
    app.use('/api/music', music);
}

export default route;
