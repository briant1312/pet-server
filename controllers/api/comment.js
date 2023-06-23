const Post = require("../../models/post");
const User = require("../../models/user");
const Comment = require("../../models/comment");

function create(req, res, next) {
  Comment.create({ ...req.body, owner: req.user._id }).then(
    (comment) => {
      Post.findById(req.params.id)
        .then((post) => {
          post.comments.push(comment._id);
          return post.save();
        })
        .then((post) => {
          return post.populate({
            path: "comments",
            populate: { path: "owner" },
          });
        })
        .then((post) => {
          return post.populate("owner")
        })
        .then((post) => res.json(post))
        .catch(next);
    }
  );
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
  Post.findById(req.params.id)
    .then((post) => {
      const comment = post.comments.id(req.body.id);
      if (!comment.likes.includes(req.user._id)) {
        comment.likes.push(req.user._id);
        if (comment.dislikes.includes(req.user._id)) {
          comment.dislikes.remove(req.user._id);
        }
        post.save();
        res.json(comment);
      } else {
        comment.likes.remove(req.user._id);
        post.save();
        res.json(comment);
      }
    })
    .catch(next);
}

function addDislike(req, res, next) {
  Post.findById(req.params.id)
    .then((post) => {
      const comment = post.comments.id(req.body.id);
      if (!comment.dislikes.includes(req.user._id)) {
        comment.dislikes.push(req.user._id);
        if (comment.likes.includes(req.user._id)) {
          comment.likes.remove(req.user._id);
        }
        post.save();
        res.json(comment);
      } else {
        comment.dislikes.remove(req.user._id);
        post.save();
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
