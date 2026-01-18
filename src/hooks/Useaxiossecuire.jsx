import axios from "axios";

const axiosecure = axios.create({
  baseURL: "http://localhost:3000",
});

const Useaxiossecuire = () => {
  return axiosecure;
};

export default Useaxiossecuire;
