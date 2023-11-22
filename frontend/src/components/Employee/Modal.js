import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
const Modal = ({ isOpen, close, employee, updateEmployee }) => {
  const defaultEmp ={
    user_name: '',
    user_email: '',
    user_tel: '',
    user_role: '',
  }
  const [editEmp, setEditEmp] = useState(employee || {});
  useEffect(() => {
    setEditEmp(employee || {});
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditEmp({ ...editEmp, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEmployee(editEmp);
    close();
  };

  return (
    <Dialog open={isOpen} onClose={close} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">정보 수정 - {editEmp.user_name}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="이름"
            type="text"
            fullWidth
            margin="normal"
            name="user_name"
            value={editEmp.user_name}
            onChange={handleChange}
          />
          <TextField
            label="이메일"
            type="email"
            fullWidth
            margin="normal"
            name="user_email"
            value={editEmp.user_email}
            onChange={handleChange}
          />

          {/* ...more fields... */}
          <TextField
            label="전화번호"
            type="text"
            fullWidth
            margin="normal"
            name="user_tel"
            value={editEmp.user_tel}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal">
            <TextField
              label= "역할"
              type="text"
              fullWidth
              margin="normal"
              name="user_role"
              value={editEmp.user_role}
              onChange={handleChange}
            />
          </FormControl>
          {/* DB에 is active 추가 */}
          {/* <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="is_active">활성 상태</InputLabel>
            <Select
              value={editEmp.is_active}
              onChange={handleChange}
              inputProps={{ name: 'is_active', id: 'is_active' }}
            >
              <MenuItem value={1}>활성</MenuItem>
              <MenuItem value={0}>비활성</MenuItem>
            </Select>
          </FormControl> */}
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
