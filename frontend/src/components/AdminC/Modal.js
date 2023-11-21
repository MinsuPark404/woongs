import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
const Modal = ({ isOpen, close, admin, updateAdmin }) => {
  const [editAdmin, setEditAdmin] = useState(admin || {});
  console.log("admin",admin);
  console.log("isOpen?",isOpen);
  useEffect(() => {
    setEditAdmin(admin || {});
  }, [admin]);
  // 모달 닫기 버튼 확인
  console.log("is close button working?",close);
  if (!isOpen || !admin) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditAdmin({ ...editAdmin, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAdmin(editAdmin);
    close();
  };

  return (
    <Dialog open={isOpen} onClose={close} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">정보 수정 - {editAdmin.admin_name}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="이름"
            type="text"
            fullWidth
            margin="normal"
            name="admin_name"
            value={editAdmin.admin_name}
            onChange={handleChange}
          />
          <TextField
            label="이메일"
            type="email"
            fullWidth
            margin="normal"
            name="admin_email"
            value={editAdmin.admin_email}
            onChange={handleChange}
          />

          {/* ...more fields... */}

          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="role">역할</InputLabel>
            <Select
              value={editAdmin.role}
              onChange={handleChange}
              inputProps={{ name: 'role', id: 'role' }}
            >
              <MenuItem value="admin_e">선생님</MenuItem>
              <MenuItem value="admin_c">관리자</MenuItem>
              {/* Add more roles as needed */}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="is_active">활성 상태</InputLabel>
            <Select
              value={editAdmin.is_active}
              onChange={handleChange}
              inputProps={{ name: 'is_active', id: 'is_active' }}
            >
              <MenuItem value={1}>활성</MenuItem>
              <MenuItem value={0}>비활성</MenuItem>
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="secondary">
          닫기
        </Button>
        <Button onClick={handleSubmit} color="primary" startIcon={<SaveIcon/>}>
          저장하기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
