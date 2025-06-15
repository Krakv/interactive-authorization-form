import { create } from 'zustand'

export interface AuthState {
  email: string
  password: string
  rememberMe: boolean
  message: string
  messageType: '' | 'success' | 'error'
  setEmail: (email: string) => void
  setPassword: (password: string) => void
  setRememberMe: (rememberMe: boolean) => void
  setMessage: (message: string, type?: '' | 'success' | 'error') => void
  saveCredentials: () => void
  loadCredentials: () => void
  clearCredentials: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  email: '',
  password: '',
  rememberMe: false,
  message: '',
  messageType: '',

  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setRememberMe: (rememberMe) => set({ rememberMe }),

  setMessage: (message, type = '') => set({ message, messageType: type }),

  saveCredentials: () => {
    const state = useAuthStore.getState()
    if (state.rememberMe) {
      localStorage.setItem('email', state.email)
      localStorage.setItem('password', state.password)
      localStorage.setItem('checkbox', 'true')
    }
  },

  loadCredentials: () => {
    const email = localStorage.getItem('email') || ''
    const password = localStorage.getItem('password') || ''
    const rememberMe = localStorage.getItem('checkbox') === 'true'
    set({ email, password, rememberMe })
  },

  clearCredentials: () => {
    localStorage.removeItem('email')
    localStorage.removeItem('password')
    localStorage.removeItem('checkbox')
    set({ email: '', password: '', rememberMe: false })
  },
}))
