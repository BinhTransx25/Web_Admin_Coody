import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getShipperById } from '../../service/Shipper/shipperApi';
import { useNavigate } from 'react-router-dom';

const ShopOwnerDetail = () => {
    const { id } = useParams(); // Lấy shipper_id từ URL
    const [shipper, setShipper] = useState(null); // Dữ liệu shipper
    const [error, setError] = useState(null); // Trạng thái lỗi

    useEffect(() => {
        const fetchShipper = async () => {
            try {
                const data = await getShipperById(id);
                setShipper(data.data); // Lưu thông tin shipper
                setError(null); // Xóa lỗi (nếu có từ trước)
            } catch (err) {
                console.error("Lỗi khi lấy thông tin chi tiết shipper:", err);
                setError("Không thể tải thông tin shipper."); // Lưu trạng thái lỗi
            }
        };

        fetchShipper();
    }, [id]);
    const navigate = useNavigate();
    return (
        <div className="content-wrapper">
            {/* Header */}
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Chi tiết shipper</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">ShipperDetail</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            {error ? (
                <div className="alert alert-danger">{error}</div>
            ) : shipper ? (
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title mb-4">Thông tin Shipper</h4>
                        <p className="card-text"><strong>Tên:</strong> {shipper.name}</p>
                        <p className="card-text"><strong>Email:</strong> {shipper.email}</p>
                        <p className="card-text"><strong>Phone:</strong> {shipper.phone}</p>
                        <button
                            className="btn btn-secondary mt-3"
                            onClick={() => navigate('/shipperlist')}
                        >
                            Quay lại
                        </button>
                    </div>
                </div>
            ) : (
                <p>Đang tải thông tin shipper...</p>
            )}
        </div>


    );
};

export default ShopOwnerDetail;
