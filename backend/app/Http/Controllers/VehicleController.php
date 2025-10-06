<?php

namespace App\Http\Controllers;

use App\Http\Requests\SimulationRequest;
use App\Http\Resources\VehicleListResource;
use App\Http\Resources\VehicleResource;
use App\Models\Vehicle;
use App\Services\FinancingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Cache;

class VehicleController extends Controller
{
    public function __construct(
        private FinancingService $financingService
    ) {}

    public function index(): AnonymousResourceCollection
    {
        $vehicles = Cache::remember('vehicles.list', 3600, function () {
            return Vehicle::all();
        });

        return VehicleListResource::collection($vehicles);
    }

    public function show(Vehicle $vehicle): VehicleResource
    {
        $cachedVehicle = Cache::remember("vehicle.{$vehicle->id}", 3600, function () use ($vehicle) {
            return $vehicle;
        });

        return new VehicleResource($cachedVehicle);
    }

    public function simulate(SimulationRequest $request): JsonResponse
    {
        $vehicle = Vehicle::findOrFail($request->vehicle_id);
        $downPayment = $request->down_payment;

        if (!$this->financingService->validateDownPayment($downPayment, (float) $vehicle->price)) {
            return response()->json([
                'message' => 'The down payment must be less than the vehicle price.',
                'errors' => [
                    'down_payment' => ['The down payment must be less than the vehicle price.']
                ]
            ], 422);
        }

        $results = $this->financingService->calculateSimulation($vehicle, $downPayment);

        return response()->json([
            'results' => $results,
        ]);
    }
}
