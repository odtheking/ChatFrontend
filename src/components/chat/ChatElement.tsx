import { Container } from "@mui/material"
import React, { useEffect, useState, useCallback } from "react"
import Box from "@mui/material/Box"
import { GroupsList} from "./GroupsList.tsx"
import { ChatTextInput } from "./ChatTextInput.tsx"
import { Messages } from "./Messages.tsx"
import { UserProfile } from "../UserProfile.tsx"
import { NewChatPopup } from "../NewChatPopup.tsx"
import { webSocketService } from "../../utils/WebSocketService.ts"
import type { Message, Group } from "../../utils/WebSocketService.ts"
import { sortGroupsByLastMessage, getTokenPayload } from "../../utils/Utils.ts"

export const ChatElement: React.FC = () => {
    const [groups, setGroups] = useState<Group[]>([])
    const [chatId, setChatId] = useState<string | null>(null)
    const [messages, setMessages] = useState<Message[]>([])
    const [currentUsername, setCurrentUsername] = useState<string>('User')
    const [showNewChatPopup, setShowNewChatPopup] = useState(false)

    useEffect(() => {
        const token = sessionStorage.getItem("token")
        if (!token) {
            window.location.reload()
            return
        }

        const payload = getTokenPayload(token)
        if (!payload) {
            sessionStorage.removeItem("token")
            window.location.reload()
            return
        }

        setCurrentUsername(payload.username)
        webSocketService.connect(token)

        return () => webSocketService.disconnect()
    }, [])

    const updateLastMessage = useCallback((message: Message) => {
        setGroups(prevGroups => {
            const updated = prevGroups.map(group =>
                group.chatId === message.chatId
                    ? { ...group, lastMessage: { content: message.content, sender: message.sender, timestamp: message.timestamp } }
                    : group
            )
            return sortGroupsByLastMessage(updated)
        })
    }, [])

    const handleGroupClick = useCallback((group: Group) => {
        setChatId(group.chatId)
        setMessages([])
        webSocketService.getMessages(group.chatId)
    }, [])

    const handleSendMessage = useCallback((message: string) => {
        if (!chatId || !message.trim()) return
        webSocketService.sendMessage(chatId, message)
    }, [chatId])

    const handleGroupDelete = useCallback((chatId: string) => {
        webSocketService.deleteChat(chatId)
    }, [])

    const handleCreateChat = useCallback((users: string[]) => {
        webSocketService.createChat(users)
        setShowNewChatPopup(false)
    }, [])

    const handleOpenNewChat = useCallback(() => setShowNewChatPopup(true), [])
    const handleCloseNewChat = useCallback(() => setShowNewChatPopup(false), [])

    useEffect(() => {
        const handleNewMessage = (message: Message) => {
            updateLastMessage(message)
            setMessages(prev => {
                if (message.chatId !== chatId) return prev
                if (prev.some(msg => msg.id === message.id)) return prev
                return [...prev, message]
            })
        }

        const handleChatUpdate = (chats: Group[]) => {
            setGroups(prevGroups => {
                const withLastMessages = chats.map(newChat => {
                    const existingChat = prevGroups.find(g => g.chatId === newChat.chatId)
                    return {
                        ...newChat,
                        lastMessage: newChat.lastMessage || existingChat?.lastMessage
                    }
                })
                return sortGroupsByLastMessage(withLastMessages)
            })

            if (chatId && !chats.some(g => g.chatId === chatId)) {
                setChatId(null)
                setMessages([])
            }
        }

        const handleMessages = (messages: Message[]) => {
            setMessages(messages)
            if (messages.length > 0) updateLastMessage(messages[messages.length - 1])
        }

        webSocketService.onMessage(handleNewMessage)
        webSocketService.onChatUpdate(handleChatUpdate)
        webSocketService.onMessages(handleMessages)

        return () => {
            webSocketService.removeMessageListener(handleNewMessage)
            webSocketService.removeChatUpdateListener(handleChatUpdate)
            webSocketService.removeMessagesListener(handleMessages)
        }
    }, [chatId, updateLastMessage])

    return (
        <Container maxWidth={false} sx={{ height: '100vh', position: 'relative', p: 0 }}>
            <GroupsList
                groups={groups}
                onGroupClick={handleGroupClick}
                onGroupDelete={handleGroupDelete}
                selectedChatId={chatId}
            />

            {chatId ? (
                <Messages messages={messages} currentUsername={currentUsername} />
            ) : (
                <Box
                    sx={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        color: 'rgba(255, 255, 255, 0.6)',
                    }}
                >
                    <Box sx={{ fontSize: '3rem', mb: 2 }}>💬</Box>
                    <Box sx={{ fontSize: '1.2rem', mb: 1 }}>Welcome to WebChat</Box>
                    <Box sx={{ fontSize: '0.9rem' }}>Select a chat to start messaging</Box>
                </Box>
            )}

            <ChatTextInput onSendMessage={handleSendMessage} disabled={!chatId} />
            <UserProfile username={currentUsername} onNewChatClick={handleOpenNewChat} />
            <NewChatPopup
                open={showNewChatPopup}
                onClose={handleCloseNewChat}
                onCreateChat={handleCreateChat}
            />
        </Container>
    )
}