const axios = require('axios');

const axiosInstance = axios.create();

export const fetchBooks = (url) => {
  return axiosInstance.get(url)
}

export const fetchBookDetail = (id) => {
  return axiosInstance.get(`https://gutendex.com/books/${id}/`)
}

export const fetchFavorites = () => {
  return axiosInstance.get(`http://localhost:8080/get-favorites`)
}

export const setFavoriteBooks = (data) => {
  let payload ={
    "favorites":data
  }
  return axiosInstance.post(`http://localhost:8080/set-favorites/`, payload)
}
