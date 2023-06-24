const Post = require("../../models/post");
const User = require("../../models/user");

async function create(req, res) {
  try {
    const post = await Post.create({...req.body, owner: req.user._id});
    await post.populate("comments")
    await post.populate("owner")
    res.json(post);
  } catch (err) {
    res.status(400).json(err);
  }
}


async function index(req, res) {
    const animal = req.query.animal
    const searchTerm = req.query.q
    let queriedPosts = []
    if(animal) {
        try {
            queriedPosts.push(await Post.find({ animal: animal })
                .populate({
                    path: "comments",
                    populate: { path: "owner" },
                })
                .populate("owner")
                .sort({ createdAt: "desc"})
            )
            queriedPosts = queriedPosts[0]
        } catch(err) {
            res.status(400).json(err)
            return
        }
    }
    if(searchTerm) {
        if(queriedPosts.length) {
            queriedPosts = queriedPosts.filter(post => post.text.includes(searchTerm))
        }
        else {
            try {
                const regex = new RegExp(searchTerm)
                queriedPosts.push(await Post.find({ "text": {$regex: regex}}).populate({
                        path: "comments",
                        populate: { path: "owner" },
                    })
                    .populate("owner")
                    .sort({ createdAt: "desc"})
                )
            queriedPosts = queriedPosts[0]
            } catch(err) {
                res.status(400).json(err)
                return
            }
        }
    } 
    if(!searchTerm && !animal) {
        try {
            queriedPosts.push(await Post.find({}).populate("owner").populate("comments")
                .populate({
                    path: "comments",
                    populate: { path: "owner" },
                })
                .sort({ createdAt: "desc"})
            ) 
            queriedPosts = queriedPosts[0]
        } catch(err) {
            res.status(400).json(err);
            return
        }
    }
    res.json(queriedPosts)
}

async function show(req, res) {
	try {
        const post = await Post.findById(req.params.id).populate('owner').populate("comments")
            .populate({
                path: "comments",
                populate: { path: "owner" },
            })
        res.json(post)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function deleteOne(req, res) {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        res.sendStatus(204)
    } catch(err) {
        res.status(400).json(err)
    }
}

async function update(req, res) {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {...req.body, owner: req.user._id}, {new: true});
        await post.populate("comments")
        await post.populate("owner")
        await post.populate({
                path: "comments",
                populate: { path: "owner" },
            })
        res.json(post)
    } catch (err) {
        res.status(400).json(err)
    }
}

async function addLike(req,res){
    try {
        const post = await Post.findById(req.params.id)
        if (!(post.likes.includes(req.user._id))){
            post.updateOne(post.likes.push(req.user._id))
            if(post.dislikes.includes(req.user._id)) {
                post.updateOne(post.dislikes.remove(req.user._id))
            }
            post.save()
            res.json(post)
        } else {
            post.updateOne(post.likes.remove(req.user._id))
            post.save()
            res.json(post)
        }
    } catch (err) {
        res.status(400).json(err)
    }
}

async function addDislike(req,res){
    try {
        const post = await Post.findById(req.params.id)
        if (!(post.dislikes.includes(req.user._id))){
            post.updateOne(post.dislikes.push(req.user._id))
            if(post.likes.includes(req.user._id)) {
                post.updateOne(post.likes.remove(req.user._id))
            }
            post.save()
            res.json(post)
        } else {
            post.updateOne(post.dislikes.remove(req.user._id))
            post.save()
            res.json(post)
        }
    } catch(err) {
        res.status(400).json(err)
    }
}



module.exports = {
    create,
    show,
    index,
    deleteOne,
    update,
    addLike,
    addDislike,
};
