import { Button, TextField, Box } from "@mui/material"
import React, { useState } from "react"

interface ChatTextInputProps {
    onSendMessage?: (message: string) => void
    disabled?: boolean
}

export const ChatTextInput: React.FC<ChatTextInputProps> = React.memo(({ onSendMessage, disabled = false }) => {
    const [message, setMessage] = useState("")

    const handleSend = () => {
        if (!message.trim() || !onSendMessage || disabled) return
        onSendMessage(message)
        setMessage("")
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key !== 'Enter' || e.shiftKey) return
        e.preventDefault()
        handleSend()
    }

    return (
        <Box
            sx={{
                position: 'fixed',
                left: '360px',
                right: '20px',
                bottom: 20,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                zIndex: 1,
                px: 2,
            }}
        >
            <TextField
                variant="outlined"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={disabled}
                placeholder={disabled ? "Select a chat to start messaging" : "Write a message"}
                sx={{
                    flex: 1,
                    bgcolor: disabled ? 'rgba(128, 128, 128, 0.3)' : 'rgba(26, 26, 26, 0.4)',
                    borderRadius: 3,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        '& input, & textarea': { color: 'white' },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0, 124, 240, 0.8)' },
                    },
                    '& .MuiInputLabel-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                        '&.Mui-focused': { color: 'rgba(0, 124, 240, 0.8)' },
                    },
                }}
                label="Write a message"
                multiline
                maxRows={4}
            />
            <Button
                variant="contained"
                onClick={handleSend}
                disabled={!message.trim() || disabled}
                sx={{
                    height: '56px',
                    minWidth: '80px',
                    bgcolor: disabled ? 'rgba(128, 128, 128, 0.5)' : 'rgba(0, 124, 240, 0.8)',
                    borderRadius: 2,
                    '&:hover': {
                        bgcolor: disabled ? 'rgba(128, 128, 128, 0.5)' : 'rgba(0, 124, 240, 1)',
                    },
                    '&:disabled': { color: 'rgba(255, 255, 255, 0.3)' },
                    transition: 'all 0.3s ease',
                }}
            >Send</Button>
        </Box>
    )
})
