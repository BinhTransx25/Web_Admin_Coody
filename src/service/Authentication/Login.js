import api from '../api';  // Giả sử api.js chứa cấu hình axios

export const loginApi = async (identifier, password) => {
    try {
      const response = await api.post(`/admin/login`, { identifier, password });
      return response.data; // Trả về kết quả từ backend
    } catch (error) {
      console.error("Lỗi API:", error);
      throw new Error(error.response?.data?.message || "Lỗi đăng nhập");
    }
  };