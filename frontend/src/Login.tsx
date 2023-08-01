import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props} sx={{ margin: 5 }}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.t2.com.tr">
        T2 Yazılım
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignIn() {

  // state showing error message:
  const [errorMessage, setErrorMessage] = useState<string>("");

  let navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const requestBody = {
      username: data.get('email'),
      password: data.get('password'),
    };
    //console.log(requestBody);

    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.status === 401) {
        console.log('Authentication failed: Invalid credentials');
        setErrorMessage("Lütfen kullanıcı adı ve şifrenizi kontrol ediniz.");
      } else if (!response.ok) {
        console.log(`Error! status: ${response.status}`);
        setErrorMessage("Bir şeyler ters gitti. Lütfen daha sonra tekrar deneyiniz.");
      }
      else {
        setErrorMessage("");
        const responseData = await response.text();
        // Save the token to sessionStorage
        sessionStorage.setItem('token', responseData);
        sessionStorage.setItem('username', requestBody.username?.toString()!);
        console.log(responseData);
        console.log("tokennnnn:");
        console.log(sessionStorage.getItem('username'));
        navigate('/admin/users');
      }
    } catch (e) {
      console.log('Error', e);
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#1392c2',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 16,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#9f5cbe' }}>
            <LoginIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Oturum Aç
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Şifre"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Beni Hatırla"
            />
            <Button className="button" style={{ verticalAlign: 'middle' }}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Oturum Aç
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" paddingLeft={18} >
                  Şifremi Unuttum
                </Link>
              </Grid>
            </Grid>
          </Box>
          {errorMessage !== "" && <Alert sx={{ margin: 4 }} severity="error"><AlertTitle>Giriş Hatası</AlertTitle>{errorMessage}</Alert>}
          <Copyright />
        </Box>
      </Container>
    </ThemeProvider>
  );
}