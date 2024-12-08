// src/services/userApi.js
import api from '../api';  // Giả sử api.js chứa cấu hình axios

// Lấy tất cả người dùng
export const getAllUsers = async () => {
    try {
        const response = await api.get('/users/');
        return response.data;
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        throw new Error('Lỗi khi lấy thông tin người dùng');
    }
};

// Lấy thông tin người dùng theo ID
export const getUserById = async (id) => {
    try {
        const response = await api.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error in getUserById:', error);
        return null;
    }
};

// Cập nhật thông tin người dùng
export const updateUser = async (id, data) => {
    try {
        const response = await api.put(`/users/update/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi cập nhật người dùng:', error);
        throw new Error('Không thể cập nhật người dùng');
    }
};

// Xóa user theo ID
export const deleteUser = async (id) => {
    try {
        const response = await api.delete(`/users/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi xóa user:', error);
        throw new Error('Không thể xóa user');
    }
};

// Khóa tài khoản User
export const removeSoftDeleted = async (id, data) => {
    try {
        const response = await api.delete(`/users/softdelete/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi khóa tài khoản User:', error);
        throw new Error('Không thể Khóa tài khoản User');
    }
};

// Xác thực User
export const restoreAndSetAvailable = async (id, data) => {
    try {
        const response = await api.put(`/users/restore/available/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi mở hoạt động lại cho User:', error);
        throw new Error('Lỗi khi mở hoạt động lại cho User:');
    }
};