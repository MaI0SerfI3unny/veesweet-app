import { useQuery } from '@tanstack/react-query'
import  useApi  from '../../services/api/api'
import { GET_MY_TYPE_CATEGORY } from "../../services/endpoints"

const useGetTypeCategory = (config = {}) => {
  const api = useApi({ withAuth: false })
  return useQuery(
    ['get-type-category'],
    async () => {
      try {
        const { data } = await api.get(GET_MY_TYPE_CATEGORY)
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

export default useGetTypeCategory
