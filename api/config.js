import { URL } from "./../constants";

const Config = {
  BASE_URL: "http://" + URL.NET_ADDRESS + ":8080/api/v1", // Tạo BASE_URL từ NET_ADDRESS
  TIMEOUT: 10000, // Thời gian chờ 10 giây
};

export default Config;
