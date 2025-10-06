<?php

namespace Database\Seeders;

use App\Models\Vehicle;
use Illuminate\Database\Seeder;

class VehicleSeeder extends Seeder
{
    public function run(): void
    {
        $vehicles = [
            [
                'photo_url' => 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2',
                'city' => 'São Paulo',
                'brand' => 'Volkswagen',
                'model' => 'T-Cross 1.0 200 TSI',
                'description' => 'Veículo em excelente estado de conservação, único dono, revisões em dia.',
                'year' => 2021,
                'mileage' => 35000,
                'transmission_type' => 'Automático',
                'store_phone' => '(11) 99999-8888',
                'price' => 89500.00,
            ],
            [
                'photo_url' => 'https://images.unsplash.com/photo-1583121274602-3e2820c69888',
                'city' => 'Rio de Janeiro',
                'brand' => 'Chevrolet',
                'model' => 'Onix Plus 1.0 Turbo Premier',
                'description' => 'Sedan compacto com ótimo desempenho, ar-condicionado digital, central multimídia.',
                'year' => 2022,
                'mileage' => 28000,
                'transmission_type' => 'Automático',
                'store_phone' => '(21) 98888-7777',
                'price' => 78900.00,
            ],
            [
                'photo_url' => 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d',
                'city' => 'Belo Horizonte',
                'brand' => 'Fiat',
                'model' => 'Argo 1.3 Drive',
                'description' => 'Hatch econômico e moderno, perfeito para cidade, baixo consumo de combustível.',
                'year' => 2020,
                'mileage' => 45000,
                'transmission_type' => 'Manual',
                'store_phone' => '(31) 97777-6666',
                'price' => 59900.00,
            ],
            [
                'photo_url' => 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6',
                'city' => 'Curitiba',
                'brand' => 'Jeep',
                'model' => 'Compass 2.0 Diesel Limited',
                'description' => 'SUV potente e confortável, tração 4x4, interior em couro, teto solar panorâmico.',
                'year' => 2021,
                'mileage' => 40000,
                'transmission_type' => 'Automático',
                'store_phone' => '(41) 96666-5555',
                'price' => 145000.00,
            ],
            [
                'photo_url' => 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2',
                'city' => 'Porto Alegre',
                'brand' => 'Hyundai',
                'model' => 'HB20 1.0 Vision',
                'description' => 'Hatch básico e econômico, ideal para primeiro carro, baixíssimo consumo.',
                'year' => 2019,
                'mileage' => 62000,
                'transmission_type' => 'Manual',
                'store_phone' => '(51) 95555-4444',
                'price' => 52000.00,
            ],
            [
                'photo_url' => 'https://images.unsplash.com/photo-1617531653520-bd466b7d2e55',
                'city' => 'Brasília',
                'brand' => 'Toyota',
                'model' => 'Corolla 2.0 XEI',
                'description' => 'Sedan premium com tecnologia de ponta, baixíssima manutenção, extremamente confiável.',
                'year' => 2023,
                'mileage' => 15000,
                'transmission_type' => 'Automático',
                'store_phone' => '(61) 94444-3333',
                'price' => 135000.00,
            ],
            [
                'photo_url' => 'https://images.unsplash.com/photo-1542362567-b07e54358753',
                'city' => 'Fortaleza',
                'brand' => 'Honda',
                'model' => 'Civic 1.5 Turbo Touring',
                'description' => 'Sedan esportivo com motor turbo, bancos em couro, sistema de som premium.',
                'year' => 2022,
                'mileage' => 22000,
                'transmission_type' => 'Automático CVT',
                'store_phone' => '(85) 93333-2222',
                'price' => 165000.00,
            ],
            [
                'photo_url' => 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb',
                'city' => 'Salvador',
                'brand' => 'Renault',
                'model' => 'Kwid Zen 1.0',
                'description' => 'SUV compacto urbano, econômico e prático, design moderno.',
                'year' => 2021,
                'mileage' => 38000,
                'transmission_type' => 'Manual',
                'store_phone' => '(71) 92222-1111',
                'price' => 48500.00,
            ],
            [
                'photo_url' => 'https://images.unsplash.com/photo-1600705722908-bab1e61c0b4d',
                'city' => 'Recife',
                'brand' => 'Nissan',
                'model' => 'Kicks 1.6 SV',
                'description' => 'SUV compacto versátil, excelente espaço interno, porta-malas amplo.',
                'year' => 2020,
                'mileage' => 50000,
                'transmission_type' => 'Automático CVT',
                'store_phone' => '(81) 91111-0000',
                'price' => 79900.00,
            ],
            [
                'photo_url' => 'https://images.unsplash.com/photo-1612825173281-9a193378527e',
                'city' => 'Manaus',
                'brand' => 'Ford',
                'model' => 'EcoSport 1.5 Freestyle',
                'description' => 'SUV compacto robusto, ótimo para cidade e estrada, ar-condicionado automático.',
                'year' => 2019,
                'mileage' => 55000,
                'transmission_type' => 'Automático',
                'store_phone' => '(92) 90000-9999',
                'price' => 68500.00,
            ],
        ];

        foreach ($vehicles as $vehicle) {
            Vehicle::create($vehicle);
        }
    }
}
