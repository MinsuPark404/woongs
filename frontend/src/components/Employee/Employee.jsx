import React, { useState } from 'react';
import { Tabs, Tab, Box, Paper, Typography } from '@mui/material';
import List from './List';
import RegisterEmp from './RegisterEmp';
import LogManagement from './LogManagement';

const Employee = () => {
    const [activeTab, setActiveTab] = useState(0);
    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    }
    return (

        <Paper sx={{ width: '100%' }}>
        <Box sx={{ margin: 2, padding: 2 }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>직원 관리</Typography>
            <Tabs
            value={activeTab}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth" // 탭을 넓게 분포
            aria-label="admin tabs"
            sx={{
              '.MuiTab-root:hover': { // 탭 버튼 호버 스타일
                backgroundColor: '#1976d2', // 호버시 배경색
                color: '#fff', // 호버시 글자색
                }
            }}
        >
            <Tab label="직원 목록" />
            <Tab label="직원 등록" />
            <Tab label="직원 로그 관리" />
        </Tabs>
        </Box>
        <Box sx={{ p: 3 }}>
            {activeTab === 0 && <List />}
            {activeTab === 1 && <RegisterEmp />}
            {activeTab === 2 && <LogManagement />}
        </Box>
    </Paper>
    );
};

export default Employee;