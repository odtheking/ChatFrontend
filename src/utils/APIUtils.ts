const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000"

export const signUp = async (name: string, email: string, password: string) => {
    const response = await fetch(`${API_BASE}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    })

    if (!response.ok) throw new Error(`Sign up failed ${response.statusText}`)

    return response.json()
}

export const login = async (email: string, password: string) => {
    const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })

    if (!response.ok) throw new Error('Login failed ${response.statusText}')

    return response.json()
}