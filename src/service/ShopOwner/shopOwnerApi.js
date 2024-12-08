// src/services/shopOwnerApi.js
import api from '../api';  // Giả sử api.js chứa cấu hình axios

// Lấy tất cả người dùng
export const getAllShopOwnersNormal = async () => {
    try {
        const response = await api.get('/shopOwner/normal/');
        return response.data;
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        throw new Error('Lỗi khi lấy thông tin người dùng');
    }
};

// Lấy thông tin người dùng theo ID
export const getShopOwnerById = async (id) => {
    try {
        const response = await api.get(`/shopOwner/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        return null;
    }
};
// Lấy thông tin người dùng theo ID
export const getOrderByShopOwnerId = async (shopId) => {
    try {
        const response = await api.get(`/orders/orders-by-shop/${shopId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        return null;
    }
};

// Lấy thông tin người dùng theo ID
export const getProductByShopOwnerId = async (shopId) => {
    try {
        const response = await api.get(`/products/shopOwner/${shopId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        return null;
    }
};
// Cập nhật thông tin nhà hàng
export const updateShopOwner = async (id, data) => {
    try {
        const response = await api.put(`/shopOwner/update/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi cập nhật shopOwner:', error);
        throw new Error('Không thể cập nhật shopOwner');
    }
};

// Xóa shopOwner theo ID
export const deleteShopOwner = async (id) => {
    try {
        const response = await api.delete(`/shopOwner/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi xóa shopOwner:', error);
        throw new Error('Không thể xóa ShopOwner');
    }
};

// Doanh thu shipper
export const revenueShopowner = async (shopId, date, filter) => {
    try {
        // Đảm bảo bạn truyền đúng query parameters 'date' và 'filter' vào
        const response = await api.get(`/shopOwner/${shopId}/revenue`, {
            params: { date, filter }  // Truyền 'date' và 'filter' vào query
        });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy doanh thu Cửa hàng:', error);
        throw new Error('Không thể lấy doanh thu Cửa Hàng');
    }
};

// Xác thực nhà hàng
export const updateVerified = async (id, data) => {
    try {
        const response = await api.put(`/shopOwner/verified/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi xác thực shopOwner:', error);
        throw new Error('Không thể Xác thực ShopOwner');
    }
};

// Khóa tài khoản nhà hàng
export const removeSoftDeleted = async (id, data) => {
    try {
        const response = await api.delete(`/shopOwner/softdelete/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi khóa tài khoản shopOwner:', error);
        throw new Error('Không thể Khóa tài khoản ShopOwner');
    }
};

// Xác thực nhà hàng
export const restoreAndSetAvailable = async (id, data) => {
    try {
        const response = await api.put(`/shopOwner/restore/available/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi mở hoạt động lại cho shopOwner:', error);
        throw new Error('Lỗi khi mở hoạt động lại cho shopOwner:');
    }
};