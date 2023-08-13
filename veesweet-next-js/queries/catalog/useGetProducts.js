import { useQuery } from '@tanstack/react-query'
import  useApi  from '../../services/api/api'
import { GET_PRODUCTS } from "../../services/endpoints"

const useGetCatalog = (value,config = {}) => {
  const api = useApi({ withAuth: false })
  return useQuery(
    ['get-catalog', value.page, value.search, value.sort,value.id, value.categoryId, value.priceRange, value.size],
    async () => {
      try {
        const { data } = await api.get(GET_PRODUCTS, { params: {...value} })
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

export default useGetCatalog
