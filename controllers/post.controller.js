const PostModel = require("../models/post.model")

module.exports.getPosts = async (req, res) => {
  const posts = await PostModel.find()
  res.status(200).json(posts)
}

module.exports.setPosts = async (req, res) => {
  if (!req.body.message) {
    res.status(400).json({ message: "Merci d'ajouter un message" })
  }

  const post = await PostModel.create({
    message: req.body.message,
    author: req.body.author,
  })

  res.status(201).json(post)
}

module.exports.editPost = async (req, res) => {
  console.log(req.params.id)
  // res.json({ message: "hello" })
  const post = await PostModel.findById(req.params.id)

  if (!post) {
    res.status(400).json({ message: `pas de post avec l'id ${req.params.id}` })
  }

  const updatePost = await PostModel.findByIdAndUpdate(post, req.body, {
    new: true,
  })

  res.status(200).json({ message: `maj post ${req.params.id}` })
}

module.exports.deletePost = async (req, res) => {
  const post = PostModel.findById(req.params.id)

  if (!post) {
    res.status(400).json({ message: `pas de post avec l'id ${req.params.id}` })
  }

  await PostModel.findByIdAndRemove(req.params.id)

  res.status(200).json({ message: `delete post ${req.params.id}` })
}

module.exports.likePost = async (req, res) => {
  try {
    const post = await PostModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likers: req.body.userId } },
      { new: true }
    ).then((data) => res.status(200).send(data))
  } catch (err) {
    res.status(400).json({ message: err })
  }
}

module.exports.dislikePost = async (req, res) => {
  try {
    const post = await PostModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { likers: req.body.userId } },
      { new: true }
    ).then((data) => res.send(data))
  } catch (err) {
    res.status(400).json({ message: err })
  }
}
