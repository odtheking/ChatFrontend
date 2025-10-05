import { Button, Avatar, Box, Typography, IconButton } from '@mui/material'
import React, { useState } from 'react'
import { formatTime, getInitials } from "../../utils/Utils.ts"
import DeleteIcon from '@mui/icons-material/Delete'
import type { Group } from "../../utils/WebSocketService.ts"

interface GroupsListProps {
    groups: Group[]
    onGroupClick?: (group: Group) => void
    onGroupDelete?: (chatId: string) => void
    selectedChatId?: string | null
}

export const GroupsList: React.FC<GroupsListProps> = React.memo(({ groups, onGroupClick, onGroupDelete, selectedChatId }) => {
    const [hoveredGroupId, setHoveredGroupId] = useState<string | null>(null)

    const formatMembers = (members: string[]) => {
        if (members.length <= 2) return members.join(', ')
        return `${members.slice(0, 2).join(', ')} +${members.length - 2}`
    }

    const truncateMessage = (message: string, maxLength: number = 35) =>
        message.length <= maxLength ? message : message.substring(0, maxLength) + '...'

    return (
        <Box
            sx={{
                position: 'fixed',
                top: '20px',
                left: '20px',
                height: '88vh',
                width: '320px',
                bgcolor: 'rgba(26, 26, 26, 0.4)',
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                zIndex: 1,
                overflow: 'hidden',
            }}
        >
            <Box sx={{ p: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, textAlign: 'center' }}>
                    Chats
                </Typography>
            </Box>

            <Box
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    p: 1,
                    '&::-webkit-scrollbar': { width: '6px' },
                    '&::-webkit-scrollbar-track': { background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px' },
                    '&::-webkit-scrollbar-thumb': {
                        background: 'rgba(255, 255, 255, 0.3)',
                        borderRadius: '3px',
                        '&:hover': { background: 'rgba(255, 255, 255, 0.5)' }
                    }
                }}
            >
                {groups.length === 0 ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 1 }}>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', textAlign: 'center' }}>No chats yet</Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.4)', textAlign: 'center' }}>Create a new chat to get started</Typography>
                    </Box>
                ) : (
                    groups.map((group) => (
                        <Box
                            key={group.chatId}
                            sx={{ position: 'relative', mb: 0.5 }}
                            onMouseEnter={() => setHoveredGroupId(group.chatId)}
                            onMouseLeave={() => setHoveredGroupId(null)}
                        >
                            <Button
                                variant="text"
                                sx={{
                                    width: '100%',
                                    p: 1.5,
                                    borderRadius: 2,
                                    background: selectedChatId === group.chatId ? 'rgba(0, 124, 240, 0.2)' : 'transparent',
                                    border: selectedChatId === group.chatId ? '1px solid rgba(0, 124, 240, 0.4)' : '1px solid transparent',
                                    display: 'flex',
                                    alignItems: 'center',
                                    textTransform: 'none',
                                    justifyContent: 'flex-start',
                                    '&:hover': { background: selectedChatId === group.chatId ? 'rgba(0, 124, 240, 0.3)' : 'rgba(255, 255, 255, 0.05)' },
                                    transition: 'all 0.2s ease',
                                }}
                                onClick={() => onGroupClick && onGroupClick(group)}
                            >
                                <Avatar sx={{ width: 40, height: 40, bgcolor: 'rgba(0, 124, 240, 0.8)', fontSize: '0.8rem', mr: 1.5 }}>
                                    {getInitials(group.members[0])}
                                </Avatar>

                                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 0 }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'white',
                                            fontSize: '0.9rem',
                                            fontWeight: 500,
                                            width: '100%',
                                            textAlign: 'left',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {formatMembers(group.members)}
                                    </Typography>

                                    {group.lastMessage ? (
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mt: 0.5 }}>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: 'rgba(255, 255, 255, 0.6)',
                                                    fontSize: '0.75rem',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    flex: 1,
                                                    textAlign: 'left',
                                                }}
                                            >
                                                <strong>{group.lastMessage.sender}:</strong> {truncateMessage(group.lastMessage.content)}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.7rem', ml: 1, flexShrink: 0 }}>
                                                {formatTime(group.lastMessage.timestamp)}
                                            </Typography>
                                        </Box>
                                    ) : (
                                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.75rem', textAlign: 'left', mt: 0.5 }}>
                                            No messages yet
                                        </Typography>
                                    )}
                                </Box>
                            </Button>

                            {hoveredGroupId === group.chatId && onGroupDelete && (
                                <IconButton
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onGroupDelete(group.chatId)
                                    }}
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        right: '8px',
                                        transform: 'translateY(-50%)',
                                        bgcolor: 'rgba(244, 67, 54, 0.8)',
                                        color: 'white',
                                        width: '28px',
                                        height: '28px',
                                        '&:hover': {
                                            bgcolor: 'rgba(244, 67, 54, 1)',
                                        },
                                    }}
                                >
                                    <DeleteIcon sx={{ fontSize: '16px' }} />
                                </IconButton>
                            )}
                        </Box>
                    ))
                )}
            </Box>
        </Box>
    )
})
