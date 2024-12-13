import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken"); // Xóa token
        setIsAuthenticated(false);
        navigate("/login"); // Chuyển hướng về trang Login
    };

    return (


        <div className="content-wrapper elevation-3"

            style={{
                marginLeft: "280px",
                marginTop: "100px",
                marginRight: "18px",
                borderRadius: "18px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                backgroundColor: "white"
            }}>
            {/* Content Header (Page header) */}
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Dashboard</h1>
                        </div>

                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="content">
                <div className="container">
                    <div className="card-header">
                        <button
                            onClick={handleLogout}
                            className=" btn btn-secondary"
                            style={{
                                backgroundColor: '#AB886D',
                                color: '#FFFFFF',
                                padding: '5px 10px',
                                borderRadius: '16px',
                                display: 'inline-block',
                                borderColor: '#AB886D',
                            }}
                        >
                            Đăng xuất
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Dashboard;
