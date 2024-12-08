import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById, updateUser } from '../../service/User/userApi';

const UserEdit = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true); // Disable nút submit ban đầu
    const { id } = useParams(); // Lấy id từ URL
    const navigate = useNavigate();

    useEffect(() => {
        console.log('useEffect triggered for ID:', id);
        const fetchUserDetails = async () => {
            try {
                const userData = await getUserById(id);
                console.log('Fetched user data:', userData);
                if (userData) {
                    setFormData({
                        name: userData.data.name || '',
                        email: userData.data.email || '',
                        phone: userData.data.phone || '',
                    });
                }
            } catch (error) {
                console.error('Error in fetchUserDetails:', error);
            }
        };
        fetchUserDetails();
    }, [id]);



    const handleChange = (e) => {
        const { id, value } = e.target;

        // Kiểm tra sự thay đổi để bật nút Submit
        setIsSubmitDisabled(false);
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateUser(id, formData); // Gọi API update
            if (response?.status) {
                alert('Cập nhật thành công!');
                navigate('/userlist'); // Điều hướng về danh sách người dùng
            } else {
                alert('Cập nhật thất bại. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật:', error);
            alert('Đã xảy ra lỗi!');
        }
    };

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <h1 className="m-0">Chỉnh Sửa Người Dùng</h1>
                </div>
            </div>

            <div className="card card-primary mx-4">
                <div className="card-header">
                    <h3 className="card-title">Điền thông tin cần sửa</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="name">Tên người dùng mới</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}

                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email mới</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}

                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Số điện thoại mới</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone"
                                value={formData.phone}
                                onChange={handleChange}

                            />
                        </div>
                    </div>

                    <div className="card-footer">
                        <button
                            type="button"
                            className="btn btn-secondary mr-2"
                            onClick={() => navigate('/userlist')}
                        >
                            Quay lại
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSubmitDisabled}
                        >
                            Chỉnh sửa
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserEdit;
