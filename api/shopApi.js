import axiosInstance from './axiosInstance';

// Add Product
export const addProduct = async (productData) => {
    try {
      const response = await axiosInstance.post('/products/add', productData);
      return response.data;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };

  const saveImagesToDatabase = async (productId, imageUrls) => {
    try {
      const imageRecords = await axiosInstance.post(`/product/images/upload/${productId}`, { imageUrls });
      return imageRecords;
    } catch (error) {
      console.error('Error saving image records to DB:', error);
      throw error;
    }
  };



export const getListCommentByShopId = async (id) => {
    const response = await axiosInstance.get("/comments/list/shop/"+id);
    return response.data;
  };


export const getListProductByShopId = async (shopId) => {
    const response = await axiosInstance.get(`/shop/${shopId}/products`);
    return response.data;
  }

  export const getListCategoryByShopId = async (shopId) => {
    const response = await axiosInstance.get(`/shop/${shopId}/categories`);
    return response.data;
  }

// Xóa hình ảnh sản phẩm
export const deleteProduct = async (productId) => {
    try {
        const response = await axiosInstance.delete(`products/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting image:', error);
        throw error;
    }
};

// Lấy ra danh sách hình ảnh của sản phẩm
export const getListImageByProductID = async (productID) => {
    try {
        const response = await axiosInstance.get(`/product/images/show-list/${productID}`);
        return response.data;
      } catch (error) {
        console.error('Error during API call:', error);
        throw error;
      }
};

export const updateDataProduct = async (productId, dataUpdate) => {
    try {
        const response = await axiosInstance.put(`/products/${productId}`, dataUpdate);
        return response.data;
      } catch (error) {
        console.error('Error during API call:', error);
        throw error;
      }
};

export const getProductById = async (productId) => {
    try {
        const response = await axiosInstance.get(`/products/${productId}`);
        return response.data;
      } catch (error) {
        console.error('Error during API call:', error);
        throw error;
      }
}