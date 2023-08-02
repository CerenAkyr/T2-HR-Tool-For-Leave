import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import BadgeIcon from '@mui/icons-material/Badge';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import DatePickerValue from './StartDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import "./StartDatePicker.css"

export default function SignUp() {

  // state to get date from datepicker:
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(
    dayjs('1999-05-01')
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const requestBody ={
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
      firstname: data.get('firstName'),
      lastname: data.get('lastName'),
      gender: data.get('gender'),
      birthday: selectedDate,
    };

    console.log("Request body: ", requestBody);
    const token = sessionStorage.getItem('token');
    // register user:
    fetch('http://localhost:8080/new-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`, // Add the Bearer token to the Authorization header
      },
       body: JSON.stringify(requestBody),
    })

      .then((response) => {
        if (response.status === 200) {
          console.log('Registration successful');
        } else {
          console.log('Registration failed');
        }
      }
      )
      .catch((error) => {
        console.log(error);
      }
      );
  };

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
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
            marginTop: "4vh",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#9f5cbe' }}>
            <BadgeIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Kullanıcı Kaydı
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3, paddingLeft: "0px" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Ad"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Soyad"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Kullanıcı Adı"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Şifre"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                <Grid item xs={12}>
                  <FormControl component="fieldset" sx={{ mt: 2 }}>
                    <FormLabel sx={{ justifyContent: 'center', pl: 21 }} component="legend">Cinsiyet</FormLabel>
                    <RadioGroup
                      aria-label="gender"
                      name="gender"
                      row
                      sx={{ justifyContent: 'center', pl: 14 }}
                    >
                      <FormControlLabel value="Kadın" control={<Radio />} label="Kadın" />
                      <FormControlLabel value="Erkek" control={<Radio />} label="Erkek" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} mt={-2}>
              <DatePickerValue handleDateChange={handleDateChange} />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              KAYIT OL
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}