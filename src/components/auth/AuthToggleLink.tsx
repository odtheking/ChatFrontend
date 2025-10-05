import { Typography } from '@mui/material'
import React from 'react'

export const AuthToggleLink: React.FC<{
    onClick: () => void
    children: React.ReactNode
}> = ({ onClick, children }) => {
    return (
        <Typography
            variant="body2"
            sx={{
                color: "rgba(255,255,255,0.7)",
                cursor: 'pointer',
                '&:hover': {
                    color: 'rgba(0, 124, 240, 0.8)',
                    textDecoration: 'underline'
                },
                transition: 'all 0.3s ease'
            }}
            onClick={onClick}
        >{children}</Typography>
    )
}