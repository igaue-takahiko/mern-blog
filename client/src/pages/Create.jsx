import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

import { createPost } from '../redux/post/actions';

const initialState = {
  title: "",
  description: "",
  image: "",
}

const Create = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { user: { _id, name } } = useSelector(state => state.auth)
  const { createErrors, redirect } = useSelector(state => state.post)

  const [ postData, setPostData ] = useState(initialState)
  const [ imagePreview, setImagePreview ] = useState("")
  const [ currentImage, setCurrentImage ] = useState("画像ファイルを選択して下さい。")
  const [ slug, setSlug ] = useState("")
  const [ bodyValue, setBodyValue ] = useState("")
  const [ slugButton, setSlugButton ] = useState(false)

  const { title, description, image } = postData

  useEffect(() => {
    if (redirect) {
      history.push("/dashboard")
    }
    if (createErrors.length !== 0) {
      createErrors.map(err => toast.error(err.msg))
    }
  },[createErrors, history, redirect])

  const handleChangeInput = useCallback((e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value
    })
    const createSlug = e.target.value.trim().split(" ").join("-")
    setSlug(createSlug)
  },[postData])

  const handleFileInput = (e) => {
    if (e.target.files.length !== 0) {
      setCurrentImage(e.target.files[0].name)
      setPostData({
        ...postData,
        [e.target.name]: e.target.files[0]
      })
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleUPL = (e) => {
    e.preventDefault()
    setSlug(slug.trim().split(" ").join("-"))
  }

  const handleSlug = (e) => {
    setSlugButton(true)
    setSlug(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("title", title)
    formData.append("body", bodyValue)
    formData.append("image", image)
    formData.append("description", description)
    formData.append("slug", slug)
    formData.append("name", name)
    formData.append("id", _id)
    dispatch(createPost(formData))
  }

  return (
    <div className="mt-48">
      <Helmet>
        <title>Create new post</title>
        <meta name='description' content='ユーザーの新規投稿画面' />
      </Helmet>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: { fontSize: 14 }
        }}
      />
      <div className="container mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="p-6 w-full lg:w-6/12">
              <div className="card">
                <h3 className="card__title">新規投稿</h3>
                <div className="group">
                  <label htmlFor="title">タイトル</label>
                  <input
                    className="group__control" type="text" id="title"
                    name="title" placeholder="投稿タイトル"
                    value={title} onChange={handleChangeInput}
                  />
                </div>
                <div className="group">
                  <label className="image__label" htmlFor="image">
                    {currentImage}
                  </label>
                  <input
                    className="image" type="file" id="image"
                    name="image" placeholder="画像ファイルを選択して下さい。"
                    onChange={handleFileInput}
                  />
                </div>
                <div className="group">
                  <label htmlFor="body">投稿内容</label>
                  <ReactQuill
                    theme="snow" id="body"
                    placeholder="投稿内容を入力して下さい。"
                    value={bodyValue} onChange={setBodyValue}
                  />
                </div>
                <div className="group">
                  <label htmlFor="description">投稿の詳細説明</label>
                  <textarea
                    className="group__control" id="description" cols="30" rows="10"
                    name="description" placeholder="詳細説明を入力して下さい。(550文字以内)" maxLength="550"
                    onChange={handleChangeInput} defaultValue={description}
                  />
                  <p className="description__length">
                    {description ? `現在の文字数: ${description.length}` : `現在の文字数: ${0}`}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 w-full lg:w-6/12">
              <div className="card">
                <div className="group">
                  <label htmlFor="slug">投稿のURL</label>
                  <input
                    className="group__control" type="text" id="slug"
                    name="slug" placeholder="投稿のURL"
                    value={slug} onChange={handleSlug}
                  />
                </div>
                <div className="group">
                  {slugButton ? (
                    <button className="primary__btn" onClick={handleUPL}>
                      アップロード スラッグ
                    </button>
                  ) : (
                    ""
                  )}
                </div>
                <div className="group">
                  <div className="image__preview">
                    {imagePreview ? <img src={imagePreview} alt="イメージ画像" /> : ""}
                  </div>
                </div>
                <div className="group">
                  <button className="primary__btn" type="submit">
                    投稿する
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Create
