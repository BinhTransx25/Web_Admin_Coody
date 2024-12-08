import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../service/User/userApi';
import { useNavigate } from 'react-router-dom';

const UserDetail = () => {
    const { id } = useParams(); // Lấy userId từ URL
    const [user, setUser] = useState(null); // Dữ liệu người dùng
    const [error, setError] = useState(null); // Trạng thái lỗi

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUserById(id);
                setUser(data.data); // Lưu thông tin người dùng
                setError(null); // Xóa lỗi (nếu có từ trước)
            } catch (err) {
                console.error("Lỗi khi lấy thông tin chi tiết người dùng:", err);
                setError("Không thể tải thông tin người dùng."); // Lưu trạng thái lỗi
            }
        };

        fetchUser();
    }, [id]);
    const navigate = useNavigate();
    return (
        <div className="content-wrapper">
            {/* Header */}
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Chi tiết người dùng </h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">UserDetail</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            {error ? (
                <div className="alert alert-danger">{error}</div>
            ) : user ? (
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title mb-4">Thông tin người dùng</h4>
                        <p className="card-text">
                        <strong>Tên:</strong> {user.name}</p>
                        <p className="card-text"><strong>Email:</strong> {user.email}</p>
                        <p className="card-text"><strong>Phone:</strong> {user.phone}</p>
                        <button
                            className="btn btn-secondary mt-3"
                            onClick={() => navigate('/userlist')}
                        >
                            Quay lại
                        </button>
                    </div>
                </div>
            ) : (
                <p>Đang tải thông tin người dùng...</p>
            )}
        </div>


    );
};

export default UserDetail;
