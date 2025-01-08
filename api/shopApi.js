import axiosInstance from './axiosInstance';

// Upload image
export const uploadImageProduct = async (productId, imageFile) => {
    const formData = new FormData();
    formData.append("image", {
        uri: imageFile.uri, // URI của file hình ảnh
        type: imageFile.type, // Loại hình ảnh, ví dụ 'image/jpeg'
        name: imageFile.fileName, // Tên file hình ảnh
    });

    try {
        const response = await axiosInstance.post(`/product/images/upload/${productId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data", // Chú ý content type là multipart/form-data khi upload file
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error; // Ném lại lỗi nếu có
    }
};


// Xóa hình ảnh sản phẩm
export const deleteImageProduct = async (imageId) => {
    try {
        const response = await axiosInstance.delete(`/api/v1/product/images/${imageId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting image:', error);
        throw error;
    }
};

// Lấy ra danh sách hình ảnh của sản phẩm
export const getListProduct = async () => {
    
}