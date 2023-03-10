import { bindActionCreators } from '@reduxjs/toolkit'

export const USER_SELECTED = 'USER_SELECTED'
export const USERS_LOADED = 'USERS_LOADED'
export const CURRENT_USER = 'CURRENT_USER'
export const GET_CONTACT = `GET_CONTACT`
export const SELECTED_EXPERIENCE = 'SELECTED_EXPERIENCE'
export const GET_CONTACT_EXPERIENCES = 'GET_CONTACT_EXPERIENCES'
export const USER_NOW = 'USER_NOW'
export const GET_CURRENT_POST = 'GET_CURRENT_POST'
export const GET_POSTS_LIST = 'GET_POSTS_LIST'
export const POSTS_LOADED = 'POSTS_LOADED'
export const SET_EXPERIENCES_LOADED = 'SET_EXPERIENCES_LOADED'
export const PROFILE_POSTS_LIST = 'PROFILE_POSTS_LIST'
export const GET_COMMENTS = 'GET_COMMENTS'
export const COMMENT_SUBMITTED = 'COMMENT_SUBMITTED'

export const profilePostsListAction = (postedPost) => {
  return {
    type: PROFILE_POSTS_LIST,
    payload: postedPost,
  }
}

export const userNowAction = (user) => {
  return {
    type: USER_NOW,
    payload: user,
  }
}

export const userSelectedAction = (users) => {
  return {
    type: USER_SELECTED,
    payload: users,
  }
}

export const usersLoaded = () => {
  return {
    type: 'USERS_LOADED',
    payload: true,
  }
}

export const currentUser = (user) => {
  return {
    type: 'CURRENT_USER',
    payload: user,
  }
}

// action used to set the value of the 'contact' property in the userReducer.js
// - through it we dynamically render the information of the contact, after click,
export const getContactAction = (contact) => {
  return {
    type: GET_CONTACT,
    payload: contact,
  }
}

export const getContactExperiencesAction = (contactExperiences) => {
  return {
    type: GET_CONTACT_EXPERIENCES,
    payload: contactExperiences,
  }
}

export const selectedExperienceAction = (experience) => {
  return {
    type: 'SELECTED_EXPERIENCE',
    payload: experience,
  }
}

export const getCurrentPostAction = (post) => {
  return {
    type: GET_CURRENT_POST,
    payload: post,
  }
}

export const getComments = (comments) => {
  return {
    type: GET_COMMENTS,
    payload: comments,
  }
}
export const getPostsListAction = (postsList) => {
  return {
    type: GET_POSTS_LIST,
    payload: postsList,
  }
}

export const setExperiencesLoaded = () => {
  return {
    type: SET_EXPERIENCES_LOADED,
    payload: true,
  }
}

export const fetchUsers = () => {
  return async (dispatch, getState) => {
    const fetchURL = `${process.env.REACT_APP_BACKEND_URL}users`

    try {
      let response = await fetch(fetchURL)

      if (response.ok) {
        let { users } = await response.json()

        dispatch(userSelectedAction(users.reverse()))

        setTimeout(() => {
          dispatch(usersLoaded())
        }, 3000)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchComments = (postID) => {
  return async (dispatch, getState) => {
    const options = {
      method: 'GET',
    }

    const fetchURL = `${process.env.REACT_APP_BACKEND_URL}posts/${postID}/comment`

    try {
      let response = await fetch(fetchURL, options)

      if (response.ok) {
        let comments = await response.json()
        dispatch(getComments(comments))
      }
    } catch (error) {}
  }
}

export const fetchProfile = () => {
  return async (dispatch, getState) => {
    const options = {
      method: 'GET',
    }
    const fetchURL = `${process.env.REACT_APP_BACKEND_URL}users/me/63ce71322d24291c669fab27`

    try {
      let response = await fetch(fetchURL, options)
      if (response.ok) {
        let usersData = await response.json()
        dispatch(currentUser(usersData))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchExperiences = (userID) => {
  return async (dispatch, getState) => {
    console.log('We are fetching the users experiences here')
    console.log(userID)
    const fetchURL = `${process.env.REACT_APP_BACKEND_URL}users/${userID}/experiences`

    try {
      let response = await fetch(fetchURL)
      if (response.ok) {
        let usersExperience = await response.json()
        dispatch(selectedExperienceAction(usersExperience))
        dispatch(setExperiencesLoaded())
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const editUser = (user) => {
  return async (dispatch, getState) => {
    const options = {
      method: 'PUT',
      body: JSON.stringify({ user }),
      headers: {
        'Content-type': 'application/json',
      },
    }

    const fetchURL = `${process.env.REACT_APP_BACKEND_URL}users/63ce71322d24291c669fab27`
    console.log('user._id from editing my profile', user._id)

    try {
      let response = await fetch(fetchURL, options)

      if (response.ok) {
        let usersData = await response.json()

        dispatch(fetchProfile())
      }
    } catch (error) {
      console.log(error)
    }
  }
}

// export const editExpereince = (experience)=> {
//   return async (ds)
// }

export const getContactExperiences = (contactId) => {
  return async (dispatch, getState) => {
    console.log("getting all the contact's experiences")
    const options = {
      method: 'GET',
    }
    const fetchURL = `${process.env.REACT_APP_BACKEND_URL}users/${contactId}/experiences`

    try {
      const response = await fetch(fetchURL, options)
      if (response.ok) {
        let experiences = await response.json()
        console.log("the contact's experiences are:", experiences)
        dispatch(getContactExperiencesAction(experiences))
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const setPostsLoaded = () => {
  return {
    type: POSTS_LOADED,
    payload: true,
  }
}

// thunk action fro fetching all the posts
export const fetchPostsList = () => {
  return async (dispatch, getState) => {
    const options = {
      method: 'GET',
    }
    const fetchURL = `${process.env.REACT_APP_BACKEND_URL}posts`

    try {
      let response = await fetch(fetchURL, options)

      if (response.ok) {
        let postsList = await response.json()

        dispatch(getPostsListAction(postsList.reverse()))
        setTimeout(() => {
          dispatch(setPostsLoaded())
        }, 3000)
      }
    } catch (error) {
      console.log(error)
    }
  }
}
