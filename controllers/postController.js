const formidable = require('formidable')
const { v4: uuid_v4 } = require('uuid')
const fs = require('fs')
const Post = require('../models/postModal')

module.exports.createPost = (req, res) => {
  const form = formidable({ multiples: true })
  form.parse(req, async (error, fields, files) => {
    const { title, body, description, slug, id, name } = fields

    const errors = []
    if (title === "") {
      errors.push({ msg: "タイトル入力がありません。" })
    }
    if (body === "") {
      errors.push({ msg: "メイン内容の入力がありません。" })
    }
    if (description === "") {
      errors.push({ msg: "説明内容の入力がありません。" })
    }
    if (slug === "") {
      errors.push({ msg: "画像のURLがありません。" })
    }
    if (Object.keys(files).length === 0) {
      errors.push({ msg: "イメージ画像をアップロードしてください。" })
    } else {
      const { type } = files.image
      const split = type.split("/")
      const extension = split[1].toLowerCase()
      if (extension !== "jpg" && extension !== "jpeg" && extension !== "png") {
        errors.push({ msg: `${extension}は有効な拡張子ではありません。` })
      } else {
        files.image.name = uuid_v4() + "." + extension
      }
    }

    const checkSlug = await Post.findOne({ slug })
    if (checkSlug) {
      errors.push({ msg: "独自のスラッグ/URLを選択してください。" })
    }
    if (errors.length !== 0) {
      return res.status(400).json({ errors, files })
    } else {
      const newPath = __dirname + `/../client/public/images/${files.image.name}`
      fs.copyFile(files.image.path, newPath, async (error) => {
        if (!error) {
          try {
            const response = await Post.create({
              title,
              body,
              image: files.image.name,
              description,
              slug,
              userName: name,
              userId: id,
            })
            return res.status(200).json({
              msg: "投稿は無事に作成されました。",
              response,
            })
          } catch (error) {
            return res.status(500).json({ errors: error, msg: error.message });
          }
        }
      })
    }
  })
}

module.exports.fetchPosts = async (req, res) => {
  const id = req.params.id
  const page = req.params.page
  const perPage = 3
  const skip = (page -1) * perPage
  try {
    const count = await Post.find({ userId: id }).countDocuments()
    const response = await Post.find({ userId: id }).skip(skip).limit(perPage).sort({ updatedAt: -1})
    return res.status(200).json({ response, count, perPage })
  } catch (error) {
    return res.status(500).json({ errors: error, msg: error.message });
  }
}
