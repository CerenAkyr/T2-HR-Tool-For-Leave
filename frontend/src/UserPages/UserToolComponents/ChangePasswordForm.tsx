import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import BadgeIcon from '@mui/icons-material/Badge';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router-dom';

function ChangePasswordForm() {

    const [error, setError] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const newPassword = data.get('newPassword')?.toString();
        const newPasswordAgain = data.get('newPasswordAgain')?.toString();
        if (newPassword !== newPasswordAgain) {
            setError(true);
            setErrorText("Şifreler eşleşmiyor!");
        } else {
            setError(false);
            setErrorText("");
            const token = sessionStorage.getItem('token');
            const username = sessionStorage.getItem('username');
            console.log(newPassword);
            console.log(newPasswordAgain);
            // send the data to the backend:
            const response = await fetch('http://localhost:8080/change-password/' + username, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                Authorization: `Bearer ${token}`,
                },
                body: newPassword
            });
            const responseData = await response.json();
            if (responseData.status === "error") {
                setError(true);
                setErrorText(responseData.message);
                console.log("fail")
            }
            else {
                setError(false);
                setErrorText("");
                setSuccess(true);
                console.log("success")
                setTimeout(() => {
                    navigate('/user/view-profile');
                }
                    , 1200);
            }
        }
    }


    return (
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
                Şifre Değiştir
            </Typography>
            {error && (
                <Alert severity='error' sx={{ mt: 1, mb: 2 }}>
                    {errorText}
                </Alert>)}
            {success && (
                <Alert severity='success' sx={{ mt: 1, mb: 2 }}>
                    Kayıt başarıyla güncellendi!
                </Alert>)}
            <Box component="form" noValidate sx={{ mt: 6 }}
                onSubmit={handleSubmit}>
                <FormControl component="fieldset" sx={{ mt: 2, justifyContent: 'center' }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="newPassword"
                                label="Yeni Şifre"
                                type="password"
                                id="newPassword"
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="newPasswordAgain"
                                label="Yeni Şifre Tekrar"
                                type="password"
                                id="newPasswordAgain"
                                autoComplete="current-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 4, mb: 2 }}
                    >
                        Güncelle
                    </Button>
                </FormControl>

            </Box>

        </Box>
    );

}

export default ChangePasswordForm;