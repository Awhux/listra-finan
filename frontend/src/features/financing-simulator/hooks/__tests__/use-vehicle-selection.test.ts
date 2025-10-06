import { renderHook, act } from '@testing-library/react';
import { useVehicleSelection } from '../use-vehicle-selection';
import type { Vehicle } from '../../data/vehicles';

const mockVehicles: Vehicle[] = [
  {
    id: "1",
    name: "Volkswagen T-Cross",
    year: "1.0 200 TSI Flex Sense Automático",
    fuel: "2020",
    transmission: "Automático",
    price: 59500,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    name: "Honda Civic",
    year: "2.0 EXL Flex Automático",
    fuel: "2021",
    transmission: "Automático",
    price: 89900,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    name: "Toyota Corolla",
    year: "2.0 XEI Flex Automático",
    fuel: "2022",
    transmission: "Automático",
    price: 119000,
    image: "/placeholder.svg?height=200&width=300",
  },
];

describe('useVehicleSelection', () => {
  it('should initialize with no selected vehicle in the array', () => {
    const { result } = renderHook(() => useVehicleSelection(mockVehicles));

    expect(result.current.selectedVehicle).toBeNull();
  });

  it('should select a vehicle by a valid ID', () => {
    const { result } = renderHook(() => useVehicleSelection(mockVehicles));

    act(() => {
      result.current.selectVehicle("2");
    });

    expect(result.current.selectedVehicle).toEqual(mockVehicles[1]);
    expect(result.current.selectedVehicle?.name).toBe("Honda Civic");
  });

  it('should select the first vehicle in the array', () => {
    const { result } = renderHook(() => useVehicleSelection(mockVehicles));

    act(() => {
      result.current.selectVehicle("1");
    });

    expect(result.current.selectedVehicle).toEqual(mockVehicles[0]);
    expect(result.current.selectedVehicle?.name).toBe("Volkswagen T-Cross");
  });

  it('should select the last vehicle in the array', () => {
    const { result } = renderHook(() => useVehicleSelection(mockVehicles));

    act(() => {
      result.current.selectVehicle("3");
    });

    expect(result.current.selectedVehicle).toEqual(mockVehicles[2]);
    expect(result.current.selectedVehicle?.name).toBe("Toyota Corolla");
  });

  it('should return null for an invalid vehicle ID', () => {
    const { result } = renderHook(() => useVehicleSelection(mockVehicles));

    act(() => {
      result.current.selectVehicle("999");
    });

    expect(result.current.selectedVehicle).toBeNull();
  });

  it('should return null for an empty string ID', () => {
    const { result } = renderHook(() => useVehicleSelection(mockVehicles));

    act(() => {
      result.current.selectVehicle("");
    });

    expect(result.current.selectedVehicle).toBeNull();
  });

  it('should handle an empty vehicles array', () => {
    const { result } = renderHook(() => useVehicleSelection([]));

    act(() => {
      result.current.selectVehicle("1");
    });

    expect(result.current.selectedVehicle).toBeNull();
  });

  it('should update the selected vehicle when selecting different vehicle', () => {
    const { result } = renderHook(() => useVehicleSelection(mockVehicles));

    act(() => {
      result.current.selectVehicle("1");
    });
    expect(result.current.selectedVehicle?.name).toBe("Volkswagen T-Cross");

    act(() => {
      result.current.selectVehicle("3");
    });
    expect(result.current.selectedVehicle?.name).toBe("Toyota Corolla");
  });

  it('should return the correct interface structure', () => {
    const { result } = renderHook(() => useVehicleSelection(mockVehicles));

    expect(result.current).toHaveProperty('selectedVehicle');
    expect(result.current).toHaveProperty('selectVehicle');
    expect(typeof result.current.selectVehicle).toBe('function');
  });

  it('should handle case-sensitive ID matching for the selected vehicle', () => {
    const { result } = renderHook(() => useVehicleSelection(mockVehicles));

    act(() => {
      result.current.selectVehicle("1");
    });

    expect(result.current.selectedVehicle).toEqual(mockVehicles[0]);

    act(() => {
      result.current.selectVehicle("1".toUpperCase());
    });

    expect(result.current.selectedVehicle).toEqual(mockVehicles[0]);
  });
});
