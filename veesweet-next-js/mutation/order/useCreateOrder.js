import axios from 'axios'
import { CREATE_ORDER } from "../../services/endpoints"

const useCreateOrder = (order) => {
    return axios.post(process.env.NEXT_PUBLIC_BACKEND_API_URL+CREATE_ORDER, order)
}


export default useCreateOrder
