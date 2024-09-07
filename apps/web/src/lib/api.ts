import { env } from '@/env'
import axios from 'axios'

export const BASE_URL = env.NEXT_PUBLIC_API_URL

export const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})
