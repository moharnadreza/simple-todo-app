import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://dummyjson.com", // TODO: Use env vars.
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
