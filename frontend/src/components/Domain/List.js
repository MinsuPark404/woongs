import React, { useState } from 'react';
import { Tabs, Tab, Box, Paper, Typography } from '@mui/material';
import RegisterDomain from './RegisterDomain';
import DomainList from './DomainList';

const List = () => {
  const items = ['도메인 목록', '도메인 등록'];
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
      <Paper sx={{ width: '100%' }}>
    <Box sx={{ margin: 2, padding: 2 }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>도메인 관리</Typography>
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
      {activeTab === 0 && <DomainList />}
      {activeTab === 1 && <RegisterDomain />}
    </Box>
      </Paper>
  );
};

export default List;