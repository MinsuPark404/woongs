import React from 'react';
import { Grid, Paper, Typography,Alert } from '@mui/material';
import AttendanceRadialChart from './AttendanceRadialChart';
import WeeklyAttendanceBarChart from './WeeklyAttendanceBarChart'; 
import PuffLoader from 'react-spinners/PuffLoader';
import BoardCard from './BoardCard';
import VisitorChart from './VisitorChart';

const Dashboard = () => {
  return (
    <Grid container spacing={5}>
      <Grid item container xs={12} spacing={2}>
        <Grid item xs={12} md={8}>
          <Paper style={{ height: '420px', padding: '20px',margin : '20px'}}>
            <Typography variant="h5" component="h2" gutterBottom>
              출석
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <AttendanceRadialChart /> {/* 원형 진행률 차트 */}
              </Grid>
              <Grid item xs={12} md={8}>
                <WeeklyAttendanceBarChart /> {/* 주별 출석 막대 차트 */}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper style={{ height: '420px', padding: '20px', margin : '20px' }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    이상탐지
                  </Typography>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '30px'
                  }}>
                    <PuffLoader
                      color="#25469a"
                      cssOverride={{}}
                      loading
                      size={120}
                      speedMultiplier={0.7}
                    />
                    <Typography variant="h6" component="h2" gutterBottom>
                      이상탐지 가동중...
                    </Typography>
                  </div>
                  <br/>
                  <Alert variant="outlined" color="warning">
                    의심정황 포착 건수 : 5
                  </Alert>
                  <br/>
                  <Alert variant="outlined" color="error">
                    이상탐지 건수 : 0
                  </Alert>                 
                </Paper>
              </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container xs={12} spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper style={{ height: '400px', padding: '20px', marginLeft: '20px', marginRight: '20px' }}>
            <BoardCard /> 
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper style={{ height: '400px', padding: '20px', marginLeft: '20px', marginRight: '20px'}}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    방문자 기록
                  </Typography>
                  <VisitorChart />
                </Paper>
              </Grid>
          </Grid>
        </Grid>
      </Grid>
    
    </Grid>
  );
};

export default Dashboard;
