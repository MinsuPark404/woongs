import React, { useState } from 'react';
import { Tabs, Tab, Box, Paper, Typography } from '@mui/material';
import ChildList from './ChildList'; // 원생 목록 컴포넌트
import RegisterChild from './RegisterChild'; // 원생 등록 컴포넌트
import AttendanceManagement from './AttendanceManagement'; // 원생 출석 관리 컴포넌트

const ChildManagement = () => {
    const [activeTab, setActiveTab] = useState(0);
    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    }
    return (
        <Paper sx={{ width: '100%' }}>
            <Box sx={{ margin: 2, padding: 2 }}>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>원생 관리</Typography>
                <Tabs
                    value={activeTab}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="child management tabs"
                    sx={{
                        '.MuiTab-root:hover': { 
                            backgroundColor: '#1976d2', 
                            color: '#fff',
                        }
                    }}
                >
                    <Tab label="원생 목록" />
                    <Tab label="원생 등록" />
                    <Tab label="원생 출석 관리" />
                </Tabs>
            </Box>
            <Box sx={{ p: 3 }}>
                {activeTab === 0 && <ChildList />}
                {activeTab === 1 && <RegisterChild />}
                {activeTab === 2 && <AttendanceManagement />}
            </Box>
        </Paper>
    );
};

export default ChildManagement;
