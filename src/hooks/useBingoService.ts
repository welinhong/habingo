import { useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../contexts/UserContext'
import { BASE_URL } from '../config'

export function useBingoService() {
  const { token } = useContext(UserContext)

  const api = axios.create({
    baseURL: BASE_URL,
    headers: {
      'X-AUTH-TOKEN': token,
    },
  })

  return {
    // 빙고 리스트 가져오기
    getList: async () => {
      try {
        const { data } = await api.get('/bingos')

        // bingo list + latest bingoId
        const latestBingo = data.length > 0 ? data[data.length - 1] : null
        return {
          list: data,
          latestBingoId: latestBingo ? latestBingo.id : null,
        }
      } catch (e) {
        throw new Error(e)
      }
    },

    // 빙고 생성하기
    addOne: async () => {
      try {
        const { data } = await api.post('/bingos')
        return data
      } catch (e) {
        throw new Error(e)
      }
    },

    // 빙고 상세 가져오기
    getDetail: async (bingoId: number) => {
      try {
        const { data } = await api.get(`/bingos/${bingoId}`)
        return data
      } catch (e) {
        throw new Error(e)
      }
    },

    // 빙고 item 추가하기
    addItem: async (bingoId: number, contents: string) => {
      try {
        const { data } = await api.post(`/bingos/${bingoId}/items`, {
          contents,
        })
        const itemAdded = data.bingoItems[data.bingoItems.length - 1]
        return itemAdded.id
      } catch (e) {
        throw new Error(e)
      }
    },

    // 빙고 item 수정하기
    updateItem: async (bingoId: number, itemId: number, contents: string) => {
      try {
        const { data } = await api.put(`/bingos/${bingoId}/items/${itemId}`, {
          contents,
        })
        return itemId
      } catch (e) {
        throw new Error(e)
      }
    },

    // 빙고 item 삭제하기
    deleteItem: async (bingoId: number, itemId: number) => {
      try {
        await api.delete(`/bingos/${bingoId}/items/${itemId}`)
        return itemId
      } catch (e) {
        throw new Error(e)
      }
    },

    // 빙고 DONE 처리하기
    doneItem: async (bingoId: number, itemId: number, pictureUrl?: string) => {
      try {
        const payload = pictureUrl ? { pictureUrl } : {}
        await api.post(`/bingos/${bingoId}/items/${itemId}/done`, payload)
        return itemId
      } catch (e) {
        throw new Error(e)
      }
    },

    // 빙고 DONE 처리 취소하기
    cancelItemDone: async (bingoId: number, itemId: number) => {
      try {
        await api.put(`/bingos/${bingoId}/items/${itemId}/done/cancel`)
        return itemId
      } catch (e) {
        throw new Error(e)
      }
    },
  }
}
