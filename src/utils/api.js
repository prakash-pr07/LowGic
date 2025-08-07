import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api", // Change this to your backend URL if deployed
  withCredentials: true,
});

export default API;
