import { axiosInstance } from '../axios-setup'

export const home = async () => {
  try {
    return await axiosInstance.get('/')
  } catch (error) {
    return error.response
  }
}
