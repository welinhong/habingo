import { useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../contexts/UserContext'
import { BASE_URL } from '../config'
import { IBingoRoom } from '../../src/services/models'

export function useBingoRoomService() {
  const { token } = useContext(UserContext)

  const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      'X-AUTH-TOKEN': token,
    },
  })

  return {
    // Get bingo room info
    getDetail: async (roomId: number): Promise<IBingoRoom> => {
      try {
        const { data } = await api.get(`/bingo/rooms/${roomId}`)
        return data
      } catch (e) {
        throw new Error(e)
      }
    },

    // Create bingo room
    createBingoRoom: async (bingoId: number): Promise<IBingoRoom> => {
      try {
        console.log('bingoId', bingoId)

        const { data } = await api.post(`/bingos/${bingoId}/rooms`)
        return data
      } catch (e) {
        throw new Error(e)
      }
    },

    // Join bingo room
    joinRoom: async (bingoId: number, inviteCode: string): Promise<IBingoRoom> => {
      try {
        const { data } = await api.put(`/bingos/${bingoId}/rooms/join/${inviteCode}`)
        return data
      } catch (e) {
        throw new Error(e)
      }
    },
  }
}
