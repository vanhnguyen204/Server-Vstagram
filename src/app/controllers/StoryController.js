import StoryModel from "../models/Story.js";
import dotenv from 'dotenv';
dotenv.config();
import { s3Uploadv3, s3UploadMultipleImage } from '../../middleware/S3Service.js'
import { verifyToken } from "../../middleware/auth.js";

const StoryController = {
  // async createMedia(req, res, next) {
  //   console.log(req.files);
  //   try {
  //     const results = await s3Uploadv3(req.files);
  //     console.log(results);
  //     return res.json({ status: "success" });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  async createStory(req, res, next) {
    console.log('Create story');
    const { audioMedia, type, timePlay, accessToken } = req.body;
    console.log(req.body);
    try {
      const verify = await verifyToken(accessToken);
      if (!verify) {
        return res.status(404).json({ message: 'Can not verify this token' });
      }
      const resultImages = await s3UploadMultipleImage(req.files, 'stories');
  
      const story = new StoryModel();
      story.userId = verify._id;
      story.imageStory = resultImages[0];
      story.backgroundStory = resultImages[1];
      story.audioStory = audioMedia;
      story.type = type;
      story.timePlay = timePlay;

      const storyResponse = await story.save();
      if (!storyResponse) {
        return res.status(500).json({message: 'Can not create story'})
      }
      return res.status(201).json({ data: story, message: 'Create story success!' });
    } catch (error) {
      return res.status(500).json({ message: 'ERROR when create story' });
    }
  }

}
export default StoryController