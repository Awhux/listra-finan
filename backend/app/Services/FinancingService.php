<?php

namespace App\Services;

use App\Models\Vehicle;

class FinancingService
{
    private const INTEREST_RATES = [
        6 => 0.1247,
        12 => 0.1556,
        48 => 0.1869,
    ];

    public function calculateSimulation(Vehicle $vehicle, float $downPayment): array
    {
        $results = [];

        foreach (self::INTEREST_RATES as $installments => $interestRate) {
            $totalPriceWithInterest = $vehicle->price * (1 + $interestRate);
            $financedAmount = $totalPriceWithInterest - $downPayment;
            $installmentValue = $financedAmount / $installments;

            $results[] = [
                'installments' => $installments,
                'installment_value' => round($installmentValue, 2),
            ];
        }

        return $results;
    }

    public function validateDownPayment(float $downPayment, float $vehiclePrice): bool
    {
        return $downPayment >= 0 && $downPayment < $vehiclePrice;
    }
}

