// src/services/shipperApi.js
import api from '../api';  // Giả sử api.js chứa cấu hình axios

// Lấy tất cả người dùng
export const getAllShippers = async () => {
    try {
        const response = await api.get('/shipper/');
        return response.data;
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        throw new Error('Lỗi khi lấy thông tin người dùng');
    }
};

// Lấy thông tin người dùng theo ID
export const getShipperById = async (id) => {
    try {
        const response = await api.get(`/shipper/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        return null;
    }
};

// Lấy thông tin người dùng theo ID
export const getOrderByShipperId = async (shipperId) => {
    try {
        const response = await api.get(`/orders/orders-by-shipper/${shipperId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        return null;
    }
};

// Cập nhật thông tin nhà hàng
export const updateShipper = async (id, data) => {
    try {
        const response = await api.put(`/shipper/update/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi cập nhật shipper:', error);
        throw new Error('Không thể cập nhật shipper');
    }
};

// Xóa shipper theo ID
export const deleteShipper = async (id) => {
    try {
        const response = await api.delete(`/shipper/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi xóa shipper:', error);
        throw new Error('Không thể xóa shipper');
    }
};

// Doanh thu shipper
export const revenueShipper = async (shipperId, date, filter) => {
    try {
        // Đảm bảo bạn truyền đúng query parameters 'date' và 'filter' vào
        const response = await api.get(`/shipper/${shipperId}/revenue`, {
            params: { date, filter }  // Truyền 'date' và 'filter' vào query
        });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy doanh thu shipper:', error);
        throw new Error('Không thể lấy doanh thu shipper');
    }
};

// Xác thực nhà hàng
export const updateVerified = async (id, data) => {
    try {
        const response = await api.put(`/shipper/verified/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi xác thực shipper:', error);
        throw new Error('Không thể Xác thực shipper');
    }
};

// Khóa tài khoản tài xế
export const removeSoftDeleted = async (id, data) => {
    try {
        const response = await api.delete(`/shipper/softdelete/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi khóa tài khoản shipper:', error);
        throw new Error('Không thể Khóa tài khoản shipper');
    }
};

// Xác thực tài xế
export const restoreAndSetAvailable = async (id, data) => {
    try {
        const response = await api.put(`/shipper/restore/available/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi mở hoạt động lại cho shipper:', error);
        throw new Error('Lỗi khi mở hoạt động lại cho shipper:');
    }
};