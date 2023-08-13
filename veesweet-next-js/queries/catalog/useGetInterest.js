import { useQuery } from '@tanstack/react-query'
import  useApi  from '../../services/api/api'
import { GET_INTEREST } from "../../services/endpoints"

const useGetInterest = (config = {}) => {
  const api = useApi({ withAuth: false })
  return useQuery(
    ['get-interest'],
    async () => {
      try {
        const { data } = await api.get(GET_INTEREST)
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

export default useGetInterest
