import { Typography } from '@mui/material'
import React from 'react'

export const AuthToggleLink: React.FC<{ color: string, onClick: () => void, children: React.ReactNode }> =
    ({ color, onClick, children }) => {
    return (
        <Typography
            variant="body2"
            sx={{
                color: "rgba(255,255,255,0.7)",
                cursor: 'pointer',
                '&:hover': {
                    color: color,
                    textDecoration: 'underline'
                },
                transition: 'all 0.3s ease'
            }}
            onClick={onClick}
        >{children}</Typography>
    )
}