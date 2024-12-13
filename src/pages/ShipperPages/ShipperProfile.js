import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    getShipperById, getOrderByShipperId,
    revenueShipper, updateVerified,
    removeSoftDeleted, restoreAndSetAvailable
} from '../../service/Shipper/shipperApi';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const UserProfile = () => {
    const { id: shipperId } = useParams(); // Lấy userId từ URL
    const [shipper, setShipper] = useState(null); // Dữ liệu cửa hàng
    const [order, setOrder] = useState([]); // Danh sách orders
    const [orderRevenue, setOrderRevenue] = useState([]); // Danh sách orders
    const [date, setDate] = useState(moment().startOf('day').toISOString()); // Ngày hiện tại
    const [filter, setFilter] = useState('day'); // Mặc định là 'day'
    const [revenueData, setRevenueData] = useState(null); // Dữ liệu doanh thu
    const [error, setError] = useState(null); // Trạng thái lỗi
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const PerPage = 10; // Số người dùng mỗi trang
    const [showModal, setShowModal] = useState(false);
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [showModalConfirm2, setShowModalConfirm2] = useState(false);

    useEffect(() => {
        const fetchShipper = async () => {
            try {
                const data = await getShipperById(shipperId);
                setShipper(data.data); // Lưu thông tin shipper
                setError(null); // Xóa lỗi (nếu có từ trước)
            } catch (err) {
                console.error("Lỗi khi lấy thông tin chi tiết shipper:", err);
                setError("Không thể tải thông tin shipper."); // Lưu trạng thái lỗi
            }
        };

        fetchShipper();
    }, [shipperId]);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getOrderByShipperId(shipperId);
                if (response && Array.isArray(response.data)) {
                    setOrder(response.data); // Đảm bảo `orders` là mảng
                } else {
                    setOrder([]); // Nếu không phải mảng, gán mảng rỗng
                }
            } catch (error) {
                console.error("Lỗi khi lấy đơn hàng:", error);
                setOrder([]); // Gán mảng rỗng nếu lỗi
            }
        };

        fetchOrders();
    }, [shipperId]);
    useEffect(() => {
        const fetchRevenue = async () => {
            try {
                const response = await revenueShipper(shipperId, date, filter);

                if (response.data && Array.isArray(response.data.orders)) {
                    // Lưu dữ liệu vào state khi dữ liệu hợp lệ
                    setRevenueData(response.data);

                    // Lấy danh sách orders từ dữ liệu trả về
                    if (response.data.orders && response.data.orders.length > 0) {
                        setOrderRevenue(response.data.orders);
                        setError(null); // Xóa lỗi nếu có dữ liệu
                    }
                } else {
                    setRevenueData(null); // Xóa dữ liệu cũ nếu trả về không hợp lệ
                    setError('Dữ liệu trả về không hợp lệ.');
                }
            } catch (err) {
                setRevenueData(null); // Xóa dữ liệu nếu lỗi
                setError(err.message || 'Đã xảy ra lỗi khi lấy dữ liệu'); // Hiển thị lỗi
            }
        };

        fetchRevenue();
    }, [shipperId, date, filter]); // Gọi lại API khi shipperId, date, hoặc filter thay đổi


    const navigate = useNavigate();

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleShowConfirm = () => setShowModalConfirm(true);
    const handleCloseConfirm = () => setShowModalConfirm(false);

    const handleShowConfirm2 = () => setShowModalConfirm2(true);
    const handleCloseConfirm2 = () => setShowModalConfirm2(false);

    const handleFilterChange = (selectedFilter) => {
        setFilter(selectedFilter); // Cập nhật filter
        setDate(moment().startOf('day').toISOString()); // Cập nhật ngày hiện tại (nếu cần reset)
    };

    const handleInvoiceClick = (shipperId, orderId) => {
        navigate(`/shipperinvoice/${shipperId}/${orderId}`); // Chuyển hướng đến trang Sửa với id
    };

    // Hàm xác định className theo status
    const getStatusClass = (status) => {
        switch (status) {
            case "Nhà hàng đã hủy đơn":
            case "Shipper đã hủy đơn":
            case "Người dùng đã hủy đơn":
                return "badge badge-danger"; // Đỏ cho trạng thái hủy
            case "Đơn hàng đã được giao hoàn tất":
                return "badge badge-success"; // Xanh lá cây cho hoàn tất
            case "Chưa giải quyết":
                return "badge badge-warning"; // Vàng cho chưa giải quyết
            default:
                return "badge badge-info"; // Xanh dương cho trạng thái khác
        }
    };
    // Tính toán chỉ số đầu và cuối
    const indexOfLast = currentPage * PerPage;
    const indexOfFirst = indexOfLast - PerPage;
    const current = order.slice(indexOfFirst, indexOfLast); // Lấy danh sách người dùng trên trang hiện tại

    // Tạo danh sách số trang
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(order.length / PerPage); i++) {
        pageNumbers.push(i);
    }
    const handleClick = (number) => {
        setCurrentPage(number);
    };


    // Gọi API updateVerified
    const handleVerify = async () => {
        try {
            await updateVerified(shipperId, { verified: true });
            alert('Xác thực thành công!');
        } catch (error) {
            console.error(error);
            alert('Không thể xác thực, vui lòng thử lại!');
        } finally {
            handleClose(); // Đóng modal sau khi xử lý
        }
    };

    // Gọi API removeSoftDeleted
    const handleRemoveSoftDeleted = async () => {
        try {
            await removeSoftDeleted(shipperId, { isDeleted: true });
            alert('Khóa tài khoản thành công!');
        } catch (error) {
            console.error(error);
            alert('Không thể Khóa tài khoản, vui lòng thử lại!');
        } finally {
            handleCloseConfirm(); // Đóng modal sau khi xử lý
        }
    };

    // Gọi API restoreAndSetAvailable
    const handleRestoreAndSetAvailable = async () => {
        try {
            await restoreAndSetAvailable(shipperId, { isDeleted: false });
            alert('Khôi phục tài khoản thành công!');
        } catch (error) {
            console.error(error);
            alert('Không thể Khôi phục tài khoản, vui lòng thử lại!');
        } finally {
            handleCloseConfirm2(); // Đóng modal sau khi xử lý
        }
    };

    const isVerificationPending =
        shipper && !shipper.verified && shipper.imageVerified && shipper.imageVerified.length > 0;

    const isStatusPending = shipper && !shipper.isDeleted;

    const isStatusPending2 = shipper && shipper.isDeleted;

    return (

        <div className="content-wrapper elevation-5"
            style={{
                marginLeft: "280px",
                marginTop: "100px",
                marginRight: "18px",
                borderRadius: "18px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                backgroundColor: "white"
            }}
        >
            {/* Content Header (Page header) */}
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">

                        <div className="col-sm-6">
                            <h1 className="m-0">Hồ Sơ</h1>
                        </div>

                    </div>
                </div>
            </div>

            {/* Main content */}
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        {/* Profile Section */}

                        {error ? (
                            <div className="alert alert-danger">{error}</div>
                        ) : shipper ? (
                            <div className="col-md-3">
                                {/* Profile Image */}

                                <div className="card elevation-2"
                                    style={{
                                        borderRadius: "18px",

                                    }}>
                                    <div className="card-header center">
                                        <h3 className="card-title"
                                            style={{
                                                borderRadius: "18px",
                                                fontSize: "18px",
                                            }}
                                        >Thông tin</h3>
                                    </div>

                                    <div className="card-body box-profile">

                                        <div className="text-center">
                                            <img
                                                className="profile-user-img img-fluid img-circle"
                                                src={shipper.image}
                                                alt="User profile picture"
                                            />
                                        </div>

                                        <h3 className="profile-username text-center">{shipper.name}</h3>

                                        <p className="text-muted text-center">Tài xế</p>

                                        <ul className="list-group list-group-unbordered mb-3">
                                            <li className="list-group-item">
                                                <b>Số Điện Thoại</b> <a className="float-right"
                                                    style={{
                                                        color: 'gray'
                                                    }}
                                                >{shipper.phone}</a>
                                            </li>
                                            <li className="list-group-item">
                                                <b>Email</b> <a className="float-right"
                                                    style={{
                                                        color: 'gray'
                                                    }}
                                                >{shipper.email}</a>
                                            </li>
                                            <li className="list-group-item">
                                                <b>Địa chỉ</b> <a className="float-right"
                                                    style={{
                                                        color: 'gray'
                                                    }}
                                                >{shipper.address}</a>
                                            </li>
                                            <li className="list-group-item">
                                                <b>Đánh giá</b> <a className="float-right"
                                                    style={{
                                                        color: 'gray'
                                                    }}
                                                >{shipper.rating}</a>
                                            </li>
                                            <li className="list-group-item">
                                                <b>Giới tính</b> <a className="float-right"
                                                    style={{
                                                        color: 'gray'
                                                    }}
                                                >{shipper.gender}</a>
                                            </li>
                                            <li className="list-group-item">
                                                <b>Ngày sinh</b> <a className="float-right"
                                                    style={{
                                                        color: 'gray'
                                                    }}
                                                >{moment(shipper.birthDate).format('DD-MM-YYYY')}</a>
                                            </li>
                                            <li className="list-group-item">
                                                <b>Hãng xe</b> <a className="float-right"
                                                    style={{
                                                        color: 'gray'
                                                    }}
                                                >{shipper.vehicleBrand}</a>
                                            </li>
                                            <li className="list-group-item">
                                                <b>Biển số</b> <a className="float-right"
                                                    style={{
                                                        color: 'gray'
                                                    }}
                                                >{shipper.vehiclePlate}</a>
                                            </li>
                                        </ul>
                                        <button
                                            className=" mt-3"
                                            style={{
                                                borderRadius: '18px',
                                                boxShadow:
                                                    '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                                padding: '10px 20px',
                                                backgroundColor: '#6c757d',
                                                color: 'white',
                                                border: 'none',
                                                cursor: 'pointer',
                                            }}

                                            onClick={() => navigate('/shipperlist')}
                                        >
                                            Quay lại
                                        </button>
                                        {/* Nút mở modal */}
                                        <button
                                            className="mt-3 ml-3"
                                            style={{
                                                borderRadius: '18px',
                                                boxShadow: isVerificationPending
                                                    ? '0px 4px 6px rgba(0, 0, 0, 0.1)'
                                                    : '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                                padding: '10px 20px',
                                                backgroundColor: isVerificationPending ? '#6c757d' : '#e0e0e0',
                                                color: isVerificationPending ? 'white' : '#a0a0a0',
                                                border: 'none',
                                                cursor: isVerificationPending ? 'pointer' : 'not-allowed',
                                            }}
                                            disabled={!isVerificationPending}
                                            onClick={isVerificationPending ? handleShow : undefined}
                                        >
                                            Xác Thực
                                        </button>

                                        <button
                                            className=" mt-3 mr-3"
                                            style={{
                                                borderRadius: '18px',
                                                boxShadow: isStatusPending
                                                    ? '0px 4px 6px rgba(0, 0, 0, 0.1)'
                                                    : '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                                padding: '10px 20px',

                                                backgroundColor: isStatusPending ? '#6c757d' : '#e0e0e0',
                                                color: isStatusPending ? 'white' : '#a0a0a0',
                                                border: 'none',
                                                cursor: isStatusPending ? 'pointer' : 'not-allowed',
                                            }}
                                            disabled={!isStatusPending}
                                            onClick={isStatusPending ? handleShowConfirm : undefined}
                                        >
                                            Khóa
                                        </button>

                                        <button
                                            className=" mt-3"
                                            style={{
                                                borderRadius: '18px',
                                                boxShadow: isStatusPending2
                                                    ? '0px 4px 6px rgba(0, 0, 0, 0.1)'
                                                    : '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                                padding: '10px 20px',

                                                backgroundColor: isStatusPending2 ? '#6c757d' : '#e0e0e0',
                                                color: isStatusPending2 ? 'white' : '#a0a0a0',
                                                border: 'none',
                                                cursor: isStatusPending2 ? 'pointer' : 'not-allowed',
                                            }}
                                            disabled={!isStatusPending2}
                                            onClick={isStatusPending2 ? handleShowConfirm2 : undefined}
                                        >
                                            Khôi phục
                                        </button>

                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>Đang tải thông tin cửa hàng...</p>
                        )}
                        {
                            showModal && (
                                <div
                                    style={{
                                        position: 'fixed',
                                        top: '0',
                                        left: '0',
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        zIndex: '1000',
                                    }}
                                >
                                    <div
                                        style={{
                                            background: 'white',
                                            borderRadius: '16px',
                                            width: '400px',
                                            padding: '20px',
                                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <h2 style={{ marginBottom: '20px' }}>
                                            Xác nhận Xác thực cho cửa hàng
                                        </h2>
                                        <p style={{ marginBottom: '20px' }}>
                                            Bạn có chắc chắn muốn xác thực cửa hàng này không?
                                        </p>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            {/* Nút Hủy */}
                                            <button
                                                style={{
                                                    borderRadius: '16px',
                                                    padding: '10px 20px',
                                                    backgroundColor: '#6c757d',
                                                    color: 'white',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    flex: '1',
                                                    marginRight: '10px',
                                                }}
                                                onClick={handleClose}
                                            >
                                                Hủy
                                            </button>
                                            {/* Nút Xác nhận */}
                                            <button
                                                style={{
                                                    borderRadius: '16px',
                                                    padding: '10px 20px',
                                                    backgroundColor: '#28a745',
                                                    color: 'white',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    flex: '1',
                                                }}
                                                onClick={handleVerify}
                                            >
                                                Xác nhận
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {
                            showModalConfirm && (
                                <div
                                    style={{
                                        position: 'fixed',
                                        top: '0',
                                        left: '0',
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        zIndex: '1000',
                                    }}
                                >
                                    <div
                                        style={{
                                            background: 'white',
                                            borderRadius: '16px',
                                            width: '400px',
                                            padding: '20px',
                                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <h2 style={{ marginBottom: '20px' }}>
                                            Xác nhận khóa tài khoản cửa hàng
                                        </h2>
                                        <p style={{ marginBottom: '20px' }}>
                                            Bạn có chắc chắn muốn khóa tài khoản cửa hàng này không?
                                        </p>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            {/* Nút Hủy */}
                                            <button
                                                style={{
                                                    borderRadius: '16px',
                                                    padding: '10px 20px',
                                                    backgroundColor: '#6c757d',
                                                    color: 'white',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    flex: '1',
                                                    marginRight: '10px',
                                                }}
                                                onClick={handleCloseConfirm}
                                            >
                                                Hủy
                                            </button>
                                            {/* Nút Xác nhận */}
                                            <button
                                                style={{
                                                    borderRadius: '16px',
                                                    padding: '10px 20px',
                                                    backgroundColor: '#28a745',
                                                    color: 'white',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    flex: '1',
                                                }}
                                                onClick={handleRemoveSoftDeleted}
                                            >
                                                Xác nhận
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {
                            showModalConfirm2 && (
                                <div
                                    style={{
                                        position: 'fixed',
                                        top: '0',
                                        left: '0',
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        zIndex: '1000',
                                    }}
                                >
                                    <div
                                        style={{
                                            background: 'white',
                                            borderRadius: '16px',
                                            width: '400px',
                                            padding: '20px',
                                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <h2 style={{ marginBottom: '20px' }}>
                                            Xác nhận khôi phục tài khoản cửa hàng
                                        </h2>
                                        <p style={{ marginBottom: '20px' }}>
                                            Bạn có chắc chắn muốn khôi phục tài khoản cửa hàng này không?
                                        </p>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            {/* Nút Hủy */}
                                            <button
                                                style={{
                                                    borderRadius: '16px',
                                                    padding: '10px 20px',
                                                    backgroundColor: '#6c757d',
                                                    color: 'white',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    flex: '1',
                                                    marginRight: '10px',
                                                }}
                                                onClick={handleCloseConfirm2}
                                            >
                                                Hủy
                                            </button>
                                            {/* Nút Xác nhận */}
                                            <button
                                                style={{
                                                    borderRadius: '16px',
                                                    padding: '10px 20px',
                                                    backgroundColor: '#28a745',
                                                    color: 'white',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    flex: '1',
                                                }}
                                                onClick={handleRestoreAndSetAvailable}
                                            >
                                                Xác nhận
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }


                        {/* Danh sách orders */}
                        <div className="col-md-9">
                            <div className="card elevation-2"
                                style={{
                                    borderRadius: "18px",
                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                    backgroundColor: "white"
                                }}
                            >

                                <div className="card-header p-2">
                                    <ul className="nav nav-pills">

                                        <li className="nav-item">
                                            <a className="nav-link active"
                                                href="#activity"
                                                data-toggle="tab"
                                                style={{
                                                    borderRadius: "18px",
                                                }}
                                            >
                                                Đơn Hàng
                                            </a>
                                        </li>

                                        <li className="nav-item">
                                            <a className="nav-link"
                                                href="#settings"
                                                data-toggle="tab"
                                                style={{
                                                    borderRadius: "18px",
                                                }}
                                            >
                                                Doanh Thu
                                            </a>
                                        </li>

                                    </ul>
                                </div>

                                <div className="card-body">
                                    <div className="tab-content">

                                        <div className="active tab-pane" id="activity">
                                            <div className="post">
                                                {/* Khu vực hiển thị */}
                                                <section className="content">
                                                    {/* Default box */}
                                                    <div className="card" style={{
                                                        borderRadius: "18px",
                                                    }}>

                                                        <div className="card-header">
                                                            <h3 className="card-title">Đơn Hàng</h3>
                                                            <div className="card-tools">

                                                            </div>
                                                        </div>

                                                        <div className="card-body p-0">
                                                            <table className="table  projects">

                                                                <thead>
                                                                    <tr>
                                                                        <th style={{ width: "10%" }}>#</th>
                                                                        <th style={{ width: "10%" }}>ID Order</th>
                                                                        <th style={{ width: "10%" }}>Ngày tạo</th>
                                                                        <th style={{ width: "20%" }} className="text-center">Trạng thái</th>
                                                                        <th style={{ width: "10%" }}></th>
                                                                    </tr>
                                                                </thead>

                                                                <tbody>

                                                                    {current.length > 0 ? (
                                                                        current.map((order, index) => (
                                                                            <tr key={order._id}>
                                                                                <td>{indexOfFirst + index + 1}</td>
                                                                                {/* Id order */}
                                                                                <td>
                                                                                    {order._id}
                                                                                </td>
                                                                                {/* Ngày tạo */}
                                                                                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                                                                {/* trạng thái */}

                                                                                <td className="project-state">
                                                                                    <span className={getStatusClass(order.status)}
                                                                                        style={{
                                                                                            borderRadius: "12px",
                                                                                            padding: 14
                                                                                        }}
                                                                                    >
                                                                                        {order.status}
                                                                                    </span>                                                                                </td>
                                                                                {/* 
                                                                            <td>{order.totalPrice.toLocaleString()} VND</td>
                                                                            */}
                                                                                {/* cái nút  */}
                                                                                <td className="project-actions text-right">

                                                                                    <button
                                                                                        className="btn btn-primary btn-sm mr-2"
                                                                                        onClick={() => handleInvoiceClick(shipper._id, order._id)}
                                                                                        style={{
                                                                                            borderRadius: "12px",
                                                                                            padding: 8
                                                                                        }}
                                                                                    >
                                                                                        Xem
                                                                                    </button>

                                                                                </td>
                                                                            </tr>
                                                                        ))) : (
                                                                        <tr>
                                                                            <td colSpan="3">Lịch sửa order trống</td>
                                                                        </tr>
                                                                    )}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        {/* Pagination */}
                                                        <div className="card-footer"
                                                            style={{
                                                                borderBottomLeftRadius: "12px",
                                                                borderBottomRightRadius: "12px",
                                                            }}
                                                        >
                                                            <nav>
                                                                <ul className="pagination justify-content-center">
                                                                    {pageNumbers.map((number) => (
                                                                        <li
                                                                            key={number}
                                                                            className={`page-item ${currentPage === number ? "active" : ""
                                                                                }`}
                                                                            onClick={() => handleClick(number)}
                                                                        >
                                                                            <a className="page-link" href="#"
                                                                                style={{
                                                                                    borderRadius: "12px",

                                                                                }}
                                                                            >
                                                                                {number}
                                                                            </a>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </nav>
                                                        </div>
                                                        {/* /.card-body */}
                                                    </div>
                                                    {/* /.card */}
                                                </section>
                                            </div>
                                        </div>

                                        {/* /TAB DOANH THU SẢN PHẨM NẰM ĐÂY*/}
                                        <div className="tab-pane" id="settings">
                                            <div className="timeline timeline-inverse">

                                                <section className="content">
                                                    <div className="container-fluid">
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="callout callout-info">
                                                                    <h5>
                                                                        <i className="fas fa-info"></i> Gợi ý:
                                                                    </h5>
                                                                    Bạn có thể nhấn in hóa đơn ở phía dưới.
                                                                </div>

                                                                <div>
                                                                    {/* Các nút chọn filter */}
                                                                    {['day', 'week', 'month'].map((range) => (
                                                                        <button
                                                                            key={range}
                                                                            onClick={() => handleFilterChange(range)}
                                                                            style={{
                                                                                margin: '5px',
                                                                                padding: '10px',
                                                                                backgroundColor: filter === range ? 'blue' : 'gray',
                                                                                color: 'white',
                                                                                border: 'none',
                                                                                borderRadius: '12px',
                                                                                marginBottom: "18px"
                                                                            }}
                                                                        >
                                                                            {range.toUpperCase()}
                                                                        </button>
                                                                    ))}
                                                                </div>

                                                                {/* Main content */}
                                                                <div className="invoice p-3 mb-5 elevation-2"
                                                                    style={{
                                                                        borderRadius: '12px',

                                                                    }}
                                                                >
                                                                    {/* Title row */}
                                                                    <div className="row">
                                                                        <div className="col-12">
                                                                            <h4>
                                                                                <i className="fas fa-globe"></i> Coody Admin, Inc.
                                                                            </h4>
                                                                        </div>
                                                                    </div>

                                                                    {/* Info row */}
                                                                    <div className="row invoice-info">
                                                                        <div className="col-sm-4 invoice-col">

                                                                            <address>
                                                                                <strong>Coody Admin, Inc.</strong>
                                                                                <br />
                                                                                Công viên phần mềm quang trung
                                                                                <br />
                                                                                Phone: (804) 123-5432
                                                                                <br />
                                                                                Email: info@coodyfood.com
                                                                            </address>
                                                                        </div>

                                                                        <div className="col-sm-4 invoice-col">

                                                                            <address>
                                                                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                                                                {revenueData ? (
                                                                                    <div>
                                                                                        <strong>Từ: {moment(revenueData.startDate).format('DD/MM/YYYY')}</strong>
                                                                                        <br />
                                                                                        <strong>Đến: {moment(revenueData.endDate).format('DD/MM/YYYY')}</strong>
                                                                                        <br />
                                                                                        <strong>Tổng số đơn: {revenueData.totalOrders}</strong>

                                                                                    </div>
                                                                                ) : (
                                                                                    !error && <p>Chọn khoảng thời gian để xem doanh thu.</p>
                                                                                )}
                                                                            </address>
                                                                        </div>


                                                                    </div>

                                                                    {/* Table row */}
                                                                    <div className="row">
                                                                        <div className="col-12 table-responsive">
                                                                            <table className="table ">
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th style={{ width: "20%", paddingLeft: 30 }}>#</th>
                                                                                        <th>Hình thức</th>
                                                                                        <th>Khoảng cách</th>
                                                                                        <th>Doanh thu</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {/* Table row */}
                                                                                    {
                                                                                        orderRevenue.length > 0 ? (
                                                                                            orderRevenue.map((order, index) => (
                                                                                                <tr key={index}>
                                                                                                    <td style={{ paddingLeft: 30 }}>{index + 1}</td>
                                                                                                    <td>{order.paymentMethod}</td>
                                                                                                    <td style={{ paddingLeft: 50 }}>{order.distance}</td>
                                                                                                    <td style={{ paddingLeft: 20 }}>${order.shippingfee}</td>
                                                                                                </tr>
                                                                                            ))) : (
                                                                                            <p>No found</p>
                                                                                        )
                                                                                    }
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row">



                                                                        <div className="col-6">
                                                                            <p className="lead">Ngày xuất hóa đơn: {moment().format('DD-MM-YYYY')}</p>

                                                                            {revenueData ? (
                                                                                <div className="table-responsive">
                                                                                    <table className="table">

                                                                                        <tr>
                                                                                            <th style={{ width: "50%" }}>Tổng tạm tính:</th>
                                                                                            <td><strong>{revenueData.totalRevenue} VND</strong>  </td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <th>Phí giao hàng:</th>
                                                                                            <td> 0 VND</td>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <th>Tổng Tiền:</th>
                                                                                            <td >
                                                                                                {revenueData.totalRevenue} VND

                                                                                            </td>
                                                                                        </tr>


                                                                                    </table>
                                                                                </div>
                                                                            ) : (
                                                                                !error && <p>Chọn khoảng thời gian để xem doanh thu.</p>
                                                                            )}
                                                                        </div>
                                                                    </div>

                                                                    {/* This row will not appear when printing */}
                                                                    <div className="row no-print">
                                                                        <div className="col-12">
                                                                            <button
                                                                                className="btn btn-secondary mr-1"
                                                                                onClick={() => navigate(-1)}
                                                                                style={{
                                                                                    color: 'white',
                                                                                    borderRadius: '12px',
                                                                                }}
                                                                            >
                                                                                Quay lại
                                                                            </button>
                                                                            <a
                                                                                href="invoice-print.html"
                                                                                rel="noopener"
                                                                                target="_blank"
                                                                                className="btn btn-default"
                                                                                style={{
                                                                                    borderRadius: '12px',
                                                                                }}
                                                                            >
                                                                                <i className="fas fa-print"></i> Print
                                                                            </a>



                                                                            <button
                                                                                type="button"
                                                                                className="btn btn-primary float-right"
                                                                                style={{ marginRight: "5px",  borderRadius: '12px', }}
                                                                            >
                                                                                <i className="fas fa-download"></i> Generate PDF
                                                                            </button>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </section>


                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>




    );
};

export default UserProfile;
