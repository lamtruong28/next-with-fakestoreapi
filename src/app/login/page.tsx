"use client";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { localStore, validationInput } from "~/utils";
import request from "~/api/request";
import { useRouter } from "next/navigation";
import { env, paths } from "~/configs";
import {
    AccountCircleOutlined,
    KeyOutlined,
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";
type StateProp = {
    username: string | boolean;
    password: string | boolean;
};

function Login() {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [serverError, setServerError] = useState<string>("");
    const [showPass, setShowPass] = useState(false);
    const [state, setState] = useState<StateProp>({
        username: "",
        password: "",
    });
    const [error, setError] = useState<StateProp>({
        username: false,
        password: false,
    });
    const handleChangeInput = (value: string, key: string) => {
        setState((prev) => ({ ...prev, [key]: value }));
        setError((prev) => ({ ...prev, [key]: false }));
        !!serverError && setServerError("");
    };

    const handleLogin = async () => {
        const result = validationInput([
            { key: "username", value: state.username as string },
            { key: "password", value: state.password as string },
        ]);
        if (Object.keys(result).length) setError({ ...(result as StateProp) });
        else {
            setLoading(true);
            const res = await request.post("/auth/login", {
                username: state.username,
                password: state.password,
            });
            setLoading(false);
            if (res.status === "success") {
                localStore.set(env.isLogged, true);
                localStore.set(env.token, res.payload?.token);
                router.push("/");
            }
            if (res.status === "error") setServerError(res.message);
        }
    };

    const handleEnterPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        event.key === "Enter" && handleLogin();
    };

    return (
        <Box className="min-vh-100 d-flex justify-content-center align-items-center bg-dark">
            <Box component={"div"} width={400} className="bg-light rounded p-4">
                <Stack spacing={2}>
                    <Typography
                        variant="h1"
                        fontSize={26}
                        fontWeight={700}
                        textTransform={"uppercase"}
                        textAlign={"center"}
                    >
                        Login
                    </Typography>
                    <Typography textAlign={"center"} className="text-muted">
                        Welcome to store us!
                    </Typography>
                    <Stack spacing={0.5}>
                        <TextField
                            variant="filled"
                            label="Username"
                            spellCheck={false}
                            fullWidth={true}
                            autoComplete={"username"}
                            autoFocus={true}
                            InputProps={{
                                readOnly: loading,
                            }}
                            error={error.username as boolean}
                            value={state.username}
                            onChange={(event) =>
                                handleChangeInput(
                                    event.target.value,
                                    "username"
                                )
                            }
                        />
                        <Typography
                            paddingLeft={1.8}
                            color={"red"}
                            fontSize={13}
                            height={13}
                        >
                            {error.username && "Username is requirement!"}
                        </Typography>
                    </Stack>
                    <Stack spacing={0.5}>
                        <TextField
                            variant="filled"
                            label="Password"
                            type={showPass ? "text" : "password"}
                            spellCheck={false}
                            fullWidth={true}
                            InputProps={{
                                readOnly: loading,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="Toggle password visibility"
                                            onClick={() =>
                                                setShowPass(!showPass)
                                            }
                                        >
                                            {showPass ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            error={error.password as boolean}
                            value={state.password}
                            onChange={(event) =>
                                handleChangeInput(
                                    event.target.value,
                                    "password"
                                )
                            }
                            onKeyDown={handleEnterPress}
                        />

                        <Typography
                            paddingLeft={1.8}
                            color={"red"}
                            fontSize={13}
                            height={13}
                        >
                            {error.password && "Password is requirement!"}
                        </Typography>
                        {!!serverError && (
                            <Alert variant="outlined" severity="error">
                                {serverError}
                            </Alert>
                        )}
                    </Stack>

                    <Button
                        variant="contained"
                        size="large"
                        disabled={loading}
                        onClick={handleLogin}
                    >
                        Log in{" "}
                        {loading && (
                            <CircularProgress
                                style={{ marginLeft: 8 }}
                                color="info"
                                size={20}
                            />
                        )}{" "}
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
}

export default Login;
