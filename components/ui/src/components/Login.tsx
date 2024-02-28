import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { login } from "../services/Login";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import './styling/globalStyling.css'

export const Login = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    if (typeof email === "string" && typeof password === "string") {
      try {
        const loginResponse = await login(email, password);
        authLogin(loginResponse.token);
        navigate("/dashboard");
      } catch (error) {
        console.log("Error while logging in", error);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ py: { xs: 4, sm: 8 } }}>
      <CssBaseline />
      <Box
        sx={{
          marginBottom: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 3, p: 1, backgroundColor: "#201E1E", height:'48px' }}
          >
            Single Sign On
          </Button>
          <Divider orientation="horizontal" sx={{ mb: 1 }} />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            className="login-text-input"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            className="login-sign-button"
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" style={{ textDecoration: "none", color:'black' }}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" style={{ textDecoration: "none", color:'black' }}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
