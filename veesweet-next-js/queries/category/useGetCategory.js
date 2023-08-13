import { useQuery } from '@tanstack/react-query'
import  useApi  from '../../services/api/api'
import { GET_MY_CATEGORY } from "../../services/endpoints"

const useGetCategory = (config = {}) => {
  const api = useApi({ withAuth: false })
  return useQuery(
    ['get-category'],
    async () => {
      try {
        const { data } = await api.get(GET_MY_CATEGORY)
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

export default useGetCategory
