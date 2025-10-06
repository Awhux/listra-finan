import { simulateFinancingAction } from "../simulation"
import { simulateFinancing, ApiError } from "@/lib/api"

jest.mock("@/lib/api", () => ({
  simulateFinancing: jest.fn(),
  ApiError: class ApiError extends Error {
    constructor(message: string, status: number, errors?: Record<string, string[]>) {
      super(message)
      this.name = 'ApiError'
      this.status = status
      this.errors = errors
    }
  },
}))

const mockSimulateFinancing = simulateFinancing as jest.MockedFunction<typeof simulateFinancing>

describe("simulateFinancingAction", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("returns success with data when simulation succeeds", async () => {
    const mockResponse = {
      results: [
        { installments: 6, installment_value: 15405.76 },
        { installments: 12, installment_value: 8046.22 },
      ],
    }

    mockSimulateFinancing.mockResolvedValueOnce(mockResponse)

    const formData = new FormData()
    formData.set("vehicle_id", "1")
    formData.set("down_payment", "5000")

    const result = await simulateFinancingAction({ success: false }, formData)

    expect(result).toEqual({
      success: true,
      data: mockResponse,
    })
    expect(mockSimulateFinancing).toHaveBeenCalledWith({
      vehicle_id: 1,
      down_payment: 5000,
    })
  })

  it("returns error when vehicle_id is missing", async () => {
    const formData = new FormData()
    formData.set("down_payment", "5000")

    const result = await simulateFinancingAction({ success: false }, formData)

    expect(result).toEqual({
      success: false,
      error: "Vehicle ID and down payment are required",
    })
  })

  it("returns error when down_payment is missing", async () => {
    const formData = new FormData()
    formData.set("vehicle_id", "1")

    const result = await simulateFinancingAction({ success: false }, formData)

    expect(result).toEqual({
      success: false,
      error: "Vehicle ID and down payment are required",
    })
  })

  it("returns error when down_payment is negative", async () => {
    const formData = new FormData()
    formData.set("vehicle_id", "1")
    formData.set("down_payment", "-1000")

    const result = await simulateFinancingAction({ success: false }, formData)

    expect(result).toEqual({
      success: false,
      error: "Down payment must be greater than or equal to 0",
    })
  })

  it("returns error when API call fails", async () => {
    mockSimulateFinancing.mockRejectedValueOnce(new Error("API Error"))

    const formData = new FormData()
    formData.set("vehicle_id", "1")
    formData.set("down_payment", "5000")

    const result = await simulateFinancingAction({ success: false }, formData)

    expect(result).toEqual({
      success: false,
      error: "An unexpected error occurred. Please try again.",
    })
  })

  it("handles ApiError with field errors", async () => {
    const apiError = new ApiError("Validation failed", 422, { down_payment: ["Must be less than vehicle price"] })

    mockSimulateFinancing.mockRejectedValueOnce(apiError)

    const formData = new FormData()
    formData.set("vehicle_id", "1")
    formData.set("down_payment", "5000")

    const result = await simulateFinancingAction({ success: false }, formData)

    expect(result).toEqual({
      success: false,
      error: "Validation failed",
      fieldErrors: { down_payment: ["Must be less than vehicle price"] },
    })
  })
})
