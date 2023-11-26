import React, { useState } from 'react';
import { Tabs, Tab, Box, Paper, Typography } from '@mui/material';
import List from './List';
import BlurVideo from './BlurVideo';
import AnomalyDetection from './AnomalyDetection';

const Videos = () => {
    const items = ['비디오 목록', '이상탐지 기록', '비디오 블러링'];
    const [activeTab, setActiveTab] = useState(0);

    const handleChange = (event, newValue) => {
    setActiveTab(newValue);
    
    };

    return (
        <Paper sx={{ width: '100%' }}>
            <Box sx={{ margin: 2, padding: 2 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>CCTV 관리</Typography>
            <Tabs 
            value={activeTab} 
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary" 
            aria-label="domain tabs" 
            variant="fullWidth"
            sx={{
            '.MuiTab-root:hover': { // 탭 버튼 호버 스타일
                backgroundColor: '#1976d2', // 호버시 배경색
                color: '#fff', // 호버시 글자색
            }
            }}
            >
            {items.map((item, index) => (
                <Tab label={item} key={index} />
            ))}
            </Tabs>
                {activeTab === 0 && <List />}
                {activeTab === 1 && <AnomalyDetection />}
                {activeTab === 2 && <BlurVideo />}
            </Box>
        </Paper>
    );
};

export default Videos;