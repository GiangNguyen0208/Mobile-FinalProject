import axiosInstance from './axiosInstance';

// Create Order
export const createOrder = async (orderData) => {
    try {
        const response = await axiosInstance.post('/orders/create', orderData);
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

// Get all Orders
export const getAllOrders = async () => {
    try {
        const response = await axiosInstance.get('/orders/user');
        return response.data;
    } catch (error) {
        console.error('Error getting all orders:', error);
        throw error;
    }
};

// Get Order by ID
export const getOrderById = async (orderId) => {
    try {
        const response = await axiosInstance.get(`/orders/${orderId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting order by ID:', error);
        throw error;
    }
};
