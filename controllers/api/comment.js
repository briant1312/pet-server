const Post = require("../../models/post");
const User = require("../../models/user");
const Comment = require("../../models/comment");

async function create(req, res, next) {
  try {
    const post = await Post.findById(req.params.id);
    const comment = await Comment.create({
      ...req.body,
      owner: req.user._id,
      postId: post._id,
    });
    const user = await User.findById(req.user._id);
    if (!user || !comment || !post) {
      res.status(400).json("Server Error");
    }
    post.comments.push(comment._id);
    await post.save();
    user.comments.push(comment._id);
    await user.save();
    await post.populate({
      path: "comments",
      populate: { path: "owner" },
    });
    await post.populate("owner");
    res.json(post);
  } catch (err) {
    res.status(400).json("Server Error");
  }
}

async function deleteOne(req, res, next) {
  try {

    await Comment.findOneAndDelete({_id: req.params.id, owner: req.user._id});
    const user = await User.findById(req.user._id)
    console.log(user.comments)
    user.comments.remove(req.params.id);
    console.log(user)
    await user.save()
    res.json(user)
  } catch(err) {
    res.status(400).json("Server Error");
  }
}

async function update(req, res, next) {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { ...req.body, owner: req.user._id },
      { new: true }
    );
    await comment.populate("owner");
    res.json(comment);
  } catch (err) {
    res.status(400).json("Server Error");
  }
}

function addLike(req, res, next) {
  Comment.findById(req.params.id)
    .then((comment) => {
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
    .catch(res.status(400).json("Server Error"));
}

function addDislike(req, res, next) {
  Comment.findById(req.params.id)
    .then((comment) => {
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
    .catch(res.status(400).json("Server Error"));
}

module.exports = {
  create,
  deleteOne,
  update,
  addLike,
  addDislike,
};
