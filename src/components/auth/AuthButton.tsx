import { Button } from '@mui/material'
import React from 'react'

export const AuthButton: React.FC<{
    bgColor: string
    children: React.ReactNode
    onClick?: () => void
    loading?: boolean
}> = ({ bgColor, children, onClick, loading = false }) => {
    return (
        <Button
            variant="contained"
            disabled={loading}
            sx={{
                mt: 3,
                mb: 2,
                width: '30ch',
                bgcolor: bgColor,
                color: "white",
                borderRadius: 2,
                fontWeight: 'bold',
                '&:hover': {
                    boxShadow: `0 0 15px ${bgColor}`,
                    transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
            }}
            onClick={onClick}
        >{loading ? 'Loading...' : children}</Button>
    )
}