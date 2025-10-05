import { io, Socket } from 'socket.io-client'

export interface Message {
    id: string
    content: string
    sender: string
    timestamp: string
    chatId: string
}

export interface Group {
    chatId: string
    members: string[]
    lastMessage?: {
        content: string
        sender: string
        timestamp: string
    }
}

class WebSocketService {
    private socket: Socket | null = null
    private messageCallbacks: ((message: Message) => void)[] = []
    private chatUpdateCallbacks: ((chats: Group[]) => void)[] = []
    private messagesCallbacks: ((messages: Message[]) => void)[] = []
    private readonly maxReconnectAttempts = 5

    connect(token: string) {
        if (this.socket?.connected) this.socket.disconnect()

        this.socket = io(import.meta.env.VITE_API_BASE, {
            auth: { token },
            transports: ['websocket'],
            timeout: 10000,
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionAttempts: this.maxReconnectAttempts
        })

        this.socket.on('msgToClient', (message: Message) => {
            this.messageCallbacks.forEach(callback => callback(message))
        })

        this.socket.on('chatUpdate', (chats: Group[]) => {
            this.chatUpdateCallbacks.forEach(callback => callback(chats))
        })

        this.socket.on('chatMessages', (messages: Message[]) => {
            this.messagesCallbacks.forEach(callback => callback(messages))
        })

        this.socket.on('disconnect', () => {
            this.clearCallbacks()
        })

        this.socket.on('connect_error', (error) => {
            console.error('WebSocket connection error:', error)
        })
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect()
            this.socket = null
        }
        this.clearCallbacks()
    }

    private clearCallbacks() {
        this.messageCallbacks = []
        this.chatUpdateCallbacks = []
        this.messagesCallbacks = []
    }

    private sanitize(text: string): string {
        return text.replace(/[<>]/g, '')
    }

    sendMessage(chatId: string, message: string): void {
        if (!this.socket?.connected || !message.trim() || message.length > 1500) return
        const sanitized = this.sanitize(message.trim())
        this.socket.emit('msgToServer', { chatId, message: sanitized })
    }

    createChat(users: string[]): void {
        if (!this.socket?.connected || !users || users.length === 0) return
        this.socket.emit('createChat', { users })
    }

    getMessages(chatId: string): void {
        if (!this.socket?.connected || !chatId) return
        this.socket.emit('getChatMessages', { chatId })
    }

    deleteChat(chatId: string): void {
        if (!this.socket?.connected || !chatId) return
        this.socket.emit('deleteChat', { chatId })
    }

    onMessage(callback: (message: Message) => void): void {
        this.messageCallbacks.push(callback)
    }

    removeMessageListener(callback: (message: Message) => void): void {
        this.messageCallbacks = this.messageCallbacks.filter(cb => cb !== callback)
    }

    onChatUpdate(callback: (chats: Group[]) => void): void {
        this.chatUpdateCallbacks.push(callback)
    }

    removeChatUpdateListener(callback: (chats: Group[]) => void): void {
        this.chatUpdateCallbacks = this.chatUpdateCallbacks.filter(cb => cb !== callback)
    }

    onMessages(callback: (messages: Message[]) => void): void {
        this.messagesCallbacks.push(callback)
    }

    removeMessagesListener(callback: (messages: Message[]) => void): void {
        this.messagesCallbacks = this.messagesCallbacks.filter(cb => cb !== callback)
    }
}

export const webSocketService = new WebSocketService()