import React, { useState, useEffect } from "react";
import { getAllShippers, deleteShipper } from "../../service/Shipper/shipperApi";
import { useNavigate } from "react-router-dom";

const ShipperList = () => {
  const [shippers, setShippers] = useState([]); // Lưu danh sách người dùng
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại

  const PerPage = 10; // Số người dùng mỗi trang
  const navigate = useNavigate(); // Hook để điều hướng


  const fetchShippers = async () => {
    try {
      const data = await getAllShippers();
      if (Array.isArray(data.data)) {
        setShippers(data.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
    }
  };
  useEffect(() => {
    fetchShippers();
  }, []);


  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa shipper này?')) {
      try {
        const result = await deleteShipper(id);
        if (result.status) {
          alert('Xóa thành công!');
          fetchShippers();
        } else {
          alert('Xóa thất bại!');
        }
      } catch (error) {
        console.error('Lỗi khi xóa shipper:', error);
        alert('Đã xảy ra lỗi khi xóa shipper!');
      }
    }
  };

  // Tính toán chỉ số đầu và cuối
  const indexOfLast = currentPage * PerPage;
  const indexOfFirst = indexOfLast - PerPage;
  const current = shippers.slice(indexOfFirst, indexOfLast); // Lấy danh sách người dùng trên trang hiện tại

  // Tạo danh sách số trang
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(shippers.length / PerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (number) => {
    setCurrentPage(number);
  };

  const handleDetailClick = (id) => {
    navigate(`/shipper/${id}`); // Chuyển hướng đến trang chi tiết với id
  };

  const handleEditClick = (id) => {
    navigate(`/shipperedit/${id}`); // Chuyển hướng đến trang Sửa với id
  };

  const handlProfileClick = (id) => {
    navigate(`/shipperprofile/${id}`); // Chuyển hướng đến trang Sửa với id
  };




  return (
    <div className="content-wrapper elevation-5 "
      style={{
        marginLeft: "280px",
        marginTop: "100px",
        marginRight: "18px",
        borderRadius: "18px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        backgroundColor: "white"
      }}
    >
      {/* Header */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">

            <div className="col-sm-6">
              <h1 className="m-0">Danh Sách Shipper</h1>
            </div>

          </div>
        </div>
      </div>

      {/* Table */}
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card" style={{
                borderRadius: '18px',
              }}>



                <div className="card-body">
                  <table className="table table-bordered"
                    style={{
                      borderRadius: '18px',
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          color: '#A8A196',
                        }}
                      >
                        <th>#</th>
                        <th>Tên Shipper</th>
                        <th>Email</th>
                        <th>Trạng thái</th>
                        <th>Xác Thực</th>
                        <th>Khác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {current.length > 0 ? (
                        current.map((shipper, index) => (
                          <tr key={shipper._id}>
                            <td>{indexOfFirst + index + 1}</td>
                            <td>{shipper.name}</td>
                            <td>{shipper.email}</td>

                            <td>
                              {shipper.status == 'Hoạt động' ? (
                                <span
                                  style={{
                                    backgroundColor: '#A8CD89',
                                    color: '#FFFFFF',
                                    padding: '5px 10px',
                                    borderRadius: '16px',
                                    display: 'inline-block',
                                  }}
                                >
                                  Hoạt động
                                </span>
                              ) : (
                                <span
                                  style={{
                                    backgroundColor: '#B7B7B7',
                                    color: '#FFFFFF',
                                    padding: '5px 10px',
                                    borderRadius: '16px',
                                    display: 'inline-block',
                                  }}
                                >
                                  Tài khoản bị khóa
                                </span>
                              )
                              }
                            </td>

                            <td>
                              {shipper.verified ? (
                                <span
                                  style={{
                                    backgroundColor: '#A8CD89',
                                    color: '#FFFFFF',
                                    padding: '5px 10px',
                                    borderRadius: '16px',
                                    display: 'inline-block',
                                  }}
                                >
                                  Đã xác thực
                                </span>
                              ) : shipper.imageVerified.length === 0 ? (
                                <span
                                  style={{
                                    backgroundColor: '#AB4459',
                                    color: '#FFFFFF',
                                    padding: '5px 10px',
                                    borderRadius: '16px',
                                    display: 'inline-block',
                                  }}
                                >
                                  Chưa xác thực
                                </span>
                              ) : (
                                <span
                                  style={{
                                    backgroundColor: '#FFB200',
                                    color: '#FFFFFF',
                                    padding: '5px 10px',
                                    borderRadius: '16px',
                                    display: 'inline-block',
                                  }}
                                >
                                  Chờ xác thực
                                </span>
                              )}
                            </td>

                            <td>
                              <div class="btn-group">
                                <button type="button"
                                  class="btn btn-secondary"
                                  style={{
                                    backgroundColor: '#AB886D',
                                    color: '#FFFFFF',
                                    padding: '5px 10px',
                                    borderRadius: '16px',
                                    display: 'inline-block',
                                    borderColor: '#AB886D',
                                  }}
                                  onClick={() => handlProfileClick(shipper._id)}
                                >
                                  Xem
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3">Không có shipper nào nào</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="card-footer"
                  style={{
                    borderBottomLeftRadius: '18px',
                    borderBottomRightRadius: '18px',
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

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ShipperList;
