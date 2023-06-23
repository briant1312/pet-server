const Post = require('../../models/post')
const User = require('../../models/user')
const Comment = require('../../models/comment')


function create(req, res, next){
    Post.findById(req.params.id)
            .then((post) => {
            post.comments.push(req.body)
            return post.save()
        })
        .then(post => {
            return post.populate({
                path: "comments",
                populate: { path: "owner" }
            })
        })
        .then((post) => res.json(post.comments)
        ) .catch(next)
}


function deleteOne(req, res, next){
    Post.findById(req.params.id)
        .then((post) => {
            post.comments.id(req.body.id).remove()
            return post.save()
        })
        .then(post => {
            return post.populate({
                path: "comments",
                populate: { path: "owner" }
            })
        })
        .then((post) => res.json(post.comments)
        ) .catch(next)
}

function update(req, res, next) {
    Post.findById(req.params.id)
        .then((post) => {
           const comment = post.comments.id(req.body.id)
           comment.text = req.body.text
           return post.save()
        })
        .then((post) => res.status(204).json(post)
        ) .catch(next)
}


function addLike(req,res,next){
    Post.findById(req.params.id)
        .then((post)=>{ 
            const comment = post.comments.id(req.body.id)
            if (!(comment.likes.includes(req.user._id))){
                comment.likes.push(req.user._id)
                if (comment.dislikes.includes(req.user._id)) {
                    comment.dislikes.remove(req.user._id)
                }
                post.save()
                res.json(comment)
            } else {
                comment.likes.remove(req.user._id)
                post.save()
                res.json(comment)
            }
        })
         .catch(next)
}

function addDislike(req,res,next){
    Post.findById(req.params.id)
        .then((post)=>{ 
            const comment = post.comments.id(req.body.id)
            if (!(comment.dislikes.includes(req.user._id))){
                comment.dislikes.push(req.user._id)
                if (comment.likes.includes(req.user._id)) {
                    comment.likes.remove(req.user._id)
                }
                post.save()
                res.json(comment)
            } else {
                comment.dislikes.remove(req.user._id)
                post.save()
                res.json(comment)
            }
        })
         .catch(next)
}

module.exports = {
    create,
    deleteOne,
    update,
    addLike,
    addDislike
}