import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import React, { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { login, signUp } from "../../utils/APIUtils.ts"
import { AuthTextField } from "./AuthTextField.tsx"
import { AuthCard } from "./AuthCard.tsx"
import { AuthButton } from "./AuthButton.tsx"
import { AuthToggleLink } from "./AuthToggleLink.tsx"
import { Alert } from "@mui/material"

export const Auth: React.FC = () => {
    const [isSignUp, setIsSignUp] = useState(false)
    const [signInForm, setSignInForm] = useState({ email: "", password: "" })
    const [signUpForm, setSignUpForm] = useState({ name: "", email: "", password: "" })
    const [error, setError] = useState<string | null>(null)

    const handleToggle = () => {
        setIsSignUp(!isSignUp)
        setError(null)
    }

    const signInColor = "rgba(0, 124, 240, 0.8)"
    const signUpColor = "rgba(0, 240, 124, 0.8)"

    const loginMutation = useMutation({
        mutationFn: () => login(signInForm.email, signInForm.password),
        onSuccess: (data) => {
            sessionStorage.setItem("token", data.accessToken)
            window.location.reload()
        },
        onError: (error: Error) => setError(error.message)
    })

    const signupMutation = useMutation({
        mutationFn: () => signUp(signUpForm.name, signUpForm.email, signUpForm.password),
        onSuccess: () => setIsSignUp(false),
        onError: (error: Error) => setError(error.message)
    })

    return (
        <Container maxWidth="sm">
            <Box sx={{ perspective: "1000px", height: "500px", width: "100%" }}>
                <Box
                    sx={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        transformStyle: "preserve-3d",
                        transition: "transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        transform: isSignUp ? "rotateY(180deg)" : "rotateY(0deg)",
                    }}
                >
                    <AuthCard isFlipped={false}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Sign In
                        </Typography>

                        {error && !isSignUp && (
                            <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
                                {error}
                            </Alert>
                        )}

                        <AuthTextField
                            label="Email"
                            type="email"
                            value={signInForm.email}
                            onChange={e => setSignInForm({ ...signInForm, email: e.target.value })}
                        />
                        <AuthTextField
                            label="Password"
                            type="password"
                            value={signInForm.password}
                            onChange={e => setSignInForm({ ...signInForm, password: e.target.value })}
                        />

                        <AuthButton
                            onClick={() => loginMutation.mutate()}
                            loading={loginMutation.isPending}
                            bgColor={signInColor}
                        >
                            Sign In
                        </AuthButton>

                        <AuthToggleLink onClick={handleToggle}>
                            Don't have an account? Sign up
                        </AuthToggleLink>
                    </AuthCard>

                    <AuthCard isFlipped={true}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Create Account
                        </Typography>

                        {error && isSignUp && (
                            <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
                                {error}
                            </Alert>
                        )}

                        <AuthTextField
                            label="Name"
                            value={signUpForm.name}
                            onChange={e => setSignUpForm({ ...signUpForm, name: e.target.value })}
                        />
                        <AuthTextField
                            label="Email"
                            type="email"
                            value={signUpForm.email}
                            onChange={e => setSignUpForm({ ...signUpForm, email: e.target.value })}
                        />
                        <AuthTextField
                            label="Password"
                            type="password"
                            value={signUpForm.password}
                            onChange={e => setSignUpForm({ ...signUpForm, password: e.target.value })}
                        />

                        <AuthButton
                            onClick={() => signupMutation.mutate()}
                            loading={signupMutation.isPending}
                            bgColor={signUpColor}
                        >
                            Sign Up
                        </AuthButton>

                        <AuthToggleLink onClick={handleToggle}>
                            Already have an account? Sign in
                        </AuthToggleLink>
                    </AuthCard>
                </Box>
            </Box>
        </Container>
    )
}