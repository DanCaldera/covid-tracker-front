import { axiosInstance } from '../axios-setup'

export const login = async (data) => {
  try {
    return await axiosInstance.post('/signin/', data)
  } catch (error) {
    return error.response
  }
}

export const register = async (data) => {
  try {
    return await axiosInstance.post('/signup/', data)
  } catch (error) {
    return error.response
  }
}
