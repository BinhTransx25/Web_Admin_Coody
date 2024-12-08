import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import routes from "./pages/routes";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
          src="dist/img/AdminLTELogo.png"
          alt="AdminLTELogo"
          height="60"
          width="60"
        />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="wrapper">
        {/* Chỉ hiển thị Navbar và Sidebar nếu đã đăng nhập */}
        {isAuthenticated && <Navbar />}
        {isAuthenticated && <Sidebar />}

        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <route.component
                  isAuthenticated={isAuthenticated}
                  setIsAuthenticated={setIsAuthenticated}
                />
              }
            />
          ))}
          {/* Chuyển hướng tới Login nếu chưa đăng nhập */}
          <Route
            path="*"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
          />
        </Routes>

        {/* Footer chỉ hiển thị nếu đã đăng nhập */}
        {isAuthenticated && <Footer />}
      </div>
    </BrowserRouter>
  );
}

export default App;
