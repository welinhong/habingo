import axios, { AxiosInstance, AxiosResponse } from 'axios'

/**
 * Manage api call
 * TODO: (추후) 에러 처리에 대한 대응이 필요함
 */
export class ApiService {
  apiInstance: AxiosInstance
  authToken: string

  constructor({ baseURL }: { baseURL: string }) {
    this.apiInstance = axios.create({
      baseURL: baseURL,
    })
    this.authToken = ''
  }

  async login(payload: { loginId: string; password: string }) {
    try {
      const response = await this.apiInstance.post('/users/login', payload)
      this.setAuthToken(response.data.token)
      return response.data
    } catch (error) {
      return new Error(error)
    }
  }

  setAuthToken(token: string) {
    if (!token) return
    this.apiInstance.defaults.headers.common['X-AUTH-TOKEN'] = token
  }

  async getMyAccountInfo() {
    try {
      const response: AxiosResponse = await this.apiInstance.get('/users/me')
      return response.data
    } catch (error) {
      return new Error(error)
    }
  }
}

export default ApiService
