import axiosInstance from "./axiosInstance";

export const getAllProduct = async () => {
    const response = await axiosInstance.get("/products/listProduct");
    return response.data;
};

export const getAllCategory = async () => {
    const response = await axiosInstance.get("/categories/listCategory");
    return response.data;
};

export const getProductsByCategory = async (categoryId) => {
      const response = await axiosInstance.get(`/products/getByCategory/${categoryId}`);
      return response.data.result;
  };


export const getNotificationsByShop = async (shopId) => {
    const response = await axiosInstance.get(`/notifications/listNotification/${shopId}`);
    return response.data;
};

export const getVouchersByShop = async (shopId) => {
    const response = await axiosInstance.get(`/vouchers/list/shop/${shopId}`);
    return response.data;
};


