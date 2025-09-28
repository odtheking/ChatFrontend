import CssBaseline from '@mui/material/CssBaseline'
import Background from "./components/Background.tsx"
import { Auth } from "./components/Auth.tsx"

export default function App() {
    return (
        <>
            <CssBaseline />
            <Background>
                <Auth />
            </Background>
        </>
    )
}