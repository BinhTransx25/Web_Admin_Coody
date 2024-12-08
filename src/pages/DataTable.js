import React, { useState, useEffect } from "react";
import { getAllUsers } from "../service/User/userApi";

const DataTable = () => {
  const [users, setUsers] = useState([]); // Lưu danh sách người dùng
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const usersPerPage = 10; // Số người dùng mỗi trang

  useEffect(() => {
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

    fetchUsers();
  }, []);

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

  return (
    <div className="content-wrapper">
      {/* Header */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Danh sách người dùng</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">DataTable</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Danh sách người dùng</h3>
                </div>
                <div className="card-body">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Tên người dùng</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentUsers.length > 0 ? (
                        currentUsers.map((user, index) => (
                          <tr key={user._id}>
                            <td>{indexOfFirstUser + index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3">Không có người dùng nào</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                <div className="card-footer">
                  <nav>
                    <ul className="pagination justify-content-center">
                      {pageNumbers.map((number) => (
                        <li
                          key={number}
                          className={`page-item ${
                            currentPage === number ? "active" : ""
                          }`}
                          onClick={() => handleClick(number)}
                        >
                          <a className="page-link" href="#">
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

export default DataTable;
