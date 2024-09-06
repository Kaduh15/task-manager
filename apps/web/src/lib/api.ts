import { env } from '@/env'
import axios from 'axios'
import { cookies } from 'next/headers'

export const BASE_URL = env.NEXT_PUBLIC_API_URL

export const token = cookies().get('token')?.value

export const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
})
