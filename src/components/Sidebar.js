import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Sidebar = () => {
  // Trạng thái lưu trạng thái mở/đóng của từng menu
  const [menuOpen, setMenuOpen] = useState({});

  // Hàm để toggle (mở/đóng) menu con
  const toggleMenu = (menuKey) => {
    setMenuOpen((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <a href="/" className="brand-link">
        <img
          src="dist/img/LogoMark.png"
          alt="AdminLTE Logo"
          className="brand-image "
          style={{ opacity: 0.8 }}
        />
        <span className="brand-text font-weight-light ">Coody AdminLTE</span>
      </a>

      <div className="sidebar sidebar-dark-primary  ">
        <div className="user-panel  mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="dist/img/user2-160x160.jpg"
              className="img-circle elevation-2"
              alt="User"
            />
          </div>
          <div className="info">
            <a href="#" className="d-block font-weight-light">binhtran@gmail.com</a>
          </div>
        </div>

        <nav className="mt-2">
          <ul className="nav nav-pills  nav-sidebar flex-column " data-widget="treeview" role="menu" data-accordion="false">


            {/* Người Dùng */}
            <li className="nav-item">
              <div
                className="nav-link"
                onClick={() => toggleMenu("userMenu")}
                style={{ cursor: 'pointer' }}
              >
                <i className="nav-icon fas fa-user "></i>
                <p className='font-weight-light'>
                  Customer
                  <i className={`right fas ${menuOpen["userMenu"] ? 'fa-angle-down' : 'fa-angle-left'}`}></i>
                </p>
              </div>
              {menuOpen["userMenu"] && (
                <ul className="nav nav-pills nav-sidebar flex-column">
                  <li className="nav-item">
                    <Link to="/userlist" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p className='font-weight-light'>Danh sách người dùng</p>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Cửa Hàng */}
            <li className="nav-item">
              <div
                className="nav-link"
                onClick={() => toggleMenu("shopOwnerMenu")}
                style={{ cursor: 'pointer' }}
              >
                <i className="nav-icon fas fa-database"></i>
                <p className='font-weight-light'>
                  ShopOwner
                  <i className={`right fas ${menuOpen["shopOwnerMenu"] ? 'fa-angle-down' : 'fa-angle-left'}`}></i>
                </p>
              </div>
              {menuOpen["shopOwnerMenu"] && (
                <ul className="nav nav-pills nav-sidebar flex-column">
                  <li className="nav-item">
                    <Link to="/shopownerlist" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p className='font-weight-light'>Danh sách cửa hàng</p>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Shipper */}
            <li className="nav-item">
              <div
                className="nav-link"
                onClick={() => toggleMenu("shipperMenu")}
                style={{ cursor: 'pointer' }}
              >
                <i className="nav-icon fas fa-ship"></i>
                <p className='font-weight-light'>
                  Shipper
                  <i className={`right fas ${menuOpen["shipperMenu"] ? 'fa-angle-down' : 'fa-angle-left'}`}></i>
                </p>
              </div>
              {menuOpen["shipperMenu"] && (
                <ul className="nav nav-pills nav-sidebar flex-column">
                  <li className="nav-item">
                    <Link to="/shipperlist" className="nav-link">
                      <i className="far fa-circle nav-icon"></i>
                      <p className='font-weight-light'>Danh sách shipper</p>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
