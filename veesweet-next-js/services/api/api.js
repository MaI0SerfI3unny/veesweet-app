import { useCookies } from 'react-cookie'
import axios from 'axios'

export const useApiWihoutCook = () => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL
  })
}

const useApi = ({ withAuth = true } = {}) => {
  const [cookies] = useCookies(['accessToken'])

  if (withAuth && !cookies.accessToken) {
    return false
  }

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    headers: {
      ...(cookies.accessToken &&
        withAuth && {
          Authorization: cookies.accessToken,
        }),
    },
  })
}

export default useApi