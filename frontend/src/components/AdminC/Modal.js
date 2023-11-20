import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS if not already done in the project

const Modal = ({ isOpen, close, admin, updateAdmin }) => {
  const [editAdmin, setEditAdmin] = useState(admin || {});

  useEffect(() => {
    if (admin) {
      setEditAdmin(admin);
      console.log("editAdmin",admin);
    }
  }, [admin]);

  if (!isOpen || !admin) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditAdmin({ ...editAdmin, [name]: value });
  };

  const handleSubmit = (e) => {
    console.log("editAdmin",editAdmin);
    e.preventDefault();
    updateAdmin(editAdmin);
    close();
  };

  return (
    <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">정보 수정 - {editAdmin.admin_name}</h5>
            <button type="button" className="close" aria-label="Close" onClick={close}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="admin_name">이름:</label>
                <input
                  type="text"
                  className="form-control"
                  id="admin_name"
                  name="admin_name"
                  value={editAdmin.admin_name}
                  onChange={handleChange}
                />
              </div>

              {/* Repeat the pattern below for additional admin details */}
{/*               
              <div className="form-group">
                <label htmlFor="admin_password">비밀번호:</label>
                <input
                  type="password"
                  className="form-control"
                  id="admin_password"
                  name="admin_password"
                  value={editAdmin.admin_password}
                  onChange={handleChange}
                />
              </div> */}

              {/* ...more fields... */}

              <div className="form-group">
                <label htmlFor="admin_email">이메일:</label>
                <input
                  type="email"
                  className="form-control"
                  id="admin_email"
                  name="admin_email"
                  value={editAdmin.admin_email}
                  onChange={handleChange}
                />
              </div>

              {/* ...more fields... */}
              
              <div className="form-group">
                <label htmlFor="role">역할:</label>
                <select
                  className="form-control"
                  id="role"
                  name="role"
                  value={editAdmin.role}
                  onChange={handleChange}
                >
                  <option value="admin_e">선생님</option>
                  <option value="admin_c">관리자</option>
                  {/* Add more roles as needed */}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="is_active">활성 상태:</label>
                <select
                  className="form-control"
                  id="is_active"
                  name="is_active"
                  value={editAdmin.is_active}
                  onChange={handleChange}
                >
                  <option value={1}>활성</option>
                  <option value={0}>비활성</option>
                </select>
              </div>
              
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={close}>닫기</button>
                <button type="submit" className="btn btn-primary">저장하기</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
