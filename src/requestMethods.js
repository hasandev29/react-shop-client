import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/";
const BASE_URL = process.env.REACT_APP_API_KEY;

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.token;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    token: TOKEN,
  },
});
