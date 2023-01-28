import { Modal, Button, Row, Container, Form } from 'react-bootstrap'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { nextDay } from 'date-fns/esm'
import { useEffect } from 'react'
import SingleComment from './SingleComment'
import { fetchComments } from '../redux/actions'

function Comments({ post }) {
  const dispatch = useDispatch()

  const [show, setShow] = useState(false)
  const [showEmoji, setShowEmoji] = useState(false)
  const [postText, setPostText] = useState('')
  const currentUserData = useSelector((state) => state.user.currentUser)
  const [comment, setComment] = useState('')
  const comments = useSelector((state) => state.posts.comments)
  const postID = post._id
  const [commentsLoaded, setCommentsLoaded] = useState(false)
  const [commentSubmitted, setCommentSubmitted] = useState(false)

  useEffect(() => {
    dispatch(fetchComments(post._id))

    setTimeout(() => {
      setCommentsLoaded(true)
    }, 1000)
  }, [])

  useEffect(() => {
    dispatch(fetchComments(post._id))
  }, [commentSubmitted])

  const handleChange = (e) => {
    setComment(e.target.value)
  }

  const submitComment = async (event) => {
    event.preventDefault()

    const post = {
      comment: comment,
      userId: currentUserData._id,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-type': 'application/json',
      },
    }
    const fetchURL = `${process.env.REACT_APP_BACKEND_URL}posts/${postID}/comment`

    try {
      let response = await fetch(fetchURL, options)

      if (response.ok) {
        const post = await response.json()
        setComment('')
        setTimeout(() => {
          dispatch(fetchComments(postID))
          setCommentsLoaded(true)
        }, 1000)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="commentsContainer">
      <div className="d-flex">
        <img
          className="commentsAvatar mt-3"
          src={post.user.image}
          alt="Avatar"
        />
        <input
          type="text"
          value={comment}
          className="commentInput"
          placeholder="Add a comment"
          onChange={(e) => {
            handleChange(e)
          }}
        ></input>
      </div>
      {comment && (
        <Button className="ml-5 mt-2 btn-sm" onClick={submitComment}>
          Post
        </Button>
      )}
      {commentsLoaded &&
        comments.comments.map((comment) => (
          <SingleComment
            comment={comment}
            key={comment._id}
            postID={post._id}
          />
        ))}
    </div>
  )
}

export default Comments
