const express = require('express')
const router = express.Router();
const postController = require('./post.controller')
const needAuthenticated = require('../../middlewares/needAuthenticated')
const isAdmin = require('../../middlewares/isAdmin')

const validateInput = require('../../middlewares/validateInput')
const {createPostShema} = require('../post/post.validation')
// router tap hop cac API co diem chung => cung tien to'
// api/posts 

// created
router.post('/',
validateInput(createPostShema, 'body'),
needAuthenticated, 
postController.createPost)

// read 
router.get('/', 
postController.getPosts)

// update
router.put('/:postId',
needAuthenticated ,
postController.updatePost)

// like post
router.put('/:postId/likes',
postController.likePost)

//Tag
router.put('/:postId/tags',
postController.addTag)

// hot post > 10likes // SEARCH
router.get('/hot',
postController.getHotPosts)

//delete
router.delete('/:postId', 
needAuthenticated, 
isAdmin, postController.deletePost)

module.exports = router;