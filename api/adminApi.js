import axiosInstance from "./axiosInstance";

// Lấy tất cả người dùng
export const getAllUser = async () => {
    const response = await axiosInstance.get("admin/user/list");
    return response.data;
}
export const getShopById = async (id) => {
    const response = await axiosInstance.get("admin/shop/id",id ,{
        
    });
    return response.data;
}

export const getListProductByShopName = async (name) => {
    const response = await axiosInstance.get("/products/listProduct/shop/"+name);
    return response.data;
  }

  export const getListCategoryByShopId = async (id) => {
    const response = await axiosInstance.get("/shop/"+id+"/categories");
    return response.data;
  }

  export const getListCommentByShopId = async (id) => {
    const response = await axiosInstance.get("/comments/list/shop/"+id);
    return response.data;
  }
};

// Thêm người dùng mới
export const addUser = async (userCreationReq) => {
    const response = await axiosInstance.post("admin/user/add", userCreationReq);
    return response.data;
};

// Cập nhật thông tin người dùng
export const updateUser = async (userId, userUpdateRequest) => {
    const response = await axiosInstance.put(`admin/user/update/${userId}`, userUpdateRequest);
    return response.data;
};

// Xóa người dùng
export const deleteUser = async (userId) => {
    const response = await axiosInstance.delete(`admin/user/delete/${userId}`);
    return response.data;
};
// Lấy danh sách cửa hàng
export const getAllShops = async () => {
  const response = await axiosInstance.get("admin/shop/list");
  return response.data;
};

// Lấy cửa hàng theo ID
export const getShopById = async (shopId) => {
  const response = await axiosInstance.get(`admin/shop/id/${shopId}`);
  return response.data;
};

// Lấy cửa hàng theo tên
export const getShopByName = async (shopName) => {
  const response = await axiosInstance.get(`admin/shop/name/${shopName}`);
  return response.data;
};

// Cập nhật thông tin cửa hàng
export const updateShop = async (shopId, shopUpdateData) => {
  const response = await axiosInstance.put(`admin/shop/update/${shopId}`, shopUpdateData);
  return response.data;
};

// Xóa cửa hàng
export const deleteShop = async (shopId) => {
  const response = await axiosInstance.delete(`admin/shop/delete/${shopId}`);
  return response.data;
};
