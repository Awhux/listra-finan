<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VehicleResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'photo_url' => $this->photo_url,
            'city' => $this->city,
            'brand' => $this->brand,
            'model' => $this->model,
            'description' => $this->description,
            'year' => $this->year,
            'mileage' => $this->mileage,
            'transmission_type' => $this->transmission_type,
            'store_phone' => $this->store_phone,
            'price' => $this->price,
        ];
    }
}
