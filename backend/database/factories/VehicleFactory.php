<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class VehicleFactory extends Factory
{
    public function definition(): array
    {
        $brands = ['Volkswagen', 'Chevrolet', 'Fiat', 'Toyota', 'Honda', 'Ford', 'Hyundai', 'Nissan'];
        $models = ['1.0 Turbo', '1.5 Flex', '2.0 TSI', 'Sport', 'Premium', 'Limited'];
        $cities = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Brasília', 'Curitiba', 'Porto Alegre'];
        $transmissions = ['Manual', 'Automático', 'Automático CVT'];

        return [
            'photo_url' => fake()->imageUrl(640, 480, 'cars', true),
            'city' => fake()->randomElement($cities),
            'brand' => $brand = fake()->randomElement($brands),
            'model' => $brand . ' ' . fake()->randomElement($models),
            'description' => fake()->text(200),
            'year' => fake()->numberBetween(2018, 2024),
            'mileage' => fake()->numberBetween(5000, 100000),
            'transmission_type' => fake()->randomElement($transmissions),
            'store_phone' => fake()->phoneNumber(),
            'price' => fake()->randomFloat(2, 30000, 200000),
        ];
    }
}
