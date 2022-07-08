const express = require('express')
const router = express.Router();
const postController = require('./post.controller')
const needAuthenticated = require('../../middlewares/needAuthenticated')
const isAdmin = require('../../middlewares/isAdmin')

const validateInput = require('../../middlewares/validateInput')
const {createPostShema} = require('../post/post.validation')
// router tap hop cac API co diem chung => cung tien to'
// api/posts 

router.post('/',validateInput(createPostShema, 'body'),needAuthenticated, postController.createPost)
router.get('/', postController.getPosts)
router.put('/:postId',needAuthenticated ,postController.updatePost)
router.delete('/:postId', needAuthenticated, isAdmin, postController.deletePost)
module.exports = router;