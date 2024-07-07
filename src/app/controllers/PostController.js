
import { s3UploadMultipleImage } from '../../middleware/S3Service.js'
import PostModel from "../models/Post.js";
import UserModel from '../models/User.js';

class PostController {

    async createPost(req, res, next) {
        try {
            const { _id } = req.body.user;
            const {
                music,
                description,
                type
            } = req.body;
            console.log(req.body);
            console.log(req.files)
            console.log(req.file);
            let images = [];
            const now = new Date();
            const timeNowFormatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
            const photoResponseAWS = await s3UploadMultipleImage(req.files, 'posts/images');
            images = photoResponseAWS;
            const newPost = new PostModel();
            newPost.userId = _id;
            newPost.music = music ?? '';
            newPost.images = images;


            newPost.type = type;
            newPost.timeCreated = timeNowFormatted;
            newPost.description = description;
            console.log(newPost);
            await newPost.save();
            return res.status(200).json({ message: 'Tạo bài viết mới thành công', status: 'success', code: 201 })
        } catch (error) {
            next(error)
        }
    }

    async getPosts(req, res, next) {
        try {
            const limit = parseInt(req.query.limit) || 5;
            const page = parseInt(req.query.page) || 1;

            // console.log('Get post');
            // console.log('Page:', page, 'Limit:', limit);

            const postResponse = await PostModel.paginate({}, { limit, page });

            const dataResponse = await Promise.all(postResponse.docs.map(async item => {
                try {
                    const user = await UserModel.findOne({ _id: item.userId });
                    return {
                        ...item.toObject(),
                        name: user.fullName,
                        avatar: user.avatar,
                        postType: {
                            type: item.type,
                            images: item.images
                        }
                    };
                    
                } catch (error) {
                    console.error(`Error fetching user data for userId ${item.userId}:`, error);
                    return {
                        ...item.toObject(),
                        userName: null,
                        avatar: null
                    };
                }
            }));
            if (dataResponse.length !== 0) {
                res.status(200).json({
                    data: dataResponse,
                    total: postResponse.total,
                    limit,
                    page,
                    nextPage: postResponse.nextPage,
                    prevPage: postResponse.prevPage,
                });
            } else {
                res.status(200).json({ data: [] });
            }
        } catch (error) {
            next(error);
        }
    }
}

export default new PostController();