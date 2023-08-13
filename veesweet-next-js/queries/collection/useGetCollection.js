import { useQuery } from '@tanstack/react-query'
import  useApi  from '../../services/api/api'
import { GET_COLLECTION } from "../../services/endpoints"

const useGetCollection = (config = {}) => {
  const api = useApi({ withAuth: false })
  return useQuery(
    ['get-collections'],
    async () => {
      try {
        const { data } = await api.get(GET_COLLECTION)
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

export default useGetCollection