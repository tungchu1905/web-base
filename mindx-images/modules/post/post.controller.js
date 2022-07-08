const PostModel = require('./post');
const HTTPError = require('../../common/httpError')

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
// READ
const getPosts = async (req, res, next) => {
    try {
        const posts = await PostModel.find({})
        res.send({ success: 1, data: posts });
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
            throw new HTTPError(400,'Post not found ')
        }
        if (String(foundPost.createdBy) !== String(senderUser._id)) {
            throw new HTTPError(400,'This user do not have permission')
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
        res.status(400).send({ success: 0,message: error.message });
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
module.exports = {
    createPost,
    getPosts,
    updatePost,
    deletePost
}