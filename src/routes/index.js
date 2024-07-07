import auth from "./auth.js";
import story from './story.js'
import music from "./music.js";
import post from './posts.js'
import chat from './chat.js'
const route = (app) => {
    app.use('/api/auth', auth);
    app.use('/api/media/story', story);
    app.use('/api/music', music);
    app.use('/api/media/posts', post)
    app.use('/api/chat', chat)
}

export default route;
