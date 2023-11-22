import React from 'react';
import { Grid, Paper } from '@mui/material';

const Dashboard = () => {
  return (
    <Grid container spacing={3}>
      <Grid item container xs={12} spacing={3}>
        <Grid item xs={12} md={7}>
          <Paper style={{ height: '400px', padding: '20px' }}>
            <p>여기에 그래프가 들어갑니다.</p>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper style={{ height: '400px', padding: '20px' }}>
                  <p>정사각형 그리드</p>
                </Paper>
              </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container xs={12} spacing={3}>
        <Grid item xs={12} md={7}>
          <Paper style={{ height: '400px', padding: '20px' }}>
            <p>여기에 그래프가 들어갑니다.</p>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper style={{ height: '400px', padding: '20px' }}>
                  <p>정사각형 그리드</p>
                </Paper>
              </Grid>
          </Grid>
        </Grid>
      </Grid>
    
    </Grid>
  );
};

export default Dashboard;
