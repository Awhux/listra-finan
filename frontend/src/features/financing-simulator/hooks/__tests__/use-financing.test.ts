import { renderHook, act } from '@testing-library/react';
import { useFinancing } from '../use-financing';
import { calculateMonthlyPayment } from '../../data/financing-config';

jest.mock('../../data/financing-config', () => ({
  financingOptions: [
    { months: 12, interestRate: 0.015 },
    { months: 24, interestRate: 0.018 },
    { months: 48, interestRate: 0.022 },
  ],
  calculateMonthlyPayment: jest.fn(),
}));

const mockCalculateMonthlyPayment = calculateMonthlyPayment as jest.MockedFunction<typeof calculateMonthlyPayment>;

describe('useFinancing', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCalculateMonthlyPayment.mockImplementation((price, months, interestRate) => {
      const monthlyRate = interestRate;
      const payment = (price * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
      return Math.round(payment);
    });
  });

  it('should initialize with empty results array', () => {
    const { result } = renderHook(() => useFinancing());

    expect(result.current.results).toEqual([]);
  });

  it('should simulate financing for the given vehicle price', () => {
    const { result } = renderHook(() => useFinancing());
    const vehiclePrice = 100000;

    act(() => {
      result.current.simulate(vehiclePrice);
    });

    expect(mockCalculateMonthlyPayment).toHaveBeenCalledTimes(3);
    expect(mockCalculateMonthlyPayment).toHaveBeenCalledWith(100000, 12, 0.015);
    expect(mockCalculateMonthlyPayment).toHaveBeenCalledWith(100000, 24, 0.018);
    expect(mockCalculateMonthlyPayment).toHaveBeenCalledWith(100000, 48, 0.022);

    expect(result.current.results).toHaveLength(3);
    expect(result.current.results[0]).toEqual({
      months: 12,
      monthlyPayment: expect.any(Number),
    });
  });

  it('should reset results to empty array', () => {
    const { result } = renderHook(() => useFinancing());
    const vehiclePrice = 100000;

    act(() => {
      result.current.simulate(vehiclePrice);
    });

    expect(result.current.results).toHaveLength(3);

    act(() => {
      result.current.reset();
    });

    expect(result.current.results).toEqual([]);
  });

  it('should handle zero vehicle price', () => {
    const { result } = renderHook(() => useFinancing());

    act(() => {
      result.current.simulate(0);
    });

    expect(mockCalculateMonthlyPayment).toHaveBeenCalledTimes(3);
    expect(result.current.results).toHaveLength(3);
  });

  it('should handle negative vehicle price', () => {
    const { result } = renderHook(() => useFinancing());

    act(() => {
      result.current.simulate(-1000);
    });

    expect(mockCalculateMonthlyPayment).toHaveBeenCalledTimes(3);
    expect(result.current.results).toHaveLength(3);
  });

  it('should return the correct interface structure', () => {
    const { result } = renderHook(() => useFinancing());

    expect(result.current).toHaveProperty('results');
    expect(result.current).toHaveProperty('simulate');
    expect(result.current).toHaveProperty('reset');
    expect(typeof result.current.simulate).toBe('function');
    expect(typeof result.current.reset).toBe('function');
  });
});
