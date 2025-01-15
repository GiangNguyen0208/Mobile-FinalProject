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
    r
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

export const getOrderListPedding = async () => {
  try {
    const response = await axiosInstance.get(`/orders/shipping`);
    return response.data;
  } catch (error) {
    console.error('Error during API call:', error);
    throw error;
  }
}

export const getOrderListDone = async () => {
  try {
    const response = await axiosInstance.get(`/orders/history`);
    return response.data;
  } catch (error) {
    console.error('Error during API call:', error);
    throw error;
  }
}

export const updateOrderStatus = async (orderId) => {
  try {
    const response = await axiosInstance.put(`/orders/update/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error during API call:', error);
  }
}

// delete category
export const deleteCategory = async (categoryId) => {
  try {
    const response = await axiosInstance.delete(`/categories/${categoryId}`);
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error del category:', error);
    throw error;
  }
};

export const viewDetail = async (orderId) => {
  try {
    const response = await axiosInstance.get(`/orders/detail/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error during API call:', error);
    throw error;
  }
};
// crud notification
export const deleteNotification = async (notificationId) => {
  try {
    const response = await axiosInstance.delete(`/notifications/delete/${notificationId}`);
    return response;
  } catch (error) {
    console.error('Error del notification:', error);
    throw error;
  }
};

export const addNotification = async (NotificationData) => {
  try {
    const response = await axiosInstance.post('/notifications/add', NotificationData);
    return response.data;
  } catch (error) {
    console.error('Error adding notifications:', error);
    throw error;
  }
};

export const editNotification = async (id, notificationData) => {
  try {
    const response = await axiosInstance.put(`/notifications/update/${id}`, notificationData);
    return response.data;
  } catch (error) {
    console.error('Error updating notification:', error);
  }
};


// crud Voucher
export const deleteVoucher = async (VoucherId) => {
  try {
    const response = await axiosInstance.delete(`/vouchers/delete/${VoucherId}`);
    return response;
  } catch (error) {
    console.error('Error del Voucher:', error);
    throw error;
  }
};

export const addVoucher = async (VoucherData) => {
  try {
    const response = await axiosInstance.post('/vouchers/add', VoucherData);

    return response.data;
  } catch (error) {
    console.error('Error adding Voucher:', error);
    throw error;
  }
};

export const editVoucher = async (id, VoucherData) => {
  try {
    const response = await axiosInstance.put(`/vouchers/update/${id}`, VoucherData);
    return response.data;
  } catch (error) {
    console.error('Error updating Voucher:', error);
  }
};


export const shopProfile = async (shopId, shopData) => {
  try {
    const response = await axiosInstance.put(`/admin/shop/update/${shopId}`, shopData);
    console.log(response)
    return response;
  } catch (error) {
    console.error('Error updating :', error);
  }
};
