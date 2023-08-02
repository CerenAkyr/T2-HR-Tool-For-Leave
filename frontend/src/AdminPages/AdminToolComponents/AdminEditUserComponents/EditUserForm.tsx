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
import DatePickerValue from '../StartDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import "../StartDatePicker.css"

interface User {
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    gender: string,
    birthday: Dayjs,
    activity: string,
}

interface UserProps {
    user: User,
    usernameOfEdit?: string | null,
}

export default function EditUserForm({ user, usernameOfEdit }: UserProps) {


    // state to get date from datepicker:
    const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(
        dayjs('1999-05-01')
    );

    // state to show error:
    const [error, setError] = React.useState(false);
    const [errorText, setErrorText] = React.useState<string>("");

    // state to show success:
    const [success, setSuccess] = React.useState(false);

    const [username, setUsername] = React.useState(user.username);
    const [email, setEmail] = React.useState(user.email);
    const [firstname, setFirstname] = React.useState(user.firstname);
    const [lastname, setLastname] = React.useState(user.lastname);
    const [gender, setGender] = React.useState(user.gender);


    React.useEffect(() => {
        setUsername(user.username)
        setEmail(user.email)
        setFirstname(user.firstname)
        setLastname(user.lastname)
        setGender(user.gender)

    }, [user.username]);

    const navigate = useNavigate();


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        // öncelikle boş field var mı diye bak, varsa hiç girişme bile
        const username = data.get('username')?.toString();
        const email = data.get('email')?.toString();
        const firstname = data.get('firstName')?.toString();
        const lastname = data.get('lastName')?.toString();
        const gender = data.get('gender')?.toString();
        const birthday = selectedDate;


        if (!username || !email || !firstname || !lastname || !gender || !birthday ||
            username.trim() === '' || email.trim() === '' ||
            firstname.trim() === '' || lastname.trim() === '' || gender.trim() === '') {
            setError(true);
            setErrorText("Lütfen tüm alanları doldurunuz!");
            return;
        }

        const requestBody = {
            username: username,
            email: email,
            firstname: firstname,
            lastname: lastname,
            gender: gender,
            birthday: birthday,
        };


        console.log("Request body: ", requestBody);
        const token = sessionStorage.getItem('token');
        // register user:
        fetch('http://localhost:8080/update/' + usernameOfEdit, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`, // Add the Bearer token to the Authorization header
            },
            body: JSON.stringify(requestBody),
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Registration successful');
                    setSuccess(true);
                    setError(false);
                    setTimeout(() => {
                        const role = sessionStorage.getItem('role');
                        if (role === 'ROLE_ADMIN')
                            navigate("/admin/users");
                        else
                            navigate("/user/view-profile");
                    }, 1200); // 1200 milliseconds = 1.2 seconds
                } else {
                    console.log('Registration failed');
                    setError(true);
                    setSuccess(false);
                    setErrorText("Kayıt güncellenemedi. Lütfen daha sonra tekrar deneyiniz.");
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
                        Kullanıcı Kaydı Düzenlemesi
                    </Typography>
                    {error && (
                        <Alert severity='error' sx={{ mt: 1, mb: 2 }}>
                            {errorText}
                        </Alert>)}
                    {success && (
                        <Alert severity='success' sx={{ mt: 1, mb: 2 }}>
                            Kayıt başarıyla güncellendi!
                        </Alert>)}
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
                                    value={firstname} // Controlled component value
                                    onChange={(e) => setFirstname(e.target.value)} // Update state on change
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
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Grid>
                        <Grid item xs={12}>
                            <Grid item xs={12}>
                                <FormControl component="fieldset" sx={{ mt: 2, justifyContent: 'center' }}>
                                    <FormLabel sx={{ justifyContent: 'center', pl: 21 }} component="legend">
                                        Cinsiyet
                                    </FormLabel>
                                    <RadioGroup
                                        sx={{ justifyContent: 'center' }} // Center the radio buttons horizontally
                                        aria-label="gender"
                                        name="gender"
                                        row
                                        value={gender}
                                        onChange={(event) => setGender(event.target.value)}
                                    >
                                        <FormControlLabel
                                            value="Kadın"
                                            control={<Radio />}
                                            label="Kadın"
                                        />
                                        <FormControlLabel
                                            value="Erkek"
                                            control={<Radio />}
                                            label="Erkek"
                                        />
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
                        Güncelle
                    </Button>
                </Box>
            </Box>
        </Container>
        </ThemeProvider >
    );
}