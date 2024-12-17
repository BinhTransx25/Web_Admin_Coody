import React, { useState, useEffect } from "react";
import { getAllUsers, deleteUser } from "../../service/User/userApi";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]); // Lưu danh sách người dùng
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const usersPerPage = 10; // Số người dùng mỗi trang
  const navigate = useNavigate(); // Hook để điều hướng


  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      if (Array.isArray(data.data)) {
        setUsers(data.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa user này?')) {
      try {
        const result = await deleteUser(id);
        if (result.status) {
          alert('Xóa thành công!');
          fetchUsers();
        } else {
          alert('Xóa thất bại!');
        }
      } catch (error) {
        console.error('Lỗi khi xóa user:', error);
        alert('Đã xảy ra lỗi khi xóa user!');
      }
    }
  };

  // Tính toán chỉ số đầu và cuối
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser); // Lấy danh sách người dùng trên trang hiện tại

  // Tạo danh sách số trang
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (number) => {
    setCurrentPage(number);
  };

  const handleDetailClick = (id) => {
    navigate(`/users/${id}`); // Chuyển hướng đến trang chi tiết với id
  };
  const handleEditClick = (id) => {
    navigate(`/useredit/${id}`); // Chuyển hướng đến trang Sửa với id
  };
  const handlProfileClick = (id) => {
    navigate(`/userprofile/${id}`); // Chuyển hướng đến trang Sửa với id
  };


  return (
    <div
      className="content-wrapper elevation-3"
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
              <h1 className="m-0">Danh sách người dùng</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card"
                style={{
                  borderRadius: '18px',
                }}
              >
                <div className="card-body">
                  <table className="table table-bordered ">
                    <thead>
                      <tr style={{
                        color: '#A8A196',
                      }}>
                        <th>#</th>
                        <th>Tên người dùng</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Trạng thái</th>
                        <th>Khác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentUsers.length > 0 ? (
                        currentUsers.map((user, index) => (
                          <tr key={user._id}>
                            <td>{indexOfFirstUser + index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>

                            <td>
                              {user.status == 'Hoạt động' ? (
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
                                    backgroundColor: '#F95454',
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
                              <div className="btn-group">

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
                                  onClick={() => handlProfileClick(user._id)}
                                >
                                  Xem
                                </button>

                              </div>
                            </td>

                          </tr>
                        ))

                      ) : (
                        <tr>
                          <td colSpan="5">Không có người dùng nào</td>
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
                  }}>
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

                            }}>
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

export default UserList;
