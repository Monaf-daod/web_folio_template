import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.request.use((config) => {
  // const accessToken =
  //   JSON.parse(localStorage.getItem("token"))?.data?.token || null;
  // config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // toast.dismiss();
    // const errorMessage = `Error : ${
    //   error.response?.data?.message || // for show the error from back end
    //   error.response?.data?.exception?.message ||
    //   error.response?.data?.title ||
    //   error.message // for show error message
    // }`;
    // toast.error(errorMessage, {
    //   hideProgressBar: true,
    //   position: "top-right",
    // });

    return Promise.reject(error);
  }
);

// use (error.request.status) to get request error status and show it

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common.Accept = "application/json";
axios.defaults.headers.common["Accept-Language"] = "en";
axios.defaults.headers.common["MerchantId"] = "safeone";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
export default axios;
