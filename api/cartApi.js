import axiosInstance from './axiosInstance';

// Add product to cart
export const addToCart = async (cartData) => {
    try {
        console.log(cartData);
        const response = await axiosInstance.post('/cart/add', cartData);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error adding product from cart:', error);
        throw error;
    }
};

// Add product to cart
export const updateCart = async (cartData) => {
    try {
        console.log(cartData);
        const response = await axiosInstance.put('/cart/update', cartData);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error adding product from cart:', error);
        throw error;
    }
};


// Remove product from cart
export const removeFromCart = async (productId) => {
    try {
        const response = await axiosInstance.post(`/cart/remove/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error removing product from cart:', error);
        throw error;
    }
};

// View all items in the cart
export const viewCart = async () => {
    try {
        const response = await axiosInstance.get('/cart/view');
        return response.data;
    } catch (error) {
        console.error('Error viewing cart:', error);
        throw error;
    }
};

// Clear the entire cart
export const clearCart = async () => {
    try {
        const response = await axiosInstance.post('/cart/clear');
        return response.data;
    } catch (error) {
        console.error('Error clearing cart:', error);
        throw error;
    }
};



