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


        <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Dashboard</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Dashboard v3</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="content">
                <div className="container-fluid">
                    <div className="card-header">
                        <button onClick={handleLogout} className="btn btn-primary btn-block">Đăng xuất</button>
                    </div>


                </div>
            </div>
        </div>

    );
};

export default Dashboard;
