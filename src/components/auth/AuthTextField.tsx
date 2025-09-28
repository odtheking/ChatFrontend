import {TextField, type TextFieldProps} from '@mui/material'
import React from 'react'

export const AuthTextField: React.FC<Omit<TextFieldProps, 'sx'>> =
    ({ ...props }) => {
    return (
        <TextField
            variant="outlined"
            required
            sx={{
                margin: 1,
                width: '30ch',
                '& .MuiOutlinedInput-root': {
                    bgcolor: "rgba(26,26,26,0.4)",
                    borderRadius: 2,
                    '& input': { color: "white" },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: "rgba(255,255,255,0.3)" },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: "rgba(255,255,255,0.5)" },
                },
                '& .MuiInputLabel-root': { color: "rgba(255,255,255,0.7)" },
            }}
            {...props}
        />
    )
}