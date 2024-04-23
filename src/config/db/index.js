
import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
const db_url = 'mongodb://localhost:27017/VstagramDatabase';
 const connect = () => {
    mongoose.connect(db_url)
        .then(() => console.log('Connected mongodb!')).catch(e => console.log(e));
}

export default connect;
