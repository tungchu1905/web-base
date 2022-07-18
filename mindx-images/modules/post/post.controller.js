const PostModel = require('./post');
const HTTPError = require('../../common/httpError');
const { getMaxListeners } = require('./post');
const UserModel = require('../auth/user');
const { post } = require('./post.router');


//CREATE
const createPost = async (req, res) => {
    // su dung csdl
    try {

        console.log(req.user)

        const senderUser = req.user;
        const { title, description, imageUrl, createdBy } = req.body;

        const newPost = await PostModel.create({
            title,
            description,
            imageUrl,
            createdBy: senderUser._id
        })
        res.send({ success: 1, data: newPost })
    } catch (error) {
        res.status(400).send({ success: 0, message: error.message });
    }

}

//get trending
const getHotPosts = async (req, res, next) => {
    try {
        const posts = await PostModel.find({
            likeCount: { $gt: 10 }
        })
            .sort({ likeCount: -1 })
        res.send({ success: 1, data: posts });
    } catch (error) {
        next(error);
    }
}


// READ va phan trang
const getPosts = async (req, res, next) => {
    try {
        const { createdBy, keyword, tag, offset, limit,
            sort
        } = req.query;

        //phan trang 
        const offsetNumber = offset && Number(offset) ? Number(offset) : 0;
        const limitNumber = limit && Number(limit) ? Number(limit) : 4;

        let filter = {};
        //sap xep
        let sortCond = {}
        if (sort) {
            const [sortField, sortDirection] = sort.split('_');
            if (sortField && sortDirection) {
                sortCond[sortField] = sortDirection === 'desc' ? 1 : -1
            }
        }
        // get post by createdBy
        if (createdBy) {
            filter.createdBy = createdBy
        }

        if (keyword) {
            const regex = new RegExp(`${keyword}`, 'i')
            const regexCond = { $regex: regex }
            // filter.title = {$regex: regex}
            filter['$or'] = [

                { title: regexCond },
                { description: regexCond }

            ]
        }

        if (tag) {
            filter.tags = tag
        }
        const [posts, totalPost] = await Promise.all([
            PostModel
                .find(filter)
                .populate('createdBy', '-password -__v')
                .skip(offsetNumber)
                .limit(limitNumber)
                .sort(sortCond),
            PostModel.countDocuments(filter)
        ])


        const enhanceUsernamePosts = posts.map(post => {
            const clonePost = JSON.parse(JSON.stringify(post));

            return {
                ...clonePost,
                createdUsername: post.createdBy ? post.createdBy.username : "",
                createdBy: post.createdBy ? post.createdBy._id : "",
            }
        })

        // // const totalPost = await PostModel.countDocuments(filter);
        // const totalPages = totalPost / limitNumbber

        // //neu khong dung populate 
        // const userIds = posts.map(post => post.createdBy)
        // const users = await UserModel.find({
        //     _id: { $in: userIds }
        // });

        // //
        // let mapUser = {}
        // users.forEach(u => {
        //     mapUser[u._id] = u.username
        // })



        res.send({
            success: 1,
            data: {
                data: enhanceUsernamePosts,
                totalPosts: totalPost,
                // pages: Math.ceil(totalPages)
            }
        });
    } catch (error) {
        next(error);
    }
}
// UPDATE
const updatePost = async (req, res) => {
    // su dung csdl
    try {

        const senderUser = req.user;

        const { postId } = req.params;
        const dataUpdatePost = req.body;

        // chi user tao post  moi duoc sua post
        const foundPost = await PostModel.findById(postId);
        if (!foundPost) {
            throw new HTTPError(400, 'Post not found ')
        }
        if (String(foundPost.createdBy) !== String(senderUser._id)) {
            throw new HTTPError(400, 'This user do not have permission')
        }

        // const updatePost = await PostModel.findOne(
        //     {postId, createdBy: existedUser._id},
        //     dataUpdatePost,
        //     { new: true })
        const updatePost = await PostModel.findByIdAndUpdate(
            postId,
            dataUpdatePost,
            { new: true }
        )

        res.send({
            success: 1, data: updatePost,
        })

    } catch (error) {
        res.status(400).send({ success: 0, message: error.message });
    }
}
// DELETE 
const deletePost = async (req, res) => {
    // su dung csdl
    try {
        const { postId } = req.params;
        const delPost = await PostModel.findByIdAndDelete(
            postId
        )
        res.send({ success: 1, data: delPost })
    } catch (error) {
        res.status(400).send({ success: 0, data: null });
    }

}

const likePost = async (req, res) => {
    // su dung csdl
    try {
        const { postId } = req.params;

        const updatePost = await PostModel.findByIdAndUpdate(
            postId,
            { $inc: { likeCount: 1 } },
            { new: true }
        )
        res.send({ success: 1, data: updatePost });

    } catch (error) {
        res.status(400).send({ success: 0, message: error.message });
    }
}

const addTag = async (req, res) => {
    // su dung csdl
    try {
        const { postId } = req.params;
        const { tag: newTag } = req.body;

        const updatePost = await PostModel.findByIdAndUpdate(
            postId,
            { $push: { tags: newTag } },
            { new: true }
        )
        res.send({ success: 1, data: updatePost });

    } catch (error) {
        res.status(400).send({ success: 0, message: error.message });
    }
}

module.exports = {
    createPost,
    getPosts,
    updatePost,
    deletePost,
    likePost,
    addTag,
    getHotPosts
}