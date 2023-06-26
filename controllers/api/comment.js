const Post = require("../../models/post");
const User = require("../../models/user");
const Comment = require("../../models/comment");


async function create(req, res, next) {
  try {
    const post = await Post.findById(req.params.id)
    const comment = await Comment.create({ ...req.body, owner: req.user._id, postId: post._id })
    const user = await User.findById(req.user._id)
    if (!user || !comment || !post){
      return next()
    }
    post.comments.push(comment._id)
    await post.save()
    user.comments.push(comment._id)
    await user.save()
    await post.populate({
            path: "comments",
            populate: { path: "owner" },
          })
    await post.populate('owner')
    res.json(post)
  } catch(err) {
    return next(err)
  }
}

function deleteOne(req, res, next) {
  Comment.findOneAndDelete(req.params.id)
    .then(() => res.sendStatus(204))
    .catch((err) => res.status(400).json(err)) 
}

async function update(req, res, next) {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { ...req.body, owner: req.user._id },
      { new: true }
    );
    await comment.populate("owner")
    res.json(comment);
  } catch (err) {
    res.status(400).json(err);
  }
}

function addLike(req, res, next) {
  Comment.findById(req.params.id)
    .then(comment => {
      if (!comment.likes.includes(req.user._id)) {
        comment.likes.push(req.user._id);
        if (comment.dislikes.includes(req.user._id)) {
          comment.dislikes.remove(req.user._id);
        }
        comment.save();
        res.json(comment);
      } else {
        comment.likes.remove(req.user._id);
        comment.save();
        res.json(comment);
      }
    }) 
    .catch(next);
}

function addDislike(req, res, next) {
  Comment.findById(req.params.id)
    .then(comment => {
      if (!comment.dislikes.includes(req.user._id)) {
        comment.dislikes.push(req.user._id);
        if (comment.likes.includes(req.user._id)) {
          comment.likes.remove(req.user._id);
        }
        comment.save();
        res.json(comment);
      } else {
        comment.dislikes.remove(req.user._id);
        comment.save();
        res.json(comment);
      }

    })
    .catch(next);
}

module.exports = {
  create,
  deleteOne,
  update,
  addLike,
  addDislike,
};
