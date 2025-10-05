import React from 'react'
import { Box, Typography, Avatar, IconButton } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import { getInitials } from "../utils/Utils.ts"
import LogoutIcon from '@mui/icons-material/Logout'
import { webSocketService } from "../utils/WebSocketService.ts"

interface UserProfileProps {
    username: string
    onNewChatClick: () => void
}

const handleSignOut = () => {
    webSocketService.disconnect()
    sessionStorage.removeItem("token")
    window.location.reload()
}

export const UserProfile: React.FC<UserProfileProps> = React.memo(({ username, onNewChatClick }) => {
    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: '20px',
                left: '20px',
                width: '320px',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                p: 1,
                bgcolor: 'rgba(26, 26, 26, 0.4)',
                borderRadius: 2,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                zIndex: 1000,
            }}
        >
            <Avatar
                sx={{
                    width: 40,
                    height: 40,
                    bgcolor: 'rgba(0, 124, 240, 0.8)',
                    fontSize: '1rem',
                    fontWeight: 600,
                }}
            >{getInitials(username)}</Avatar>
            <Box sx={{ flex: 1 }}>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'white',
                        fontWeight: 500,
                        fontSize: '0.9rem',
                    }}
                >{username}</Typography>
                <Typography
                    variant="caption"
                    sx={{
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontSize: '0.75rem',
                    }}
                >🟢 Online</Typography>
            </Box>
            <IconButton
                onClick={onNewChatClick}
                sx={{
                    color: 'rgba(0, 240, 124, 0.8)',
                    bgcolor: 'rgba(0, 240, 124, 0.2)',
                    width: 32,
                    height: 32,
                    '&:hover': {
                        bgcolor: 'rgba(0, 240, 124, 0.2)',
                        color: 'rgba(0, 240, 124, 1)',
                    },
                }}
            ><AddIcon fontSize="small" />
            </IconButton>
            <IconButton
                onClick={handleSignOut}
                sx={{
                    color: 'rgba(255, 0, 124, 0.8)',
                    bgcolor: 'rgba(255, 0, 124, 0.2)',
                    width: 32,
                    height: 32,
                    '&:hover': {
                        bgcolor: 'rgba(255, 0, 0, 0.2)',
                        color: 'rgba(255, 0, 0, 1)',
                    },
                }}
            ><LogoutIcon fontSize="small" />
            </IconButton>
        </Box>
    )
})
