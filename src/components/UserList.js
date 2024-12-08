// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../service/api';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        console.log(data); // Kiểm tra dữ liệu
        if (Array.isArray(data.data)) {
          setUsers(data.data);
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Danh sách người dùng</h2>
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user._id}>
            <p>{user.name}</p>
          </div>
        ))
      ) : (
        <p>Không có người dùng nào</p>
      )}
    </div>
  );
};

export default UserList;
