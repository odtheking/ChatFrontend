import { Button } from '@mui/material'
import React from 'react'

export const AuthButton: React.FC<{ color: string, children: React.ReactNode, onClick?: () => void }> = ({ color, children, onClick }) => {
    return (
        <Button
            variant="contained"
            sx={{
                mt: 3,
                mb: 2,
                width: '30ch',
                bgcolor: color,
                color: "white",
                borderRadius: 2,
                fontWeight: 'bold',
                '&:hover': {
                    boxShadow: `0 0 15px ${color}`,
                    transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
            }}
            onClick={onClick}
        >{children}</Button>
    )
}