// src/services/orderApi.js
import api from './api';  // Giả sử api.js chứa cấu hình axios

// Lấy tất cả đơn hàng
export const getAllOrders = async () => {
    try {
        const response = await api.get('/orders/');
        return response.data;
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        throw new Error('Lỗi khi lấy danh sách đơn hàng');
    }
};

// Lấy thông tin đơn hàng theo ID
export const getOrderById = async (orderId) => {
    try {
        const response = await api.get(`/orders/${orderId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching order details:', error);
        return null;
    }
};
