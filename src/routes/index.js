import auth from "./auth.js";
import story from './story.js'
import music from "./music.js";
import post from './post.js'
const route = (app) => {
    app.use('/api/auth', auth);
    app.use('/api/media/story', story);
    app.use('/api/music', music);
    app.use('/api/media/post', post)
}

export default route;
