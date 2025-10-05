import React, { useEffect, useRef } from 'react'
import { Box, Typography, Paper, Avatar } from '@mui/material'
import type { Message } from '../../utils/WebSocketService'
import { formatTime, getInitials } from "../../utils/Utils.ts"

interface MessagesProps {
    messages: Message[]
    currentUsername?: string
}

export const Messages: React.FC<MessagesProps> = React.memo(({ messages, currentUsername }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView()
    }, [messages])

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                right: 0,
                left: '360px',
                bottom: '80px',
                overflowY: 'auto',
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                '&::-webkit-scrollbar': { width: '6px' },
                '&::-webkit-scrollbar-track': { background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px' },
                '&::-webkit-scrollbar-thumb': {
                    background: 'rgba(255, 255, 255, 0.3)',
                    borderRadius: '3px',
                    '&:hover': { background: 'rgba(255, 255, 255, 0.5)' }
                }
            }}
        >
            {messages.length === 0 ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>No messages yet</Typography>
                </Box>
            ) : (
                messages.map((message) => {
                    const isOwnMessage = message.sender === currentUsername

                    return (
                        <Box key={message.id} sx={{ display: 'flex', flexDirection: isOwnMessage ? 'row-reverse' : 'row', alignItems: 'flex-end', gap: 1, mb: 1 }}>

                           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column', gap: 1 }}>
                               <Avatar sx={{ width: 32, height: 32, bgcolor: 'rgba(0, 124, 240, 0.8)', fontSize: '0.75rem'}}>
                                   {getInitials(message.sender)}
                               </Avatar>

                               <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 0.5, ml: 1, fontWeight: 500 }}>
                                   {message.sender}
                               </Typography>
                           </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: isOwnMessage ? 'flex-end' : 'flex-start', maxWidth: '70%' }}>
                                <Paper
                                    sx={{
                                        padding: 1,
                                        bgcolor: isOwnMessage ? 'rgba(0, 124, 240, 0.8)' : 'rgba(255, 255, 255, 0.1)',
                                        color: 'white',
                                        borderRadius: 2,
                                    }}
                                >
                                    <Typography variant="body1" sx={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
                                        {message.content}
                                    </Typography>
                                    <Typography variant="caption" sx={{ display: 'block', mt: 0.5, opacity: 0.7, fontSize: '0.7rem', textAlign: 'right' }}>
                                        {formatTime(message.timestamp)}
                                    </Typography>
                                </Paper>
                            </Box>
                        </Box>
                    )
                })
            )}
            <div ref={messagesEndRef} />
        </Box>
    )
})
