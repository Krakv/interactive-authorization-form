import { act } from '@testing-library/react'
import { useAuthStore } from '@/store/authStore'

const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString()
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key]
    }),
    clear: jest.fn(() => {
      store = {}
    }),
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('authStore', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
    useAuthStore.setState(useAuthStore.getInitialState())
  })

  it('should save credentials when rememberMe is true', () => {
    act(() => {
      useAuthStore.getState().setEmail('test@example.com')
      useAuthStore.getState().setPassword('password123')
      useAuthStore.getState().setRememberMe(true)
      useAuthStore.getState().saveCredentials()
    })

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'email',
      'test@example.com'
    )
    expect(localStorage.setItem).toHaveBeenCalledWith('password', 'password123')
    expect(localStorage.setItem).toHaveBeenCalledWith('checkbox', 'true')
  })
})
