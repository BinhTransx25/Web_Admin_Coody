import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, removeSoftDeleted, restoreAndSetAvailable } from '../../service/User/userApi';


const UserProfile = () => {

    const { id } = useParams(); // Lấy userId từ URL
    const [user, setUser] = useState(null); // Dữ liệu người dùng
    const [orders, setOrders] = useState([]); // Danh sách orders
    const [error, setError] = useState(null); // Trạng thái lỗi
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const PerPage = 10; // Số người dùng mỗi trang
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [showModalConfirm2, setShowModalConfirm2] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    const fetchUser = async () => {
        try {
            const data = await getUserById(id);
            setUser(data.data); // Lưu thông tin người dùng
            setOrders(data.data.orders || []); // Lưu danh sách orders
            setError(null); // Xóa lỗi (nếu có từ trước)
        } catch (err) {
            console.error("Lỗi khi lấy thông tin chi tiết người dùng:", err);
            setError("Không thể tải thông tin người dùng."); // Lưu trạng thái lỗi
        }
    };

    useEffect(() => {
        fetchUser();
    }, [id]);

    const handleShowConfirm = () => setShowModalConfirm(true);
    const handleCloseConfirm = () => setShowModalConfirm(false);

    const handleShowConfirm2 = () => setShowModalConfirm2(true);
    const handleCloseConfirm2 = () => setShowModalConfirm2(false);

    const navigate = useNavigate();

    const handleInvoiceClick = (id, orderId) => {
        navigate(`/userinvoice/${id}/${orderId}`); // Chuyển hướng đến trang Sửa với id
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
    const current = orders.slice(indexOfFirst, indexOfLast); // Lấy danh sách người dùng trên trang hiện tại

    // Tạo danh sách số trang
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(orders.length / PerPage); i++) {
        pageNumbers.push(i);
    }
    const handleClick = (number) => {
        setCurrentPage(number);
    };

    // Gọi API removeSoftDeleted
    const handleRemoveSoftDeleted = async () => {
        try {
            await removeSoftDeleted(id, { isDeleted: true });
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
            await restoreAndSetAvailable(id, { isDeleted: false });
            alert('Khôi phục tài khoản thành công!');
        } catch (error) {
            console.error(error);
            alert('Không thể Khôi phục tài khoản, vui lòng thử lại!');
        } finally {
            handleCloseConfirm2(); // Đóng modal sau khi xử lý
        }
    };

    const isStatusPending = user && !user.isDeleted;

    const isStatusPending2 = user && user.isDeleted;

    useEffect(() => {
        // Kiểm tra token trong localStorage
        const token = localStorage.getItem("authToken");
        setIsAuthenticated(!!token); // Nếu token tồn tại, trạng thái là đã đăng nhập

        // Mô phỏng thời gian tải (500ms)
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, []);
    if (isLoading) {
        return (
            <div className="preloader flex-column justify-content-center align-items-center">
                <img
                    className="animation__wobble"
                    src="../dist/img/AdminLTELogo.png"
                    alt="AdminLTELogo"
                    height="60"
                    width="60"
                />
            </div>
        );
    }

    return (

        <div className="content-wrapper elevation-3"
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
                        ) : user ? (
                            <div className="col-md-3">
                                {/* Profile Image */}

                                <div
                                    className="card elevation-2"
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
                                                src={user.image}
                                                alt="Không tải được hình ảnh"
                                            />
                                        </div>

                                        <h3 className="profile-username text-center">{user.name}</h3>

                                        <p className="text-muted text-center">Khách Hàng</p>

                                        <ul className="list-group list-group-unbordered mb-3">

                                            <li className="list-group-item">
                                                <b>Số Điện Thoại</b> <a className="float-right"
                                                    style={{
                                                        color: 'gray'
                                                    }}>{user.phone}</a>
                                            </li>

                                            <li className="list-group-item">
                                                <b>Email</b> <a className="float-right"
                                                    style={{
                                                        color: 'gray'
                                                    }}>{user.email}</a>
                                            </li>

                                        </ul>

                                        <button
                                            className=""
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
                                            onClick={() => navigate('/userlist')}
                                        >
                                            Quay lại
                                        </button>

                                        <button
                                            className="ml-3"
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
                            <p>Đang tải thông tin người dùng...</p>
                        )}
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
                                            Xác nhận khóa tài khoản User
                                        </h2>
                                        <p style={{ marginBottom: '20px' }}>
                                            Bạn có chắc chắn muốn khóa tài khoản User này không?
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
                                            Xác nhận khôi phục tài khoản User
                                        </h2>
                                        <p style={{ marginBottom: '20px' }}>
                                            Bạn có chắc chắn muốn khôi phục tài khoản User này không?
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
                            <div
                                className="card elevation-2"
                                style={{
                                    borderRadius: "18px",
                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                    backgroundColor: "white"
                                }}
                            >

                                <div className="card-header p-2">
                                    <ul className="nav nav-pills">
                                        <li className="nav-item"
                                        >
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
                                                            <table className="table table-striped projects">

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
                                                                                {/* 3 cái nút  */}
                                                                                <td className="project-actions text-right">

                                                                                    <button
                                                                                        className="btn btn-primary btn-sm mr-2"
                                                                                        onClick={() => handleInvoiceClick(user._id, order._id)}
                                                                                        style={{
                                                                                            borderRadius: "12px",
                                                                                            padding: 8,
                                                                                            backgroundColor: '#AB886D',
                                                                                            borderColor: '#AB886D',
                                                                                            color: '#FFFFFF',
                                                                                        }}
                                                                                    >

                                                                                        Xem
                                                                                    </button>


                                                                                </td>
                                                                            </tr>
                                                                        ))) : (
                                                                        <tr>
                                                                            <td colSpan="3">Không có hóa đơn nào</td>
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
                                                                            <a className="page-link"
                                                                                href="#"
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

                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* /.End Main */}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UserProfile;
