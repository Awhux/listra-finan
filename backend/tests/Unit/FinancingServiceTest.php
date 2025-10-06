<?php

namespace Tests\Unit;

use App\Models\Vehicle;
use App\Services\FinancingService;
use PHPUnit\Framework\TestCase;

class FinancingServiceTest extends TestCase
{
    private FinancingService $service;
    private Vehicle $vehicle;

    protected function setUp(): void
    {
        parent::setUp();

        $this->service = new FinancingService();
        $this->vehicle = new Vehicle([
            'brand' => 'Volkswagen',
            'model' => 'T-Cross',
            'price' => 100000.00,
        ]);
    }

    public function test_returns_three_financing_options(): void
    {
        $results = $this->service->calculateSimulation($this->vehicle, 10000);

        $this->assertCount(3, $results);
    }

    public function test_calculates_6_month_installment_correctly(): void
    {
        $results = $this->service->calculateSimulation($this->vehicle, 10000);

        $this->assertEquals(6, $results[0]['installments']);
        $this->assertEquals(17078.33, $results[0]['installment_value']);
    }

    public function test_calculates_12_month_installment_correctly(): void
    {
        $results = $this->service->calculateSimulation($this->vehicle, 10000);

        $this->assertEquals(12, $results[1]['installments']);
        $this->assertEquals(8796.67, $results[1]['installment_value']);
    }

    public function test_calculates_48_month_installment_correctly(): void
    {
        $results = $this->service->calculateSimulation($this->vehicle, 10000);

        $this->assertEquals(48, $results[2]['installments']);
        $this->assertEquals(2264.38, $results[2]['installment_value']);
    }

    public function test_handles_zero_down_payment(): void
    {
        $results = $this->service->calculateSimulation($this->vehicle, 0);

        $this->assertCount(3, $results);
        $this->assertGreaterThan(0, $results[0]['installment_value']);
    }

    public function test_applies_correct_interest_rates(): void
    {
        $results = $this->service->calculateSimulation($this->vehicle, 0);

        $this->assertEquals(18745.00, $results[0]['installment_value']);
        $this->assertEquals(9630.00, $results[1]['installment_value']);
        $this->assertEquals(2472.71, $results[2]['installment_value']);
    }

    public function test_accepts_valid_down_payment(): void
    {
        $isValid = $this->service->validateDownPayment(50000, 100000);

        $this->assertTrue($isValid);
    }

    public function test_accepts_zero_down_payment(): void
    {
        $isValid = $this->service->validateDownPayment(0, 100000);

        $this->assertTrue($isValid);
    }

    public function test_rejects_negative_down_payment(): void
    {
        $isValid = $this->service->validateDownPayment(-100, 100000);

        $this->assertFalse($isValid);
    }

    public function test_rejects_down_payment_equal_to_vehicle_price(): void
    {
        $isValid = $this->service->validateDownPayment(100000, 100000);

        $this->assertFalse($isValid);
    }

    public function test_rejects_down_payment_greater_than_vehicle_price(): void
    {
        $isValid = $this->service->validateDownPayment(150000, 100000);

        $this->assertFalse($isValid);
    }
}
