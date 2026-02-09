import axios from "axios";
import { useEffect } from "react";
import UseAuth from "./UseAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "https://club-sphere-server-flax.vercel.app",
  // baseURL: 'https://club-sphere-server-flax.vercel.app',
});

const Useaxiossecuire = () => {
  const { user, logout } = UseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // request interceptor
    const reqInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          const token = await user.getIdToken(); // ✅ correct firebase token
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      }
    );

    // response interceptor
    const resInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      async (error) => {
        const status = error.response?.status;

        // ✅ refresh এ blind logout হবে না
        if ((status === 401 || status === 403) && user) {
          await logout();
          navigate("/login");
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, logout, navigate]);

  return axiosSecure;
};

export default Useaxiossecuire;
