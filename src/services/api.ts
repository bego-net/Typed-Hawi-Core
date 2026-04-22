import api from '../api/axios'

export interface Product {
  id: number
  title: string
  description: string
  image: string
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: number
  name: string
  role: string
  message: string
  image: string
  created_at: string
  updated_at: string
}

export interface Partner {
  id: number
  name: string
  logo: string
  created_at: string
  updated_at: string
}

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products')
  return response.data
}

export const getTestimonials = async (): Promise<Testimonial[]> => {
  const response = await api.get('/testimonials')
  return response.data
}

export const getPartners = async (): Promise<Partner[]> => {
  const response = await api.get('/partners')
  return response.data
}
