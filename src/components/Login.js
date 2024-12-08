import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../service/Authentication/Login"; // Import API từ file riêng

const Login = ({ setIsAuthenticated }) => {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Reset lỗi trước khi login
        try {
            const response = await loginApi(identifier, password); // Gọi API login
            console.log("Đăng nhập thành công:", response);

            // Lưu trạng thái đăng nhập vào localStorage
            localStorage.setItem("authToken", response.data.token);
            // Cập nhật trạng thái đăng nhập
            setIsAuthenticated(true);
            navigate("/dashboard"); // Chuyển hướng đến Dashboard

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                {/* Login Logo */}
                <div className="card card-outline card-primary">
                    <div className="card-header text-center">
                        <a href="" className="h1">
                            <b>CoodyFood</b>
                            <br/>
                            Admin
                        </a>
                    </div>
                    <div className="card-body">
                        <p className="login-box-msg">Sign in to start your session</p>

                        <form onSubmit={handleLogin}>


                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Email hoặc Số điện thoại"
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    required
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>

                            <div className="input-group mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Mật khẩu"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />

                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                {/* /.col */}
                                <div className="col-12">
                                    <button type="submit" className="btn btn-primary btn-block">
                                        Đăng Nhập
                                    </button>
                                </div>
                                {/* /.col */}
                            </div>
                        </form>
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <div className="social-auth-links text-center mt-2 mb-3">
                            <a href="#" className="btn btn-block btn-primary">
                                <i className=""></i>I forgot my password
                            </a>
                            <a href="#" className="btn btn-block btn-danger">
                                <i className=""></i> Register a new membership
                            </a>
                        </div>

                    </div>
                    {/* /.card-body */}
                </div>
                {/* /.card */}
            </div>
            {/* /.login-box */}
        </div>
    );
};

export default Login;
