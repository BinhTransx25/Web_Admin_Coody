// src/services/productApi.js
import api from '../api';  // Giả sử api.js chứa cấu hình axios

// Lấy tất cả sản phẩm
export const getAllProducts = async () => {
    try {
        const response = await api.get('/products/all');
        return response.data;
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        throw new Error('Lỗi khi lấy danh sách sản phẩm');
    }
};

// Lấy thông tin sản phẩm theo ID
export const getProductById = async (productId) => {
    try {
        const response = await api.get(`/products/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product details:', error);
        return null;
    }
};
