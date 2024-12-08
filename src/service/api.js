// src/services/api.js
import axios from 'axios';
// Sử dụng api instance đã tạo với cấu hình proxy từ package.json
const api = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;