import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById } from '../../service/User/userApi';
import moment from 'moment';


const UserInvoice = () => {
    const { id, orderId } = useParams(); // Lấy userId từ URL
    const [order, setOrder] = useState(null); // Danh sách orders
    const [error, setError] = useState(null); // Trạng thái lỗi
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const data = await getUserById(id); // Lấy thông tin user
                const selectedOrder = data.data.orders.find(o => o._id === orderId); // Lọc order theo orderId
                if (!selectedOrder) {
                    setError('Order không tồn tại.');
                } else {
                    setOrder(selectedOrder); // Lưu thông tin order
                    setError(null);
                }
            } catch (err) {
                console.error("Lỗi khi lấy thông tin order:", err);
                setError("Không thể tải thông tin order."); // Lưu trạng thái lỗi
            }
        };

        fetchOrder();
    }, [id, orderId]);

    if (error) return <div className="alert alert-danger">{error}</div>; // Hiển thị lỗi nếu có

    if (!order) return <div>Loading...</div>; // Hiển thị trạng thái chờ

    return (
        <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Hóa Đơn Chi Tiết</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">UserInvoice</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
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

                            {/* Main content */}
                            <div className="invoice p-3 mb-3">
                                {/* Title row */}
                                <div className="row">
                                    <div className="col-12">
                                        <h4>
                                            <i className="fas fa-globe"></i> Coody Admin, Inc.
                                            <small className="float-right">Ngày xuất hóa đơn: {moment().format('DD-MM-YYYY')}</small>
                                        </h4>
                                    </div>
                                </div>

                                {/* Info row */}
                                <div className="row invoice-info">
                                    <div className="col-sm-4 invoice-col">
                                        Từ :
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

                                    <div className="col-sm-3 invoice-col">
                                        Đến :
                                        <address>
                                            <strong>{order.user.name}</strong>
                                            <br />
                                            {order.shippingAddress.address}
                                            <br />
                                            Phone: {order.user.phone}

                                        </address>
                                    </div>

                                    <div className="col-sm-5 invoice-col">
                                        <b>Hóa Đơn: #{order._id}</b>
                                        <br />
                                        <b>Order ID:</b> #{order._id}
                                        <br />
                                        <b>Ngày tạo hóa đơn:</b> {moment(order.orderDate).format('DD-MM-YYYY')}
                                        <br />
                                        <b>Tài khoản:</b> #{order.user._id}
                                    </div>
                                </div>

                                {/* Table row */}
                                <div className="row">
                                    <div className="col-12 table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: "20%", paddingLeft: 30 }}>#</th>
                                                    <th>Sản phẩm</th>
                                                    <th>Số lượng</th>
                                                    <th>Tổng Tạm Tính</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.items.map((item, index) => (
                                                    <tr key={index}>

                                                        <td style={{ paddingLeft: 30 }}>{index + 1}</td>
                                                        <td>{item.name}</td>
                                                        <td style={{ paddingLeft: 40 }}>{item.quantity}</td>
                                                        <td>${item.price.toFixed(2) * item.quantity}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="row">
                                    {/* Accepted payments column */}
                                    <div className="col-6 ">
                                        <p className="lead ">Phương Thức Thanh Toán:</p>
                                        <img src="../../../dist/img/credit/visa.png" alt="Visa" />
                                        <img src="../../../dist/img/credit/mastercard.png" alt="Mastercard" />
                                        <img src="../../../dist/img/credit/american-express.png" alt="American Express" />
                                        <img src="../../../dist/img/credit/paypal2.png" alt="Paypal" />
                                    </div>

                                    <div className="col-6">
                                    <p className="lead">Ngày xuất hóa đơn: {moment().format('DD-MM-YYYY')}</p>


                                        <div className="table-responsive">
                                            <table className="table">
                                                <tr>
                                                    <th style={{ width: "50%" }}>Tổng tạm tính:</th>
                                                    <td>${order.totalPrice.toFixed(2)}</td>
                                                </tr>
                                                <tr>
                                                    <th>Phí giao hàng:</th>
                                                    <td>${order.shippingfee.toFixed(2)}</td>
                                                </tr>
                                                <tr>
                                                    <th>Tổng Tiền:</th>
                                                    <td>${order.totalPrice.toFixed(2)}</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                {/* This row will not appear when printing */}
                                <div className="row no-print">
                                    <div className="col-12">
                                        <button
                                            className="btn btn-secondary mr-1"
                                            onClick={() => navigate(-1)}
                                        >
                                            Quay lại
                                        </button>
                                        <a
                                            href="invoice-print.html"
                                            rel="noopener"
                                            target="_blank"
                                            className="btn btn-default"
                                        >
                                            <i className="fas fa-print"></i> Print
                                        </a>

                                        <button type="button" className="btn btn-success float-right">
                                            <i className="far fa-credit-card"></i> Submit Payment
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-primary float-right"
                                            style={{ marginRight: "5px" }}
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
    );
};

export default UserInvoice;
