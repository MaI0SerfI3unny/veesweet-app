import { useQuery } from '@tanstack/react-query'
import  useApi  from '../../services/api/api'
import { GET_BANNER } from "../../services/endpoints"

const useGetBanner = (config = {}) => {
  const api = useApi({ withAuth: false })
  return useQuery(
    ['get-banner'],
    async () => {
      try {
        const { data } = await api.get(GET_BANNER)
        return data.data
      } catch (error) {
        console.error(error)
      }
    },
    {
      ...config,
    },
  )
}

export default useGetBanner
