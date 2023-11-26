import React, { useState } from 'react';
// import axios from 'axios';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // 이전 메시지 초기화
    try {
      const response = await axios.post('/api/admins/login', {
        admin_email: username,
        admin_password: password,
      });
      // 서버가 성공 메시지를 반환하면 메인 페이지로 네비게이트
      setMessage(response.data.message);
      // 로그인 성공시 session데이터 요청후 데이터 저장
      const sessionData = await axios.post('/api/admins/sessiondata');
      console.log('sessionData', sessionData);
      dispatch({
        type: 'LOGIN',
        bno : sessionData.data.admin.bno,
        name: sessionData.data.admin.name,
        email: sessionData.data.admin.email,
        id: sessionData.data.admin.id,
        roll: sessionData.data.admin.role,
      });
      // redux에 저장된 데이터 확인
      console.log('redux', data)
      navigate('/main');
    } catch (error) {
      // 에러 처리 개선
      if (error.response) {
        // 서버가 반환한 에러 메시지를 표시
        setMessage(error.response.data.message);
      } else {
        // 에러 메시지가 없는 경우 일반 메시지를 표시
        setMessage('로그인 중에 오류가 발생했습니다. 나중에 다시 시도해 주세요.');
      }
      console.error('Login error', error);
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                label="Remember me"
              />
              {message && (
                <Typography color="error">{message}</Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    로그인 정보를 잃어버렸습니까?
                  </Link>
                </Grid>
                <Grid item>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
