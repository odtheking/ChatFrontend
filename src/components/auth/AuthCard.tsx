import { Box } from '@mui/material'
import React from 'react'

export const AuthCard: React.FC<{
    isFlipped?: boolean
    children: React.ReactNode
}> = ({ children, isFlipped = false }) => {
    return (
        <Box
            sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                ...(isFlipped && { transform: 'rotateY(180deg)' }),
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: "rgba(26,26,26,0.3)",
                borderRadius: 4,
                padding: 4,
                boxShadow: "0px 0px 20px rgba(0,0,0,0.7)",
                '& .MuiTypography-h4': {
                    color: 'white'
                },
            }}
        >{children}</Box>
    )
}