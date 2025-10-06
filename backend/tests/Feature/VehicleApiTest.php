<?php

namespace Tests\Feature;

use App\Models\Vehicle;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VehicleApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Vehicle::factory()->create([
            'brand' => 'Volkswagen',
            'model' => 'T-Cross 1.0 200 TSI',
            'photo_url' => 'https://example.com/photo.jpg',
            'city' => 'São Paulo',
            'description' => 'Test vehicle description',
            'year' => 2021,
            'mileage' => 35000,
            'transmission_type' => 'Automático',
            'store_phone' => '(11) 99999-8888',
            'price' => 89500.00,
        ]);
    }

    public function test_returns_a_list_of_all_vehicles(): void
    {
        $response = $this->getJson('/api/vehicles');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => ['id', 'name', 'photo_url']
                ]
            ]);
    }

    public function test_returns_vehicle_name_as_concatenated_brand_and_model(): void
    {
        $response = $this->getJson('/api/vehicles');

        $response->assertStatus(200)
            ->assertJsonPath('data.0.name', 'Volkswagen T-Cross 1.0 200 TSI');
    }

    public function test_caches_the_vehicle_list(): void
    {
        $this->getJson('/api/vehicles');

        $response = $this->getJson('/api/vehicles');

        $response->assertStatus(200);
    }

    public function test_returns_a_single_vehicle_with_all_details(): void
    {
        $vehicle = Vehicle::first();

        $response = $this->getJson("/api/vehicles/{$vehicle->id}");

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'photo_url',
                    'city',
                    'brand',
                    'model',
                    'description',
                    'year',
                    'mileage',
                    'transmission_type',
                    'store_phone',
                    'price',
                ]
            ])
            ->assertJson([
                'data' => [
                    'id' => $vehicle->id,
                    'brand' => 'Volkswagen',
                    'model' => 'T-Cross 1.0 200 TSI',
                    'price' => '89500.00',
                ]
            ]);
    }

    public function test_returns_404_for_non_existent_vehicle(): void
    {
        $response = $this->getJson('/api/vehicles/999');

        $response->assertStatus(404);
    }

    public function test_caches_individual_vehicle_data(): void
    {
        $vehicle = Vehicle::first();

        $this->getJson("/api/vehicles/{$vehicle->id}");

        $response = $this->getJson("/api/vehicles/{$vehicle->id}");

        $response->assertStatus(200);
    }

    public function test_calculates_financing_simulation_correctly(): void
    {
        $vehicle = Vehicle::first();

        $response = $this->postJson('/api/simulations', [
            'vehicle_id' => $vehicle->id,
            'down_payment' => 7500.00,
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'results' => [
                    '*' => ['installments', 'installment_value']
                ]
            ])
            ->assertJsonCount(3, 'results');

        $data = $response->json('results');

        $this->assertEquals(6, $data[0]['installments']);
        $this->assertEquals(12, $data[1]['installments']);
        $this->assertEquals(48, $data[2]['installments']);

        $this->assertGreaterThan(15000, $data[0]['installment_value']);
        $this->assertLessThan(16000, $data[0]['installment_value']);
    }

    public function test_requires_vehicle_id(): void
    {
        $response = $this->postJson('/api/simulations', [
            'down_payment' => 7500.00,
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['vehicle_id']);
    }

    public function test_requires_down_payment(): void
    {
        $vehicle = Vehicle::first();

        $response = $this->postJson('/api/simulations', [
            'vehicle_id' => $vehicle->id,
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['down_payment']);
    }

    public function test_validates_vehicle_id_exists(): void
    {
        $response = $this->postJson('/api/simulations', [
            'vehicle_id' => 999,
            'down_payment' => 7500.00,
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['vehicle_id']);
    }

    public function test_validates_down_payment_is_not_negative(): void
    {
        $vehicle = Vehicle::first();

        $response = $this->postJson('/api/simulations', [
            'vehicle_id' => $vehicle->id,
            'down_payment' => -100,
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['down_payment']);
    }

    public function test_rejects_down_payment_greater_than_or_equal_to_vehicle_price(): void
    {
        $vehicle = Vehicle::first();

        $response = $this->postJson('/api/simulations', [
            'vehicle_id' => $vehicle->id,
            'down_payment' => 89500.00,
        ]);

        $response->assertStatus(422)
            ->assertJson([
                'message' => 'The down payment must be less than the vehicle price.',
            ]);
    }

    public function test_rejects_down_payment_greater_than_vehicle_price(): void
    {
        $vehicle = Vehicle::first();

        $response = $this->postJson('/api/simulations', [
            'vehicle_id' => $vehicle->id,
            'down_payment' => 100000.00,
        ]);

        $response->assertStatus(422)
            ->assertJson([
                'message' => 'The down payment must be less than the vehicle price.',
            ]);
    }

    public function test_accepts_down_payment_of_zero(): void
    {
        $vehicle = Vehicle::first();

        $response = $this->postJson('/api/simulations', [
            'vehicle_id' => $vehicle->id,
            'down_payment' => 0,
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'results' => [
                    '*' => ['installments', 'installment_value']
                ]
            ]);
    }
}

