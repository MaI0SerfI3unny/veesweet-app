import { useQuery } from '@tanstack/react-query'
import  useApi  from '../../services/api/api'
import { GET_MY_ORDERS } from "../../services/endpoints"

const useGetMyOrder = (value, config = {}) => {
  const api = useApi({ withAuth: false })
  return useQuery(
    ['get-my-order', value.arrProduct],
    async () => {
      try {
        const { data } = await api.post(GET_MY_ORDERS, value)
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

export default useGetMyOrder