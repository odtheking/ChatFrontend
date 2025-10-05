const API_BASE = import.meta.env.VITE_API_BASE

const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const data = await response.json().catch(() => ({ message: 'Request failed' }))
        throw new Error(data.message || 'Request failed')
    }
    return response.json()
}

export const signUp = async (name: string, email: string, password: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    })
    return handleResponse(response)
}

export const login = async (email: string, password: string): Promise<{ accessToken: string }> => {
    const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    return handleResponse(response)
}