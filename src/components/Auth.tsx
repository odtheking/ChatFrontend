import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import React, { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { login, signUp } from "../utils/APIUtils"
import { AuthCard } from './auth/AuthCard'
import { AuthTextField } from './auth/AuthTextField'
import { AuthButton } from './auth/AuthButton'
import { AuthToggleLink } from './auth/AuthToggleLink'

export const Auth: React.FC = () => {
    const [isSignUp, setIsSignUp] = useState(false)
    const [signInForm, setSignInForm] = useState({ email: "", password: "" })
    const [signUpForm, setSignUpForm] = useState({ name: "", email: "", password: "" })

    const handleToggle = () => setIsSignUp(!isSignUp)

    const signInColor = "rgba(0, 124, 240, 0.8)"
    const signUpColor = "rgba(0, 240, 124, 0.8)"

    const loginMutation = useMutation({
        mutationFn: () => login(signInForm.email, signInForm.password),
        onSuccess: (data) => {
            localStorage.setItem("token", data.access_token)
            console.log("Login success", data)
        },
        onError: (error: Error) => { alert(error.message) }
    })

    const signupMutation = useMutation({
        mutationFn: () => signUp(signUpForm.name, signUpForm.email, signUpForm.password),
        onSuccess: (data) => {
            console.log("Signup success", data)
            setIsSignUp(false)
        },
        onError: (error: Error) => { alert(error.message) }
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
                    <AuthCard>
                        <Typography variant="h3" component="h1" sx={{ mb: 4, color: "white" }}>
                            Sign In
                        </Typography>

                        <AuthTextField
                            id="signin-email"
                            label="Email"
                            value={signInForm.email}
                            onChange={(e) => setSignInForm({ ...signInForm, email: e.target.value })}
                        />
                        <AuthTextField
                            id="signin-password"
                            label="Password"
                            type="password"
                            value={signInForm.password}
                            onChange={(e) => setSignInForm({ ...signInForm, password: e.target.value })}
                        />

                        <AuthButton
                            color={signInColor}
                            onClick={() => loginMutation.mutate()}
                        >
                            {loginMutation.isPending ? "Signing In..." : "Sign In"}
                        </AuthButton>

                        <AuthToggleLink color={signInColor} onClick={handleToggle}>
                            Don't have an account? Sign up
                        </AuthToggleLink>
                    </AuthCard>

                    <AuthCard isFlipped>
                        <Typography variant="h3" component="h1" sx={{ mb: 3, color: "white", fontWeight: "bold" }}>
                            Sign Up
                        </Typography>

                        <AuthTextField
                            id="signup-name"
                            label="Name"
                            value={signUpForm.name}
                            onChange={(e) => setSignUpForm({ ...signUpForm, name: e.target.value })}
                        />
                        <AuthTextField
                            id="signup-email"
                            label="Email"
                            type="email"
                            value={signUpForm.email}
                            onChange={(e) => setSignUpForm({ ...signUpForm, email: e.target.value })}
                        />
                        <AuthTextField
                            id="signup-password"
                            label="Password"
                            type="password"
                            value={signUpForm.password}
                            onChange={(e) => setSignUpForm({ ...signUpForm, password: e.target.value })}
                        />

                        <AuthButton
                            color={signUpColor}
                            onClick={() => signupMutation.mutate()}
                        >
                            {signupMutation.isPending ? "Creating..." : "Create Account"}
                        </AuthButton>

                        <AuthToggleLink color={signUpColor} onClick={handleToggle}>
                            Already have an account? Sign in
                        </AuthToggleLink>
                    </AuthCard>
                </Box>
            </Box>
        </Container>
    )
}