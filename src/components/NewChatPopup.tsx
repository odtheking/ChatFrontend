import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, TextField, Button, Box, Typography, Chip, IconButton} from '@mui/material'
import { Close as CloseIcon, Add as AddIcon } from '@mui/icons-material'

interface NewChatPopupProps {
    open: boolean
    onClose: () => void
    onCreateChat: (users: string[]) => void
}

export const NewChatPopup: React.FC<NewChatPopupProps> =
    ({ open, onClose, onCreateChat }) => {
    const [userInput, setUserInput] = useState("")
    const [selectedUsers, setSelectedUsers] = useState<string[]>([])

    const handleAddUser = () => {
        if (!userInput || selectedUsers.includes(userInput.trim())) return
        setSelectedUsers([...selectedUsers, userInput.trim()])
        setUserInput("")
    }

    const handleRemoveUser = (user: string) => setSelectedUsers(selectedUsers.filter(u => u !== user))

    const handleCreateChat = () => {
        if (selectedUsers.length <= 0) return
        onCreateChat(selectedUsers)
        setSelectedUsers([])
        setUserInput("")
    }

    const handleClose = () => {
        setSelectedUsers([])
        setUserInput("")
        onClose()
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            slotProps={{
                paper: {
                    sx: {
                        bgcolor: 'rgba(26, 26, 26, 0.95)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 3,
                    }
                }
            }}
        >
            <DialogTitle sx={{
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pb: 1,
                fontWeight: 600
            }}>
                Start New Chat
                <IconButton onClick={handleClose} sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pt: 1 }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <TextField
                        fullWidth
                        placeholder="Enter username"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddUser(); } }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                bgcolor: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: 2,
                                '& input': { color: 'white', fontSize: '0.9rem' },
                                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0, 124, 240, 0.8)' },
                            },
                        }}
                    />
                    <Button
                        onClick={handleAddUser}
                        disabled={!userInput.trim()}
                        sx={{
                            minWidth: '48px',
                            bgcolor: 'rgba(0, 124, 240, 0.8)',
                            '&:hover': { bgcolor: 'rgba(0, 124, 240, 1)' },
                            '&:disabled': { bgcolor: 'rgba(128, 128, 128, 0.3)' }
                        }}
                    ><AddIcon /></Button>
                </Box>

                {selectedUsers.length > 0 && (
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
                            Selected Users:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {selectedUsers.map((user) => (
                                <Chip
                                    key={user}
                                    label={user}
                                    onDelete={() => handleRemoveUser(user)}
                                    sx={{
                                        bgcolor: 'rgba(0, 124, 240, 0.2)',
                                        color: 'white',
                                        '& .MuiChip-deleteIcon': { color: 'rgba(255, 255, 255, 0.7)' }
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>
                )}

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
                    <Button
                        onClick={handleClose}
                        sx={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' }
                        }}
                    >Cancel</Button>
                    <Button
                        onClick={handleCreateChat}
                        disabled={selectedUsers.length === 0}
                        variant="contained"
                        sx={{
                            bgcolor: 'rgba(0, 240, 124, 0.8)',
                            '&:hover': { bgcolor: 'rgba(0, 240, 124, 1)' },
                            '&:disabled': { bgcolor: 'rgba(128, 128, 128, 0.3)' }
                        }}
                    >Create Chat</Button>
                </Box>
            </DialogContent>
        </Dialog>
    )
}
