
export interface AuthPayload {
  name?: string
  email: string
  password: string
}

export function getAuthToken(): string | null {
  return localStorage.getItem('auth_token')
}

export async function submitAuth(endpoint: string, payload: AuthPayload) {
  const authApiUrl = import.meta.env.VITE_AUTH_API_URL
  const controller = new AbortController()

  try {
    const request = await fetch(`${authApiUrl}${endpoint}`, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    });

    const body = await request.json()

    if (!request.ok) {
      const error: any = new Error(request.statusText)
      error.status = request.status
      error.body = body
      throw error
    }

    return body
  } catch (error: any) {
    if (error.name !== 'AbortError') {
      throw error
    }
  }
  return null
}
