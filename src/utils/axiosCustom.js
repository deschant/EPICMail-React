/* eslint-disable no-undef */
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.LOCAL_API_URL,
  headers: {
    "content-type": "application/json",
    token: sessionStorage.getItem("token")
  }
});

export default instance;
