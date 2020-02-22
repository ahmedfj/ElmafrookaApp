import apiUrl from "../apiConfig";
import axios from "axios";



export const postsIndex = user => {
  return axios({
    method: "GET",
    url: apiUrl + "/posts",
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  });
};

export const publishedPostIndex = () => {
  return axios({
    method: "GET",
    url: apiUrl + "/published/posts"
  });
};

export const createPost = (user, newPost) => {
  return axios({
    method: "POST",
    url: apiUrl + "/create/post",
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      post: newPost
    }
  });
};

export const createImgOrVid = (
  user,
  newCrImgUrl,
  newWriterImgeUrl,
  newImgUrl,
  newVidUrl,
  postId
) => {
  return axios({
    method: "POST",
    url: apiUrl + `/post/${postId}`,
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      url: newImgUrl,
      newVidUrl: newVidUrl,
      crImgeUrl: newCrImgUrl,
      writerImgeUrl:newWriterImgeUrl
    }
  });
};

export const showPost = (user, postId) => {
  return axios({
    method: "GET",
    url: apiUrl + `/post/${postId}`,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  });
};
export const showPublicPost = (postId, name) => {
  return axios({
    method: "GET",
    url: apiUrl + `/posts/${postId}/${name}`
  });
};
export const updatePost = (user, updatedPost, postId) => {
  return axios({
    method: "PATCH",
    url: apiUrl + `/post/edit/${postId}`,
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    data: {
      post: updatedPost
    }
  });
};
export const updateToPublishPost = (user, postId) => {
  return axios({
    method: "PUT",
    url: apiUrl + `/publishpost/${postId}`,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  });
};
export const publishPostToCarusel = (user, postId) => {
  return axios({
    method: "PUT",
    url: apiUrl + `/carouselBox/${postId}`,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  });
};
export const updatePublishPostToMainPage = (user, postId) => {
  return axios({
    method: "PUT",
    url: apiUrl + `/publishposttomainpage/${postId}`,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  });
};
export const destroyPost = (user, postId) => {
  return axios({
    method: "DELETE",
    url: apiUrl + `/post/delete/${postId}`,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  });
};

export const destroyPostImge = (user, postId) => {
  return axios({
    method: "POST",
    url: apiUrl + `/post/img/delete/${postId}`,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  });
};
export const destroyPostCrImge = (user, postId) => {
  return axios({
    method: "POST",
    url: apiUrl + `/post/crimg/delete/${postId}`,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  });
};
export const destroyPostWriterImge = (user, postId) => {
  return axios({
    method: "POST",
    url: apiUrl + `/post/writerimg/delete/${postId}`,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  });
};
export const destroyPostVideo = (user, postId) => {
  return axios({
    method: "POST",
    url: apiUrl + `/post/video/delete/${postId}`,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  });
};

export const destroyPostMainPage = (user, postId) => {
  return axios({
    method: "POST",
    url: apiUrl + `/post/delete/mainpage/${postId}`,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  });
};

export const destroyPostOnCarousel = (user, postId) => {
  return axios({
    method: "POST",
    url: apiUrl + `/post/delete/carouselBox/${postId}`,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  });
};
