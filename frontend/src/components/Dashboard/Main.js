import React from 'react';
import { Grid, Paper } from '@mui/material';

const Dashboard = () => {
  return (
    <Grid container spacing={3}>
      {/* 첫 번째 큰 행: 그래프 영역과 정사각형 그리드 영역을 감싸는 컨테이너 */}
      <Grid item container xs={12} spacing={3}>
        {/* 메인 그래프 영역 (70%) */}
        <Grid item xs={12} md={7}>
          <Paper style={{ height: '400px', padding: '20px' }}>
            {/* 그래프 컴포넌트 삽입 위치 */}
            <p>여기에 그래프가 들어갑니다.</p>
          </Paper>
        </Grid>

        {/* 정사각형 그리드 영역 (30%) */}
        <Grid item xs={12} md={5}>
          <Grid container spacing={2}>
            {/* 여러 개의 정사각형 그리드 */}
            {[1, 2, 3, 4].map((value) => ( // 길이가 늘어난다고 가정
              <Grid key={value} item xs={12}>
                <Paper style={{ height: '400px', padding: '20px' }}>
                  <p>정사각형 그리드 {value}</p>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* 두 번째 큰 행: 추가 그래프 또는 콘텐츠 */}
      <Grid item xs={12} md={7}>
        <Paper style={{ height: '200px', padding: '20px' }}>
          {/* 추가 콘텐츠 */}
          <p>여기에 추가 콘텐츠가 들어갑니다.</p>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
