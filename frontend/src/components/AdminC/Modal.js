import React, { useState } from 'react';
import './AdminC.css';

const Modal = ({ isOpen, close, admin, updateAdmin }) => {
  const [editAdmin, setEditAdmin] = useState(admin);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditAdmin({ ...editAdmin, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAdmin(editAdmin); // 여기서 updateAdmin은 상위 컴포넌트로부터 전달된 함수로 가정합니다.
    close(); // 변경 후 모달을 닫습니다.
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={close}>&times;</span>
        <h2>{admin.admin_name}의 상세 정보</h2>
        <table>
          <tbody>
            <tr>
              <th>이름</th>
              <td>{admin.admin_name}</td>
            </tr>
            <tr>
              <th>전화번호 1</th>
              <td>{admin.admin_phone}</td>
            </tr>
            <tr>
              <th>전화번호 2</th>
              <td>{admin.admin_phone2}</td>
            </tr>
            <tr>
              <th>상호명</th>
              <td>{admin.company_name}</td>
            </tr>
            <tr>
              <th>주소</th>
              <td>{admin.company_address}</td>
            </tr>
            <tr>
              <th>고유번호</th>
              <td>{admin.company_unique}</td>
            </tr>
            <tr>
              <th>이메일 주소</th>
              <td>{admin.admin_email}</td>
            </tr>
            <tr>
              <th>권한</th>
              <td>{admin.role}</td>
            </tr>
            <tr>
              <th>활성 상태</th>
              <td>{admin.is_active ? '활성화' : '비활성화'}</td>
            </tr>
            <tr>
              <th>생성된 시간</th>
              <td>{new Date(admin.created_at).toLocaleString()}</td>
            </tr>
            <tr>
              <th>업데이트된 시간</th>
              <td>{new Date(admin.updated_at).toLocaleString()}</td>
            </tr>
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Modal;
