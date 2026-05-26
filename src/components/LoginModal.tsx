import { useState, type ChangeEvent, type KeyboardEvent, type MouseEvent, type SubmitEvent } from 'react'
import { submitAuth } from '../services/AuthService'
import { useAuth } from '../contexts/AuthContext'
import type { LoginData } from '../models/LoginData'

interface LoginModalProps {
  show: boolean,
  onClose?: () => void
}

function LoginModal({ show, onClose }: LoginModalProps) {
  const { login } = useAuth()

  if(!show) {
    return null;
  }

  const [isLogin, setIsLogin] = useState(true)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState("")

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClose?.()
    }
  }

  const stopPropagation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatusMessage("");
    setSubmitting(true)
    try {
      const endpoint = isLogin ? '/api/login' : '/api/register'
      const result: LoginData = await submitAuth(endpoint, form);
      login(result)
      onClose?.();
    } catch (error: any) {
      setStatusMessage(error.body.message || "Couldn't register");
      console.error('Auth error:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-3 md:rounded shadow-lg w-full md:w-1/2" onClick={stopPropagation}>
        <div className="w-full flex justify-end">
          <button
            className="bg-gray-200 rounded px-1 mb-2"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={handleKeyDown}
          >
            Close
          </button>
        </div>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="border rounded px-2 py-1"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border rounded px-2 py-1"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="border rounded px-2 py-1"
            required
          />
          <button type="submit" disabled={submitting} className="bg-blue-500 text-white rounded px-4 py-2 disabled:opacity-50">
            {submitting ? 'Submitting...' : isLogin ? 'Login' : 'Register'}
          </button>
          <button
            type="button"
            className="text-blue-500 underline"
            onClick={() => setIsLogin((v) => !v)}
          >
            {isLogin ? "Don't have an account? Register" : 'Back to Login'}
          </button>
          {statusMessage && (
            <p className='bg-yellow-500 text-gray-700 rounded px-2 py-1'>
              {statusMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

export default LoginModal
