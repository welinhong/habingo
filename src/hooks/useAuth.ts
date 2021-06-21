import axios from 'axios'
import { useEffect, useMemo, useReducer } from 'react'
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage'
import { BASE_URL } from './../config/index'

interface User {
  name?: string
  token?: string
}

export function useAuth() {
  const [state, dispatch] = useReducer(
    (state: { user: User }, action: { type: string; payload?: any }) => {
      switch (action.type) {
        case 'SET_USER':
          return {
            ...state,
            user: { ...action.payload },
          }
        case 'REMOVE_USER':
          return {
            ...state,
            user: undefined,
          }
        default:
          return state
      }
    },
    {
      user: undefined,
    },
  )

  const auth = useMemo(
    () => ({
      login: async (loginId: string, password: string): Promise<void> => {
        const { data } = await axios.post(`${BASE_URL}/users/login`, {
          loginId,
          password,
        })

        const user = {
          name: data.username,
          token: data.token,
        }
        await RNSecureStorage.set('user', JSON.stringify(user), {
          accessible: ACCESSIBLE.WHEN_UNLOCKED,
        })
        dispatch({
          type: 'SET_USER',
          payload: user,
        })
      },
      logout: async () => {
        await RNSecureStorage.remove('user')
        dispatch({
          type: 'REMOVE_USER',
        })
      },
    }),
    [],
  )

  useEffect(() => {
    RNSecureStorage.get('user').then((user: string | null) => {
      if (user) {
        dispatch({
          type: 'SET_USER',
          payload: JSON.parse(user),
        })
      } else {
        console.log('no user')
      }
    })
  }, [])
  return { auth, state }
}
