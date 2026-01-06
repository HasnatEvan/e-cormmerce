import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://server.fastforwardlogistics.org",
  withCredentials: true,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
