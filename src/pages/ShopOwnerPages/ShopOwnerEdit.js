import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getShopOwnerById, updateShopOwner } from '../../service/ShopOwner/shopOwnerApi';

const ShopOwnerEdit = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address:''
    });
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true); // Disable nút submit ban đầu
    const { id } = useParams(); // Lấy id từ URL
    const navigate = useNavigate();

    useEffect(() => {
        console.log('useEffect triggered for ID:', id);
        const fetchShopOwnerDetails = async () => {
            try {
                const shopOwnerData = await getShopOwnerById(id);
               
                if (shopOwnerData) {
                    setFormData({
                        name: shopOwnerData.data.name || '',
                        email: shopOwnerData.data.email || '',
                        phone: shopOwnerData.data.phone || '',
                        address: shopOwnerData.data.address || '',
                    });
                }
            } catch (error) {
                console.error('Error in fetchShopOwnerDetails:', error);
            }
        };
        fetchShopOwnerDetails();
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
            const response = await updateShopOwner(id, formData); // Gọi API update
            if (response?.status) {
                alert('Cập nhật thành công!');
                navigate('/shopownerlist'); // Điều hướng về danh sách người dùng
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
                    <h1 className="m-0">Chỉnh Sửa Thông Tin Cửa Hàng</h1>
                </div>
            </div>

            <div className="card card-primary mx-4">
                <div className="card-header">
                    <h3 className="card-title">Điền thông tin cần sửa</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="name">Tên cửa hàng mới</label>
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
                        <div className="form-group">
                            <label htmlFor="address">Địa chỉ mới</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="card-footer">
                        <button
                            type="button"
                            className="btn btn-secondary mr-2"
                            onClick={() => navigate('/shopownerlist')}
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

export default ShopOwnerEdit;
