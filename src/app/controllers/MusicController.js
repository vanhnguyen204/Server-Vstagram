import MusicModel from "../models/Music.js";
import dotenv from 'dotenv';
dotenv.config();
import { s3Uploadv3, s3Uploadv3Image } from '../../middleware/S3Service.js'

export const MusicController = {
    async createMusic(req, res, next) {
        console.log('Create music!');
        console.log(req.body)
        try {
            const filterAudioMusic = req.files.filter((item) => {
                const index = item.mimetype.indexOf('/');
                const subTypeAudio = item.mimetype.substring(0, index);
                return subTypeAudio === 'audio'
            })
            console.log(filterAudioMusic);
            const filterImageMusic = req.files.filter((item) => {
                const index = item.mimetype.indexOf('/');
                const subTypeAudio = item.mimetype.substring(0, index);
                return subTypeAudio === 'image'
            })
            console.log(filterImageMusic);


            const {
                title,
                artist,
            } = req.body


            const results = await s3Uploadv3(filterAudioMusic);
            const resultsImgAwsS3 = await s3Uploadv3Image(filterImageMusic[0]);
            const music = new MusicModel();
            music.title = title;
            music.urlMedia = results[0];
            music.image = resultsImgAwsS3;
            music.artist = artist;
            await music.save();
            return res.json({ status: "success", music_data: music });
        } catch (err) {
            console.log(err);
            next(err)
        }
    },
    async getMusics(req, res, next) {
        try {
            const limit = parseInt(req.query.limit) || 1;
            const page = parseInt(req.query.page) || 1;
            console.log(limit, page);
            const musicReponse = await MusicModel.paginate({}, { limit: limit, page: page });

            if (musicReponse.docs.length !== 0) {
                res.status(200).json({
                    data: musicReponse.docs,
                    total: musicReponse.total,
                    limit,
                    page,
                    nextPage: musicReponse.nextPage,
                    prevPage: musicReponse.prevPage,
                });
            } else {
                res.json({ data: [], message: 'Music is empty!' })
            }
        } catch (error) {
            next(error)
        }

    }
}