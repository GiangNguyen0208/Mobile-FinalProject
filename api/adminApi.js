import axiosInstance from "./axiosInstance";

export const getAllUser = async () => {
    const response = await axiosInstance.get("/users/getAllUser");
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

  export const getListShop = async () => {
    const response = await axiosInstance.get("/admin/shop/list");
    return response.data;
  }

  