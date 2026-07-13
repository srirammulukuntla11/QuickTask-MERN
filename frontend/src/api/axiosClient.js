import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://quicktask-mern.onrender.com/api/v1",
});

export default axiosClient;