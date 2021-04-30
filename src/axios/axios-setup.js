import axios from 'axios'

// const api = 'http://localhost:5000'
const api = 'https://covid-tracker-back.vercel.app'

export const axiosInstance = axios.create({ baseURL: api })

axiosInstance.interceptors.request.use(
  async (config) => {
    // Do something before request is sent
    const token = await localStorage.getItem('token')

    console.log(token)

    config.headers['Content-Type'] = 'application/json'
    config.headers.Authorization = token ? `Bearer ${token}` : {}
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log('SUCCESSFUL RESPONSE')
    return response
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    console.log('error')

    return Promise.reject(error)
  }
)
