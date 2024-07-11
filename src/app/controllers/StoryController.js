import StoryModel from "../models/Story.js";
import Music from '../models/Music.js'
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
    const { musicId, type, duration } = req.body;
    const { _id } = req.body.user;
    try {
      const resultImages = await s3UploadMultipleImage(req.files, 'stories');
      const now = new Date();
      const timeNowFormatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

      const story = new StoryModel();
      story.userId = _id;
      story.image = resultImages[0];
      story.musicId = musicId;
      story.type = type;
      story.duration = duration;
      story.timeCreated = timeNowFormatted;

      await story.save();
      console.log('Create story success!');
      return res.status(201).json({ message: 'Create story success!', status: 'success', code: 201 });
    } catch (error) {
      res.status(500).json({ message: 'ERROR when create story', status: 'failed', code: 500 });
      next(error)
    }
  },
  async getStories(req, res, next) {
    console.log('Get my stories');
    try {
      const { _id } = req.body.user
      const response = await StoryModel.find({ userId: _id })
      const filterMusicIsNotEmpty = response.filter(item => {
        return item.musicId !== ''
      })
      const getMusicIds = filterMusicIsNotEmpty.map(item => item.musicId)

      const musicReponse = await Music.find({ _id: { $in: getMusicIds } })
      const data = response.map((item, index) => {
        const { musicId, ...rest } = item._doc;
        let music = {}
        const findIndexMusic = getMusicIds.indexOf(musicId)
        if (findIndexMusic !== -1) {
          musicReponse.map(item => {

            if (item._id.toString() === musicId) {
              music = {
                ...item._doc
              }
            }
          })
        }

        return {
          ...rest,
          music: {
            ...music
          }
        }

      })
      return res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

}
export default StoryController