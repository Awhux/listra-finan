import axios, { AxiosError } from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
})

export interface VehicleListItem {
  id: number
  name: string
  photo_url: string
}

export interface VehicleDetails {
  id: number
  photo_url: string
  city: string
  brand: string
  model: string
  description: string
  year: number
  mileage: number
  transmission_type: string
  store_phone: string
  price: string
}

export interface SimulationRequest {
  vehicle_id: number
  down_payment: number
}

export interface SimulationResult {
  installments: number
  installment_value: number
}

export interface SimulationResponse {
  results: SimulationResult[]
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public errors?: Record<string, string[]>
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function fetchVehicles(): Promise<VehicleListItem[]> {
  try {
    const response = await api.get('/vehicles')
    return response.data.data
  } catch (error) {
    throw handleApiError(error)
  }
}

export async function fetchVehicleDetails(id: number): Promise<VehicleDetails> {
  try {
    const response = await api.get(`/vehicles/${id}`)
    return response.data.data
  } catch (error) {
    throw handleApiError(error)
  }
}

export async function simulateFinancing(
  request: SimulationRequest
): Promise<SimulationResponse> {
  try {
    const response = await api.post('/simulations', request)
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}

function handleApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const serverError = error as AxiosError<{
      message: string
      errors: Record<string, string[]>
    }>
    const status = serverError.response?.status ?? 500
    const message = serverError.response?.data?.message || 'An unknown error occurred'
    const errors = serverError.response?.data?.errors
    console.log(message, status, errors)
    return new ApiError(message, status, errors)
  }
  console.log('An unexpected error occurred', error)
  return new ApiError('An unexpected error occurred', 500)
}
