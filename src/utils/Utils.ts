import type { Group } from './WebSocketService'

export const getInitials = (username: string) => {
    if (!username) return '?'
    return username.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)
}

export const formatTime = (timestamp: string) => {
    if (!timestamp) return ''
    const date = new Date(timestamp)
    if (isNaN(date.getTime())) return ''
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export const sortGroupsByLastMessage = (groups: Group[]): Group[] => {
    return [...groups].sort((a, b) => {
        const aTime = a.lastMessage?.timestamp
        const bTime = b.lastMessage?.timestamp

        if (!aTime && !bTime) return 0
        if (!aTime) return 1
        if (!bTime) return -1

        return new Date(bTime).getTime() - new Date(aTime).getTime()
    })
}

export const validateToken = (token: string): boolean => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        return payload.exp && payload.exp * 1000 > Date.now()
    } catch {
        return false
    }
}

export const getTokenPayload = (token: string): { username: string, exp: number, sub: string } | null => {
    try {
        return JSON.parse(atob(token.split('.')[1]))
    } catch {
        return null
    }
}
