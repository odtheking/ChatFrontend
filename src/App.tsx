import CssBaseline from '@mui/material/CssBaseline'
import Background from "./components/Background.tsx"
import { Auth } from "./components/auth/Auth.tsx"
import { ChatElement } from "./components/chat/ChatElement.tsx"
import { useState, useEffect } from 'react'
import { CircularProgress } from '@mui/material'
import { validateToken } from './utils/Utils.ts'

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

    useEffect(() => {
        const token = sessionStorage.getItem("token")
        if (!token) {
            setIsAuthenticated(false)
            return
        }

        const isValid = validateToken(token)
        if (!isValid) sessionStorage.removeItem("token")
        setIsAuthenticated(isValid)
    }, [])

    if (isAuthenticated === null) {
        return (
            <>
                <CssBaseline />
                <Background>
                    <CircularProgress sx={{ color: 'rgba(0, 124, 240, 0.8)' }} />
                </Background>
            </>
        )
    }

    return (
       <>
           <CssBaseline />
           <Background>
               {isAuthenticated ? <ChatElement /> : <Auth />}
           </Background>
       </>
    )
}